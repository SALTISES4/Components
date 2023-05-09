/* eslint-disable indent */
import { Component, Fragment, h, render } from "preact";
export { h, render };

import { get, submitData } from "./ajax";
import { handleCollectionBookmarkClick } from "./functions";

//mui
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import Link from "@mui/material/Link";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Stack from "@mui/material/Stack";

//components
import { Assignment as AssignmentSkeleton } from "./_skeletons/assignment";
import { AssignmentBis } from "./_localComponents/assignment_bis";
import { CollectionBlock } from "./_localComponents/collection";
import { GroupAssignment } from "./_localComponents/assignment";
import { Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";

//types
import {
  LibraryAppProps,
  LibraryAppState,
  PaginatedData,
  TeacherType,
} from "./types";
import {
  AssignmentType,
  CollectionType,
  GroupAssignmentType,
  GroupedAssignmentType,
  QuestionType,
} from "./_localComponents/types";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<LibraryAppProps, LibraryAppState> {
  constructor(props: LibraryAppProps) {
    super(props);
    this.state = {
      assignments: [],
      assignmentsLoading: true,
      collections: [],
      collectionsLoading: true,
      groupAssignments: [],
      groupAssignmentsLoading: true,
      questions: [],
      questionsExpanded: false,
      questionsLoading: true,
      teacher: undefined,
      type: 1,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  loadAssignments = async (): Promise<void> => {
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
      console.error(error);
    }
  };

  loadCollections = async (): Promise<void> => {
    try {
      this.setState({ collectionsLoading: true });

      const collections = await get(this.props.urls.collections);

      this.setState(
        {
          collections: (collections as PaginatedData).results.sort(
            (a: CollectionType, b: CollectionType) => {
              if (this.state.teacher?.user?.username !== undefined) {
                return (
                  +(this.state.teacher.user.username == a.user.username) -
                  +(this.state.teacher.user.username == b.user.username)
                );
              }
              return 0;
            },
          ) as CollectionType[],
          collectionsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  loadGroupAssignments = async (): Promise<void> => {
    try {
      this.setState({ groupAssignmentsLoading: true });

      const groupAssignments = (await get(
        this.props.urls.group_assignments,
      )) as GroupAssignmentType;

      // Groupby operation on assignment by pk
      const groupedAssignments = groupAssignments.reduce(
        (accumulator: {}, currentValue: {}) => {
          if (
            !Object.prototype.hasOwnProperty.call(
              accumulator,
              currentValue.assignment_pk,
            )
          ) {
            accumulator[currentValue.assignment_pk] = { ...currentValue };
            accumulator[currentValue.assignment_pk].groups = [];
          }
          accumulator[currentValue.assignment_pk].groups.unshift({
            title: currentValue.group,
            due_date: currentValue.due_date,
            progress: currentValue.progress,
            url: currentValue.url,
          });
          delete accumulator[currentValue.assignment_pk].due_date;
          delete accumulator[currentValue.assignment_pk].group;
          delete accumulator[currentValue.assignment_pk].progress;
          delete accumulator[currentValue.assignment_pk].url;
          return accumulator;
        },
        {},
      );

      this.setState(
        {
          groupAssignments: Object.values(
            groupedAssignments,
          ) as GroupedAssignmentType[],
          groupAssignmentsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  loadQuestions = async (): Promise<void> => {
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
      console.error(error);
    }
  };

  sync = async (): Promise<void> => {
    // Load teacher info
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;

      this.setState({
        teacher,
      });
    } catch (error: any) {
      console.error(error);
    }

    // Load collections
    this.loadCollections();

    // Load assignments
    this.loadGroupAssignments();
    this.loadAssignments();

    // Load questions
    this.loadQuestions();
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

        if (
          _assignments.filter((a) => a.pk == pk)[0].owner[0] == this.props.user
        ) {
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
        console.error(error);
      }
    }
  };

  handleQuestionBookmarkClick = async (pk: number): Promise<void> => {
    // Some extra logic needed here:
    // - If user unbookmarks a question they don't own, drop from state
    // - If user bookmarks or unbookmarks a question they own, resort

    if (this.state.teacher) {
      const index = this.state.teacher.favourite_questions.indexOf(pk);
      const newFavouriteQuestions = [
        ...this.state.teacher.favourite_questions,
      ];
      if (index >= 0) {
        newFavouriteQuestions.splice(index, 1);
      } else {
        newFavouriteQuestions.unshift(pk);
      }
      try {
        const teacher = (await submitData(
          this.props.urls.teacher,
          { favourite_questions: newFavouriteQuestions },
          "PUT",
        )) as TeacherType;

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
      } catch (error) {
        console.error(error);
      }
    }
  };

  collectionUpdate = (pk: number): void => {
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

  assignments = () => {
    // Combined list of GroupAssignments and Assignments
    return (
      <Stack spacing="10px">
        {!this.state.groupAssignmentsLoading ? (
          this.state.groupAssignments.map(
            (assignment: GroupedAssignmentType, i: number) => (
              <GroupAssignment
                key={i}
                assignment={assignment}
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
                !this.state.groupAssignments
                  .map((ga) => ga.assignment_pk)
                  .includes(assignment.pk),
            )
            .map((assignment: AssignmentType, i: number) => (
              <AssignmentBis
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
            variant="h4"
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
                  question={question}
                  showBookmark={
                    question.is_owner !== undefined
                      ? !question.is_owner
                      : false
                  }
                  toggleBookmarked={() =>
                    this.handleQuestionBookmarkClick(question.pk)
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
          <Box margin="0 auto" maxWidth="980px" width="100%">
            <Stack direction="row" spacing={1}>
              <Chip
                clickable={this.state.type != 1}
                label={this.props.gettext("Collections")}
                onClick={() => this.setState({ type: 1 })}
                variant={this.state.type == 1 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 2}
                label={this.props.gettext("Assignments")}
                onClick={() => this.setState({ type: 2 })}
                variant={this.state.type == 2 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 3}
                label={this.props.gettext("Questions")}
                onClick={() => this.setState({ type: 3 })}
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
                      (teacher) => this.setState({ teacher }),
                      pk,
                      this.state.teacher,
                      this.props.urls.teacher,
                    );
                    this.collectionUpdate(pk);
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
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
