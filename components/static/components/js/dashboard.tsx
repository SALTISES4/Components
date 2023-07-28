/* eslint-disable camelcase */
import { Component, Fragment, h, render } from "preact";
export { h, render };

//functions
import { get } from "./ajax";
import {
  handleAddToAssignment,
  handleCollectionBookmarkClick,
  handleQuestionBookmarkClick,
  updateCollections,
} from "./functions";

//material ui components
import Container from "@mui/system/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { Assignment as AssignmentSkeleton } from "./_skeletons/assignment";
import { CollectionBlock } from "./_localComponents/collection";
import { Main } from "./_reusableComponents/main";
import { Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Snackbar } from "./_reusableComponents/snackbar";
import { Subtitle } from "./styledComponents";
import { SuperUserBar } from "./_dashboard/superUserBar";
import { StudentGroupsAssignment } from "./_localComponents/studentgroupsassignment";

//types
import {
  CollectionType,
  QuestionType,
  StudentGroupAssignmentType,
  StudentGroupsAssignmentType,
} from "./_localComponents/types";
import {
  CollectionsPaginatedData,
  DashboardAppProps,
  DashboardAppState,
  TeacherType,
} from "./types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<DashboardAppProps, DashboardAppState> {
  constructor(props: DashboardAppProps) {
    super(props);
    this.state = {
      collections: [],
      collectionsLoading: true,
      questions: [],
      questionsLoading: true,
      snackbarIsOpen: false,
      snackbarMessage: "",
      studentgroupsassignments: [],
      studentgroupassignmentsLoading: true,
      teacher: undefined,
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

  getStudentGroupAssignments = async (): Promise<void> => {
    // Load studentgroupassignments and regroup by assignment
    try {
      this.setState({
        studentgroupassignmentsLoading: true,
      });

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
      this.setState({
        studentgroupsassignments: Object.values(
          sgaGroupedbyAssignment,
        ) as StudentGroupsAssignmentType[],
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        studentgroupassignmentsLoading: false,
      });
    }
  };

  getRecommendedCollections = async (): Promise<void> => {
    // Load a set of recommended collections
    try {
      this.setState({
        collectionsLoading: true,
      });

      const collections = (
        (await get(
          this.props.urls.collections,
        )) as unknown as CollectionsPaginatedData
      ).results as CollectionType[];

      this.setState({ collections });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        collectionsLoading: false,
      });
    }
  };

  getQuestions = async (): Promise<void> => {
    // Load a set of new questions
    try {
      this.setState({
        questionsLoading: true,
      });

      const questions = (await get(
        this.props.urls.questions,
      )) as QuestionType[];

      this.setState({ questions });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        questionsLoading: false,
      });
    }
  };

  sync = async (): Promise<void> => {
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;
      this.setState({ teacher });
    } catch (error) {
      this.error(error);
    }

    // Load studentgroupassignments
    this.getStudentGroupAssignments();

    // Load a set of recommended collections
    this.getRecommendedCollections();

    // Load new questions
    this.getQuestions();
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
  }

  assignments = () => {
    return (
      <Stack spacing="10px">
        {!this.state.studentgroupassignmentsLoading ? (
          this.state.studentgroupsassignments?.length > 0 ? (
            this.state.studentgroupsassignments.map(
              (sga: StudentGroupsAssignmentType, i: number) => (
                <StudentGroupsAssignment
                  key={i}
                  studentgroupsassignment={sga}
                  gettext={this.props.gettext}
                />
              ),
            )
          ) : (
            <Typography>
              {this.props.gettext("You have no recently due assignments.")}
            </Typography>
          )
        ) : (
          <AssignmentSkeleton />
        )}
      </Stack>
    );
  };

  collectionsTitle = () => {
    if (this.state.collections?.every((collection) => collection.featured)) {
      return (
        <Typography variant="h2">
          {this.props.gettext("Featured collections")}
        </Typography>
      );
    }
    return (
      <Typography variant="h2">
        {this.props.gettext("Recommended collections")}
      </Typography>
    );
  };

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Main>
            <Stack spacing={"50px"}>
              <Container align="center">
                <Typography variant="h1">
                  {this.props.gettext("Good morning,")}{" "}
                  {this.props.user.username}
                </Typography>
                <SuperUserBar
                  activeAssignmentCount={
                    this.state.teacher?.activeAssignmentCount
                  }
                  activeGroupCount={this.state.teacher?.activeGroupCount}
                  createdQuestionCount={
                    this.state.teacher?.createdQuestionCount
                  }
                  gettext={this.props.gettext}
                />
              </Container>
              <Container>
                <Subtitle>
                  <Typography variant="h2">
                    {this.props.gettext("Recent assignments")}
                  </Typography>
                  <Link
                    variant="body2"
                    href={this.props.urls.studentgroupassignmentsLink}
                  >
                    {this.props.gettext("See my assignments")}
                  </Link>
                </Subtitle>
                {this.assignments()}
              </Container>
              <Container>
                <Subtitle>
                  {this.collectionsTitle()}
                  <Link variant="body2" href={this.props.urls.collectionsLink}>
                    {this.props.gettext("Explore collections")}
                  </Link>
                </Subtitle>
                <CollectionBlock
                  collections={this.state.collections}
                  gettext={this.props.gettext}
                  handleBookmarkClick={async (pk: number) => {
                    await handleCollectionBookmarkClick(
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
                    updateCollections(
                      pk,
                      (collections) => this.setState({ collections }),
                      this.props.urls.collection,
                      this.state.collections,
                      this.error,
                    );
                  }}
                  loading={this.state.collectionsLoading}
                  logo={this.props.logo}
                  teacher={this.state.teacher}
                />
              </Container>
              <Container>
                <Subtitle>
                  <Typography variant="h2">
                    {this.props.gettext("Newly added questions")}
                  </Typography>
                  <Link variant="body2" href={this.props.urls.questionsLink}>
                    {this.props.gettext("Explore questions")}
                  </Link>
                </Subtitle>
                <Stack spacing="10px">
                  {!this.state.questionsLoading ? (
                    this.state.questions.map(
                      (question: QuestionType, i: number) => (
                        <Question
                          key={i}
                          bookmarked={this.state.teacher?.favourite_questions?.includes(
                            question.pk,
                          )}
                          expanded={true}
                          gettext={this.props.gettext}
                          handleAddToAssignment={async (
                            assignment: string,
                          ) => {
                            await handleAddToAssignment(
                              assignment,
                              question.pk,
                              this.props.urls.add_to_assignment,
                            );
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
                              (teacher, message) =>
                                this.setState({
                                  teacher,
                                  snackbarIsOpen: true,
                                  snackbarMessage: message,
                                }),
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
                    </Fragment>
                  )}
                </Stack>
              </Container>
            </Stack>
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
