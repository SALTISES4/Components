/* eslint-disable camelcase */
import { Component, Fragment, h, render } from "preact";
export { h, render };

//functions
import { get, submitData } from "./ajax";
import { handleCollectionBookmarkClick } from "./functions";

//material ui components
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";

//components
import { Subtitle } from "./styledComponents";

import { SuperUserBar } from "./_dashboard/superUserBar";

import { Assignment as AssignmentSkeleton } from "./_skeletons/assignment";
import { GroupAssignment } from "./_localComponents/assignment";
import { CollectionBlock } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";

//types
import {
  GroupAssignmentType,
  GroupedAssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";
import { DashboardAppProps, DashboardAppState, TeacherType } from "./types";

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
      assignments: [],
      assignmentsLoading: true,
      collections: [],
      collectionsLoading: true,
      questions: [],
      questionsLoading: true,
      teacher: undefined,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  getAssignments = async (): Promise<void> => {
    // Load group assignments and regroup by assignment
    try {
      this.setState({
        assignmentsLoading: true,
      });

      const assignments = (await get(
        this.props.urls.assignments,
      )) as GroupAssignmentType[];

      // Groupby operation on assignment by pk
      const groupedAssignments = assignments.reduce(
        (
          accumulator: Record<string, GroupedAssignmentType>,
          currentValue: GroupAssignmentType,
        ) => {
          if (
            !Object.prototype.hasOwnProperty.call(
              accumulator,
              currentValue.assignment_pk,
            )
          ) {
            accumulator[currentValue.assignment_pk] = {
              ...currentValue,
              title: currentValue.title,
              groups: [],
              dueDate: undefined, // Needed?
              pk: 0,
            };
          }
          // TODO: clean this up and refactor to a separate function
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
      this.setState({
        assignments: Object.values(
          groupedAssignments,
        ) as GroupedAssignmentType[],
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      this.setState({
        assignmentsLoading: false,
      });
    }
  };

  getRecommendedCollections = async (): Promise<void> => {
    // Load a set of recommended collections
    try {
      this.setState({
        collectionsLoading: true,
      });

      const collections = (await get(
        this.props.urls.collections,
      )) as CollectionType[];

      this.setState({ collections });
    } catch (error: any) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    }

    // Load assignments
    this.getAssignments();

    // Load a set of recommended collections
    this.getRecommendedCollections();

    // Load new questions
    this.getQuestions();
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
  }

  handleQuestionBookmarkClick = async (pk: number): Promise<void> => {
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

        this.setState(
          {
            teacher,
          },
          () => console.info(this.state),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  assignments = () => {
    return (
      <Stack spacing="10px">
        {!this.state.assignmentsLoading ? (
          this.state.assignments?.length > 0 ? (
            this.state.assignments.map(
              (assignment: GroupedAssignmentType, i: number) => (
                <GroupAssignment
                  key={i}
                  assignment={assignment}
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
          {this.props.gettext("Featured Collections")}
        </Typography>
      );
    }
    return (
      <Typography variant="h2">
        {this.props.gettext("Recommended Collections")}
      </Typography>
    );
  };

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box margin="0 auto" maxWidth="980px" width="100%">
            <Typography variant="h1" align="center">
              {this.props.gettext("Good Morning,")} {this.props.user.username}
            </Typography>
            <Container align="center">
              <SuperUserBar
                {...this.state.teacher}
                gettext={this.props.gettext}
              />
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {this.props.gettext("Recent Assignments")}
                </Typography>
                <Link variant="h4" href={this.props.urls.assignmentsLink}>
                  {this.props.gettext("See my assignments")}
                </Link>
              </Subtitle>
              {this.assignments()}
            </Container>
            <Container>
              <Subtitle>
                {this.collectionsTitle()}
                <Link variant="h4" href={this.props.urls.collectionsLink}>
                  {this.props.gettext("Explore collections")}
                </Link>
              </Subtitle>
              <CollectionBlock
                collections={this.state.collections}
                gettext={this.props.gettext}
                handleBookmarkClick={(pk: number) =>
                  handleCollectionBookmarkClick(
                    (teacher) => this.setState({ teacher }),
                    pk,
                    this.state.teacher,
                    this.props.urls.teacher,
                  )
                }
                loading={this.state.collectionsLoading}
                logo={this.props.logo}
                teacher={this.state.teacher}
              />
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {this.props.gettext("Newly Added Questions")}
                </Typography>
                <Link variant="h4" href={this.props.urls.questionsLink}>
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
                  </Fragment>
                )}
              </Stack>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
