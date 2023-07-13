import { Component, Fragment, h, render } from "preact";
export { h, render };

//functions
import { get, submitData } from "./ajax";
import { handleQuestionBookmarkClick } from "./functions";

//material ui components
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

//components
import { GeneralDescription } from "./_assignments/generalDescription";
import { Question } from "./_localComponents/question";
import { StudentGroupAssignment } from "./_localComponents/group";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Group as GroupSkeleton } from "./_skeletons/group";
import { Toolbar } from "./_assignments/toolbar";

//types
import {
  TeacherType,
  UpdateAssignmentAppProps,
  UpdateAssignmentAppState,
} from "./types";
import {
  AssignmentType,
  QuestionType,
  StudentGroupAssignmentType,
} from "./_localComponents/types";
import { StudentGroupAssignmentCreateForm } from "./_assignments/types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise, { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<
  UpdateAssignmentAppProps,
  UpdateAssignmentAppState
> {
  constructor(props: UpdateAssignmentAppProps) {
    super(props);
    this.state = {
      assignment: undefined,
      questions: [],
      questionsLoading: false,
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

  error = (e: any): void => {
    const message = this.props.gettext(
      "An error occurred.  Try refreshing this page.",
    );
    console.error(e);
    // deepcode ignore ReactNextState: allow use of gettext props in setState
    this.setState({
      snackbarIsOpen: true,
      snackbarMessage: message,
    });
  };

  loadQuestions = async (): Promise<void> => {
    try {
      this.setState({ questionsLoading: true });

      const assignment = (await get(
        this.props.urls.assignment,
      )) as unknown as AssignmentType;

      const questions = assignment.questions?.map((qr) => qr.question);

      this.setState(
        {
          assignment,
          questions,
          questionsLoading: false,
        },
        () => console.info(this.state),
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

    this.loadQuestions();
    this.loadStudentGroupAssignments();
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
  }

  handleDistribute = async (partialForm: StudentGroupAssignmentCreateForm) => {
    // Append assignment pk to form
    const form = Object.assign(partialForm, {
      assignment_pk: this.props.assignment.pk,
    });

    try {
      const sga = await submitData(this.props.urls.distribute, form, "POST");
      console.info(sga);
    } catch {}
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
        {!this.state.questionsLoading ? (
          this.state.questions?.length > 0 ? (
            <Stack spacing={"10px"}>
              {this.state.questions.map(
                (question: QuestionType, i: number) => (
                  <Question
                    key={i}
                    bookmarked={this.state.teacher?.favourite_questions?.includes(
                      question.pk,
                    )}
                    expanded={true}
                    gettext={this.props.gettext}
                    question={question}
                    showBookmark={
                      question.is_owner !== undefined
                        ? !question.is_owner
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
                        question.pk,
                        this.state.teacher,
                        this.props.urls.teacher,
                      )
                    }
                  />
                ),
              )}
            </Stack>
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
              <Container sx={{ width: "65%" }}>
                <ThemeProvider theme={saltise}>
                  <Toolbar
                    gettext={this.props.gettext}
                    enableDistribute={this.state.assignment?.is_valid}
                    enableEditMode={this.props.editableByUser}
                    groups={this.state.teacher?.assignable_groups?.filter(
                      (group) =>
                        // Remove groups that already have this assignment
                        !this.state.studentgroupassignments
                          .map((sga) => sga.group.pk)
                          .includes(group.pk),
                    )}
                    handleDistribute={this.handleDistribute}
                  />
                </ThemeProvider>
              </Container>
            </Paper>
            <Container sx={{ width: "65%" }}>
              <Typography variant="h1" align="left">
                {this.props.assignment.title}
              </Typography>
              <Stack spacing={"50px"}>
                <Box>
                  <Typography variant="h2" sx={{ marginTop: "0px" }}>
                    {this.props.gettext("General")}
                  </Typography>
                  <GeneralDescription
                    gettext={this.props.gettext}
                    description={this.props.assignment.description || ""}
                    identifier={this.props.assignment.pk}
                    instructions={this.props.assignment.intro_page || ""}
                    notes={this.props.assignment.conclusion_page || ""}
                    owner={this.props.assignment.owner || [""]}
                  />
                </Box>
                <Box>
                  <Box>
                    <Typography variant="h2" sx={{ mt: "0px", mb: "30px" }}>
                      {this.props.gettext("Groups")}
                    </Typography>
                    <ThemeProvider theme={saltise}>
                      {this.groups()}
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h2" sx={{ mt: "0px", mb: "30px" }}>
                    {this.props.gettext("Questions")}
                  </Typography>
                  <ThemeProvider theme={saltise}>
                    {this.questions()}
                  </ThemeProvider>
                </Box>
              </Stack>
            </Container>
          </Box>
          <Snackbar
            action={this.action()}
            autoHideDuration={6000}
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
  editableByUser: false,
};
