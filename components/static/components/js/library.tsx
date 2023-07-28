/* eslint-disable indent */
import { Component, Fragment, h, render } from "preact";
export { h, render };

//functions
import { get, submitData } from "./ajax";
import {
  handleAddToAssignment,
  handleCollectionBookmarkClick,
  handleQuestionBookmarkClick,
} from "./functions";

//material ui components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import Link from "@mui/material/Link";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Stack from "@mui/material/Stack";

//components
import { Assignment as AssignmentSkeleton } from "./_skeletons/assignment";
import { Assignment } from "./_localComponents/assignment";
import { CollectionBlock } from "./_localComponents/collection";
import { Main } from "./_reusableComponents/main";
import { Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Snackbar } from "./_reusableComponents/snackbar";
import { StudentGroupsAssignment } from "./_localComponents/studentgroupsassignment";

//types
import {
  CollectionsPaginatedData,
  LibraryAppProps,
  LibraryAppState,
  TeacherType,
} from "./types";
import {
  AssignmentType,
  CollectionType,
  QuestionType,
  StudentGroupAssignmentType,
  StudentGroupsAssignmentType,
} from "./_localComponents/types";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<LibraryAppProps, LibraryAppState> {
  TYPES = [1, 2, 3];

  constructor(props: LibraryAppProps) {
    super(props);

    const querystring = new URL(window.location.href).searchParams;
    const view = querystring.get("view") || "";
    let type = 1;
    if (view && this.TYPES.includes(parseInt(view))) {
      type = parseInt(view);
    }

    this.state = {
      assignments: [],
      assignmentsLoading: true,
      collections: [],
      collectionsLoading: true,
      studentgroupsassignments: [],
      studentgroupassignmentsLoading: true,
      questions: [],
      questionsExpanded: false,
      questionsLoading: true,
      snackbarIsOpen: false,
      snackbarMessage: "",
      teacher: undefined,
      type,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
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

  getAssignments = async (): Promise<void> => {
    try {
      this.setState({ assignmentsLoading: true });

      const assignments = (await get(
        this.props.urls.assignments,
      )) as AssignmentType[];

      this.setState(
        {
          assignments: assignments.sort(
            (a: AssignmentType, b: AssignmentType) => {
              return +(a.is_owner || false) - +(b.is_owner || false);
            },
          ),
          assignmentsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  getCollections = async (): Promise<void> => {
    try {
      this.setState({ collectionsLoading: true });

      const collections = await get(this.props.urls.collections);

      this.setState(
        {
          collections: (
            collections as unknown as CollectionsPaginatedData
          ).results.sort((a: CollectionType, b: CollectionType) => {
            if (this.state.teacher?.user?.username !== undefined) {
              return (
                +(this.state.teacher.user.username == a.user.username) -
                +(this.state.teacher.user.username == b.user.username)
              );
            }
            return 0;
          }) as CollectionType[],
          collectionsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  getStudentGroupAssignments = async (): Promise<void> => {
    try {
      this.setState({ studentgroupassignmentsLoading: true });

      const sga = (await get(
        this.props.urls.studentgroupassignments,
      )) as StudentGroupAssignmentType[];

      // Groupby operation on assignment by pk
      const sgaGroupedbyAssignment = sga.reduce(
        (
          accumulator: Record<string, StudentGroupsAssignmentType>,
          currentValue: StudentGroupAssignmentType,
        ) => {
          if (
            !Object.prototype.hasOwnProperty.call(
              accumulator,
              currentValue.assignment.pk,
            )
          ) {
            accumulator[currentValue.assignment.pk] = {
              assignment: currentValue.assignment,
              author: currentValue.author,
              distributionState: currentValue.distributionState,
              groups: [],
              questionCount: currentValue.questionCount,
              title: currentValue.title,
            };
          }

          accumulator[currentValue.assignment.pk].groups.unshift({
            assignment: currentValue.assignment,
            distributionState: currentValue.distributionState,
            group: currentValue.group,
            title: currentValue.group.title,
            due_date: currentValue.due_date,
            progress: currentValue.progress,
            url: currentValue.url,
          });

          return accumulator;
        },
        {},
      );

      this.setState(
        {
          studentgroupsassignments: Object.values(
            sgaGroupedbyAssignment,
          ) as StudentGroupsAssignmentType[],
          studentgroupassignmentsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  getQuestions = async (): Promise<void> => {
    try {
      this.setState({ questionsLoading: true });
      const questions = (await get(
        this.props.urls.questions,
      )) as QuestionType[];

      this.setState(
        {
          questions: questions.sort((a: QuestionType, b: QuestionType) => {
            if (this.state.teacher) {
              return (
                +this.state.teacher?.favourite_questions.includes(b.pk) -
                +this.state.teacher?.favourite_questions.includes(a.pk)
              );
            }
            return 0;
          }),
          questionsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  updateAssignment = async (pk: string): Promise<void> => {
    try {
      const url = new URL(
        this.props.urls.assignments,
        window.location.protocol + window.location.host,
      );
      url.pathname = `${url.pathname + pk}/`;

      const assignment = (await get(
        url.toString(),
      )) as unknown as AssignmentType;

      const _assignments = [...this.state.assignments];
      const index = _assignments.map((a) => a.pk).indexOf(assignment.pk);
      _assignments.splice(index, 1, assignment);

      this.setState({ assignments: _assignments }, () =>
        console.info(this.state),
      );
    } catch (error: any) {
      this.error(error);
    }
  };

  updateCollections = (pk: number): void => {
    let _collections = [...this.state.collections];

    if (
      _collections.filter((c) => c.pk == pk)[0].user.username !=
      this.props.user.username
    ) {
      _collections = _collections.filter((c) => c.pk != pk);
    }

    this.setState(
      {
        collections: _collections,
      },
      () => console.info(this.state),
    );
  };

  updateLocation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", `${this.state.type}`);
    window.history.pushState({}, "", url);
  };

  sync = async (): Promise<void> => {
    // Load teacher info
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;

      this.setState({
        teacher,
      });
    } catch (error: any) {
      this.error(error);
    }

    // Load collections
    this.getCollections();

    // Load assignments
    this.getStudentGroupAssignments();
    this.getAssignments();

    // Load questions
    this.getQuestions();
  };

  componentDidMount(): void {
    this.sync();
  }

  handleAssignmentBookmarkClick = async (pk: string): Promise<void> => {
    // Some extra logic needed here:
    // - If user unbookmarks an assignment they don't own, drop from state
    // - If user bookmarks or unbookmarks an assignment they own, resort
    if (this.state.teacher?.assignment_pks) {
      const index = this.state.teacher.assignment_pks.indexOf(pk);
      const newAssignmentPks = [...this.state.teacher.assignment_pks];
      if (index >= 0) {
        newAssignmentPks.splice(index, 1);
      } else {
        newAssignmentPks.unshift(pk);
      }
      try {
        const teacher = (await submitData(
          this.props.urls.teacher,
          { assignment_pks: newAssignmentPks },
          "PUT",
        )) as TeacherType;

        let _assignments = [...this.state.assignments];

        const owner = _assignments
          .filter((a) => a.pk == pk)
          .at(0)
          ?.owner?.at(0);

        if (owner && owner.username == this.props.user.username) {
          _assignments.sort((a: AssignmentType, b: AssignmentType) => {
            return (
              +newAssignmentPks.includes(b.pk) -
              +newAssignmentPks.includes(a.pk)
            );
          });
        } else if (index >= 0) {
          _assignments = _assignments.filter((a) => a.pk != pk);
        }

        this.setState(
          {
            assignments: _assignments,
            teacher,
          },
          () => console.info(this.state),
        );
      } catch (error) {
        this.error(error);
      }
    }
  };

  handleQuestionBookmarkClickCallback = (
    teacher: TeacherType,
    index: number,
    newFavouriteQuestions: number[],
    pk: number,
  ) => {
    // Some extra logic needed here:
    // - If user unbookmarks a question they don't own, drop from state
    // - If user bookmarks or unbookmarks a question they own, resort
    let _questions = [...this.state.questions];

    if (
      _questions.filter((q) => q.pk == pk)[0].user.username ==
      this.props.user.username
    ) {
      _questions.sort((a: QuestionType, b: QuestionType) => {
        return (
          +newFavouriteQuestions.includes(b.pk) -
          +newFavouriteQuestions.includes(a.pk)
        );
      });
    } else if (index >= 0) {
      _questions = _questions.filter((q) => q.pk != pk);
    }

    this.setState(
      {
        questions: _questions,
        teacher,
      },
      () => console.info(this.state),
    );
  };

  assignments = () => {
    // Combined list of GroupAssignments and Assignments
    return (
      <Stack spacing="10px">
        {!this.state.studentgroupassignmentsLoading ? (
          this.state.studentgroupsassignments.map(
            (assignment: StudentGroupsAssignmentType, i: number) => (
              <StudentGroupsAssignment
                key={i}
                studentgroupsassignment={assignment}
                gettext={this.props.gettext}
              />
            ),
          )
        ) : (
          <Fragment>
            <AssignmentSkeleton />
            <AssignmentSkeleton />
            <AssignmentSkeleton />
          </Fragment>
        )}
        {!this.state.assignmentsLoading ? (
          this.state.assignments
            .filter(
              (assignment) =>
                !this.state.studentgroupsassignments
                  .map((sga) => sga.assignment.pk)
                  .includes(assignment.pk),
            )
            .map((assignment: AssignmentType, i: number) => (
              <Assignment
                key={i}
                assignment={assignment}
                bookmarked={this.state.teacher?.assignment_pks?.includes(
                  assignment.pk,
                )}
                gettext={this.props.gettext}
                showBookmark={
                  assignment.is_owner !== undefined
                    ? !assignment.is_owner
                    : false
                }
                toggleBookmarked={() =>
                  this.handleAssignmentBookmarkClick(assignment.pk)
                }
              />
            ))
        ) : (
          <Fragment>
            <AssignmentSkeleton />
            <AssignmentSkeleton />
            <AssignmentSkeleton />
          </Fragment>
        )}
      </Stack>
    );
  };

  questionCTA = () => {
    if (!this.state.questionsLoading) {
      return (
        <Box
          alignItems="center"
          display="flex"
          mb="20px"
          sx={{ flexFlow: "row-reverse", gridGap: "10px" }}
        >
          <Link
            onClick={() =>
              this.setState({
                questionsExpanded: !this.state.questionsExpanded,
              })
            }
            sx={{ cursor: "pointer" }}
            variant="body2"
          >
            {this.state.questionsExpanded
              ? this.props.gettext("Collapse all questions")
              : this.props.gettext("Expand all questions")}
          </Link>
          {this.state.questionsExpanded ? (
            <CloseFullscreenIcon color="primary" fontSize="small" />
          ) : (
            <OpenInFullIcon color="primary" fontSize="small" />
          )}
        </Box>
      );
    }
  };

  questions = () => {
    return (
      <Fragment>
        {this.questionCTA()}
        <Stack spacing="10px">
          {!this.state.questionsLoading ? (
            [...this.state.questions].map(
              (question: QuestionType, i: number) => (
                <Question
                  key={i}
                  bookmarked={this.state.teacher?.favourite_questions?.includes(
                    question.pk,
                  )}
                  expanded={this.state.questionsExpanded}
                  gettext={this.props.gettext}
                  handleAddToAssignment={async (assignment: string) => {
                    await handleAddToAssignment(
                      assignment,
                      question.pk,
                      this.props.urls.add_to_assignment,
                    );
                    this.updateAssignment(assignment);
                  }}
                  question={question}
                  showBookmark={
                    question.is_owner !== undefined
                      ? !question.is_owner
                      : false
                  }
                  toggleBookmarked={async () =>
                    await handleQuestionBookmarkClick(
                      this.props.gettext,
                      (teacher, message, index, newFavouriteQuestions) => {
                        if (index && newFavouriteQuestions) {
                          this.handleQuestionBookmarkClickCallback(
                            teacher,
                            index,
                            newFavouriteQuestions,
                            question.pk,
                          );
                        }
                      },
                      question.pk,
                      this.state.teacher,
                      this.props.urls.teacher,
                      this.error,
                    )
                  }
                />
              ),
            )
          ) : (
            <Fragment>
              <QuestionSkeleton />
              <QuestionSkeleton />
              <QuestionSkeleton />
              <QuestionSkeleton />
              <QuestionSkeleton />
            </Fragment>
          )}
        </Stack>
      </Fragment>
    );
  };

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Main>
            <Stack direction="row" spacing={1} mt={"30px"}>
              <Chip
                clickable={this.state.type != 1}
                label={this.props.gettext("Collections")}
                onClick={() => this.setState({ type: 1 }, this.updateLocation)}
                variant={this.state.type == 1 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 2}
                label={this.props.gettext("Assignments")}
                onClick={() => this.setState({ type: 2 }, this.updateLocation)}
                variant={this.state.type == 2 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 3}
                label={this.props.gettext("Questions")}
                onClick={() => this.setState({ type: 3 }, this.updateLocation)}
                variant={this.state.type == 3 ? "selected" : "outlined"}
              />
            </Stack>
            <Box marginTop="40px">
              {this.state.type == 1 ? (
                <CollectionBlock
                  collections={this.state.collections}
                  gettext={this.props.gettext}
                  handleBookmarkClick={(pk: number) => {
                    handleCollectionBookmarkClick(
                      this.props.gettext,
                      (teacher, message) =>
                        this.setState({
                          teacher,
                          snackbarIsOpen: true,
                          snackbarMessage: message,
                        }),
                      pk,
                      this.state.teacher,
                      this.props.urls.teacher,
                      this.error,
                    );
                    this.updateCollections(pk);
                  }}
                  loading={this.state.collectionsLoading}
                  logo={this.props.logo}
                  teacher={this.state.teacher}
                />
              ) : this.state.type == 2 ? (
                this.assignments()
              ) : (
                this.questions()
              )}
            </Box>
          </Main>
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
