import { Component, Fragment, h, render } from "preact";
export { h, render };

import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";

//functions
import { get, submitData } from "./ajax";
import {
  handleAddToAssignment,
  handleQuestionBookmarkClick,
  handleRemoveQuestionFromAssignment,
  setDifference,
} from "./functions";

//material ui components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { GeneralDescription } from "./_assignments/generalDescription";
import { Group as GroupSkeleton } from "./_skeletons/group";
import { Main } from "./_reusableComponents/main";
import { DraggableQuestion, Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Snackbar } from "./_reusableComponents/snackbar";
import { StudentGroupAssignment } from "./_localComponents/group";
import { Toolbar } from "./_assignments/toolbar";

//types
import {
  TeacherType,
  UpdateAssignmentAppProps,
  UpdateAssignmentAppState,
} from "./types";
import {
  AssignmentType,
  QuestionRankType,
  StudentGroupAssignmentType,
} from "./_localComponents/types";
import {
  AssignmentMetaFieldsForm,
  StudentGroupAssignmentCreateForm,
} from "./_assignments/types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise, { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { assignmentTitleValidator } from "./validators";

export class App extends Component<
  UpdateAssignmentAppProps,
  UpdateAssignmentAppState
> {
  constructor(props: UpdateAssignmentAppProps) {
    super(props);
    this.state = {
      assignment: {
        conclusion_page: this.props.assignment.conclusion_page,
        description: this.props.assignment.description,
        intro_page: this.props.assignment.intro_page,
        pk: this.props.assignment.pk,
        title: this.props.assignment.title,
      },
      distributeErrors: [],
      distributeWaiting: false,
      editing: false,
      form: {
        conclusion_page: this.props.assignment.conclusion_page,
        description: this.props.assignment.description,
        intro_page: this.props.assignment.intro_page,
        title: this.props.assignment.title,
      },
      questionsEditableByUser: this.props.questionsEditableByUser || false,
      questionRanks: [],
      questionRanksLoading: false,
      studentgroupassignments: [],
      studentgroupassignmentsLoading: false,
      snackbarIsOpen: false,
      snackbarMessage: "",
      teacher: undefined,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  getItemStyle = (
    isDragging: boolean,
    draggableStyle?: DraggingStyle | NotDraggingStyle,
  ) => ({
    userSelect: "none",
    ...draggableStyle,
  });

  getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? saltise.palette.primary.main : "unset",
    padding: "10px",
  });

  error = (e: any, message?: string): void => {
    console.error(e);
    // deepcode ignore ReactNextState: allow use of gettext props in setState
    this.setState({
      snackbarIsOpen: true,
      snackbarMessage: message
        ? message
        : this.props.gettext("An error occurred.  Try refreshing this page."),
    });
  };

  loadAssignment = async (callback?: () => void): Promise<void> => {
    try {
      this.setState({ questionRanksLoading: true });

      const assignment = (await get(
        this.props.urls.assignment,
      )) as unknown as AssignmentType;

      // Sort question list by rank
      const questionRanks = assignment.questions?.sort(
        (a, b) => a.rank - b.rank,
      );

      this.setState(
        {
          assignment,
          form: { ...this.state.form, questions: questionRanks },
          questionRanks,
          questionRanksLoading: false,
        },
        callback,
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  loadStudentGroupAssignments = async (): Promise<void> => {
    try {
      this.setState({ studentgroupassignmentsLoading: true });

      const studentgroupassignments = (await get(
        this.props.urls.studentgroupassignments,
      )) as StudentGroupAssignmentType[];

      this.setState(
        {
          studentgroupassignments,
          studentgroupassignmentsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  sync = async (): Promise<void> => {
    // Load teacher info
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;
      this.setState({ teacher });
    } catch (error: any) {
      this.error(error);
    }

    this.loadAssignment();
    this.loadStudentGroupAssignments();
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
  }

  handleDistribute = async (
    partialForm: StudentGroupAssignmentCreateForm,
    callback: () => void,
  ) => {
    // Append assignment pk to form
    const form = Object.assign(partialForm, {
      assignment_pk: this.props.assignment.pk,
    });

    this.setState({ distributeWaiting: true });

    try {
      await submitData(this.props.urls.distribute, form, "POST");
      this.loadStudentGroupAssignments();
      this.setState({ questionsEditableByUser: false });
      callback();
    } catch (error: any) {
      if (typeof error === "object") {
        const e = Object.values(error) as string[][];
        this.setState({ distributeErrors: e });
      }
      if (error instanceof TypeError) {
        this.setState({ distributeErrors: Array([error.message]) });
      }
    } finally {
      this.setState({ distributeWaiting: false });
    }
  };

  handleEdit = (mode: boolean) => {
    this.setState({ editing: mode });
  };

  handleRemoveQuestionFromAssignmentCallback = async () => {
    const questionRanks = new Set(
      [...this.state.questionRanks].map((qr) => qr.question.pk),
    );
    const removedQuestion = () => {
      const newQuestionRanks = new Set(
        [...this.state.questionRanks].map((qr) => qr.question.pk),
      );
      const pk = setDifference(questionRanks, newQuestionRanks);
      if (pk) {
        this.setState({
          snackbarIsOpen: true,
          snackbarMessage: `Q${pk} ${this.props.gettext(
            "removed from assignment",
          )}`,
        });
      }
    };
    this.loadAssignment(removedQuestion);
  };

  questionRankListChanged = (): boolean => {
    if (this.state.form.questions === undefined) {
      return false;
    }
    const qrPreSave = [...this.state.form.questions].sort(
      (a, b) => a.rank - b.rank,
    );
    return [...this.state.questionRanks]
      .sort((a, b) => a.rank - b.rank)
      .every((qr, i) => qr.pk === qrPreSave[i].pk);
  };

  handleSave = async () => {
    console.info(this.state.form);

    if (this.props.metaEditableByUser === true) {
      const form = { ...this.state.form };
      if (
        this.props.questionsEditableByUser === true &&
        this.questionRankListChanged()
      ) {
        Object.assign(form, {
          questions: this.state.questionRanks.map((qr) => ({
            assignment: qr.assignment,
            pk: qr.pk,
            question_pk: qr.question_pk,
            rank: qr.rank,
          })),
        });
      }
      try {
        const assignment = (await submitData(
          this.props.urls.assignment,
          form,
          "PATCH",
        )) as unknown as AssignmentType;
        // deepcode ignore ReactNextState: gettext is a constant
        this.setState(
          {
            assignment,
            editing: false,
            form: {
              conclusion_page: assignment.conclusion_page,
              description: assignment.description,
              intro_page: assignment.intro_page,
              questions: assignment.questions,
              title: assignment.title,
            },
            questionRanks: assignment.questions,
            snackbarIsOpen: true,
            snackbarMessage: this.props.gettext("Assignment updated"),
          },
          () => console.info(console.info(this.state.assignment)),
        );
      } catch (error: any) {
        // deepcode ignore ReactNextState: gettext is a constant
        this.setState({
          snackbarIsOpen: true,
          snackbarMessage: this.props.gettext("An error occurred"),
        });
      }
    }
  };

  onDragEnd = (result: DropResult) => {
    const questionRanks = Array.from(this.state.form.questions || []);
    const [dragged] = questionRanks.splice(result.source.index, 1);
    if (result.destination?.index) {
      questionRanks.splice(result.destination.index, 0, dragged);
      questionRanks.forEach((qr, i) => {
        qr.rank = i;
      });
      this.setState({
        form: { ...this.state.form, questions: questionRanks },
      });
    }
  };

  updateForm = (field: keyof AssignmentMetaFieldsForm, value: string) => {
    const _form = { ...this.state.form };
    _form[field] = value;
    this.setState({ form: _form });
  };

  groups = () => {
    return (
      <Box sx={{ mt: "30px" }}>
        {!this.state.studentgroupassignmentsLoading ? (
          this.state.studentgroupassignments?.length > 0 ? (
            <Stack spacing={"10px"}>
              {this.state.studentgroupassignments.map((sga, i: number) => (
                <StudentGroupAssignment
                  key={i}
                  gettext={this.props.gettext}
                  studentgroupassignment={sga}
                  showGroup={true}
                />
              ))}
            </Stack>
          ) : (
            <Typography>
              {this.props.gettext("Your assignment is not assigned yet!")}
            </Typography>
          )
        ) : (
          <Fragment>
            <Stack spacing={"10px"}>
              <GroupSkeleton />
              <GroupSkeleton />
              <GroupSkeleton />
              <GroupSkeleton />
            </Stack>
          </Fragment>
        )}
      </Box>
    );
  };

  questions = () => {
    return (
      <Box sx={{ marginTop: "30px" }}>
        {!this.state.questionRanksLoading ? (
          this.state.questionRanks?.length > 0 ? (
            this.state.questionsEditableByUser && this.state.editing ? (
              <DragDropContext
                nonce={this.props.nonce}
                onDragEnd={this.onDragEnd}
              >
                <Droppable droppableId="questions">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={this.getListStyle(snapshot.isDraggingOver)}
                    >
                      <Stack spacing={"10px"}>
                        {this.state.form.questions?.map(
                          (
                            qr: Omit<QuestionRankType, "question_pk">,
                            i: number,
                          ) => (
                            <Draggable
                              key={`key-${qr.question.pk}`}
                              draggableId={`id-${qr.question.pk}`}
                              index={i}
                              isDragDisabled={
                                !this.state.questionsEditableByUser
                              }
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={this.getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                  )}
                                >
                                  <DraggableQuestion
                                    key={i}
                                    question={qr.question}
                                    rank={i}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ),
                        )}
                        {provided.placeholder}
                      </Stack>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <Stack spacing={"10px"}>
                {this.state.questionRanks.map(
                  (qr: QuestionRankType, i: number) => (
                    <Question
                      key={i}
                      handleRemove={async () => {
                        await handleRemoveQuestionFromAssignment(
                          () =>
                            this.handleRemoveQuestionFromAssignmentCallback(),
                          this.props.urls.add_to_assignment,
                          this.state.assignment.questions?.filter(
                            (_qr) => _qr.pk === qr.pk,
                          )[0].pk,
                          this.error,
                        );
                      }}
                      bookmarked={this.state.teacher?.favourite_questions?.includes(
                        qr.question.pk,
                      )}
                      expanded={!this.state.editing}
                      gettext={this.props.gettext}
                      handleAddToAssignment={async (assignment: string) => {
                        await handleAddToAssignment(
                          assignment,
                          qr.question.pk,
                          this.props.urls.add_to_assignment,
                        );
                      }}
                      question={qr.question}
                      questionsEditableByUser={
                        this.state.questionsEditableByUser
                      }
                      showBookmark={
                        qr.question.is_owner !== undefined
                          ? !qr.question.is_owner
                          : false
                      }
                      toggleBookmarked={async () =>
                        await handleQuestionBookmarkClick(
                          this.props.gettext,
                          (teacher, message) =>
                            this.setState({
                              teacher,
                              snackbarIsOpen: true,
                              snackbarMessage: message,
                            }),
                          qr.question.pk,
                          this.state.teacher,
                          this.props.urls.teacher,
                          this.error,
                        )
                      }
                    />
                  ),
                )}
              </Stack>
            )
          ) : (
            <Typography>
              {this.props.gettext(
                "You assignment has no questions yet! Search our database to add questions.",
              )}
            </Typography>
          )
        ) : (
          <Fragment>
            <Stack spacing={"10px"}>
              <QuestionSkeleton />
              <QuestionSkeleton />
              <QuestionSkeleton />
              <QuestionSkeleton />
            </Stack>
          </Fragment>
        )}
      </Box>
    );
  };

  action = () => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() =>
        this.setState({ snackbarIsOpen: false, snackbarMessage: "" })
      }
      sx={{ color: "#fff" }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Box>
            <Paper elevation={0}>
              <Main>
                <ThemeProvider theme={saltise}>
                  <Toolbar
                    gettext={this.props.gettext}
                    nonce={this.props.nonce}
                    assignment={this.state.assignment}
                    distributeErrors={this.state.distributeErrors}
                    distributeWaiting={this.state.distributeWaiting}
                    editing={this.state.editing}
                    enableDistribute={this.state.assignment?.is_valid}
                    enableEdit={
                      this.state.questionsEditableByUser ||
                      this.props.metaEditableByUser
                    }
                    enableSave={
                      // wysiwyg editor will pad end with a newline on focus
                      (this.state.assignment.description !=
                        this.state.form.description?.trimEnd() ||
                        this.state.assignment.intro_page !=
                          this.state.form.intro_page?.trimEnd() ||
                        this.state.assignment.conclusion_page !=
                          this.state.form.conclusion_page?.trimEnd() ||
                        this.state.assignment.title !=
                          this.state.form.title?.trimEnd() ||
                        this.questionRankListChanged()) &&
                      assignmentTitleValidator(this.state.form.title)
                    }
                    groups={this.state.teacher?.assignable_groups?.filter(
                      (group) =>
                        // Remove groups that already have this assignment
                        !this.state.studentgroupassignments
                          .map((sga) => sga.group.pk)
                          .includes(group.pk),
                    )}
                    handleDistribute={this.handleDistribute}
                    handleEdit={this.handleEdit}
                    handleSave={this.handleSave}
                    lti={this.props.lti}
                  />
                </ThemeProvider>
              </Main>
            </Paper>
            <Main>
              {Object.prototype.hasOwnProperty.call(
                this.state.assignment,
                "is_valid",
              ) && !this.state.assignment.is_valid ? (
                <Alert severity="error" sx={{ marginTop: "32px" }}>
                  {this.props.gettext(
                    "There is a problem with this assignment and it cannot be distributed until fixed.",
                  )}
                </Alert>
              ) : null}
              <Stack spacing={"30px"}>
                <GeneralDescription
                  gettext={this.props.gettext}
                  editing={this.state.editing}
                  EditorIcons={this.props.EditorIcons}
                  identifier={this.props.assignment.pk}
                  owner={this.props.assignment.owner || [""]}
                  description={this.state.assignment.description || "N/A"}
                  intro_page={this.state.assignment.intro_page || ""}
                  conclusion_page={this.state.assignment.conclusion_page || ""}
                  title={this.state.assignment.title}
                  form={this.state.form}
                  setters={{
                    description: (value) =>
                      this.updateForm("description", value),
                    intro_page: (value) =>
                      this.updateForm("intro_page", value),
                    conclusion_page: (value) =>
                      this.updateForm("conclusion_page", value),
                    title: (value) => this.updateForm("title", value),
                  }}
                />

                <Box>
                  <Box>
                    <Typography variant="h2">
                      {this.props.gettext("Distributed to")}
                    </Typography>
                    <ThemeProvider theme={saltise}>
                      {this.groups()}
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h2">
                    {this.props.gettext("Questions")}
                  </Typography>
                  <ThemeProvider theme={saltise}>
                    {this.questions()}
                  </ThemeProvider>
                </Box>
              </Stack>
            </Main>
          </Box>
          <Snackbar
            message={this.state.snackbarMessage}
            onClose={() =>
              this.setState({ snackbarIsOpen: false, snackbarMessage: "" })
            }
            open={this.state.snackbarIsOpen}
          />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}

App.defaultProps = {
  metaEditableByUser: false,
  questionsEditableByUser: false,
};
