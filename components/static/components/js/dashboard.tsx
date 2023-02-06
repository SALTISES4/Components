import { Component, h, render } from "preact";
export { h, render };

import { get } from "./ajax";

//material ui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";

//components
import { Subtitle } from "./styledComponents";

import { SuperUserBar } from "./_dashboard/superUserBar";

import { Assignment } from "./_localComponents/assignment";
import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";

//types
import {
  AssignmentType,
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

import { assignments, collections, questions, teacher } from "./data";

export class App extends Component<DashboardAppProps, DashboardAppState> {
  constructor(props: DashboardAppProps) {
    super(props);
    this.state = {
      assignments,
      collections,
      questions,
      teacher,
    };
  }

  assignments = () => {
    if (this.state.assignments.length > 0) {
      return (
        <Container>
          <Subtitle>
            <Typography variant="h2">
              {this.props.gettext("Active Assignments")}
            </Typography>
            <Link variant="h4" href={this.props.urls.assignmentsLink}>
              {this.props.gettext("See my assignments")}
            </Link>
          </Subtitle>
          <Stack spacing="10px">
            {this.state.assignments.map(
              (assignment: AssignmentType, i: number) => (
                <Assignment
                  key={i}
                  assignment={assignment}
                  gettext={this.props.gettext}
                />
              ),
            )}
          </Stack>
        </Container>
      );
    }
  };

  collectionsTitle = () => {
    if (this.state.collections.every((collection) => collection.featured)) {
      return (
        <Typography variant="h2">
          {this.props.gettext("Featured Collections")}
        </Typography>
      );
    }
    return (
      <Typography variant="h2">
        {this.props.gettext("Sample Collections")}
      </Typography>
    );
  };

  sync = async (): Promise<void> => {
    try {
      const assignments = (await get(
        this.props.urls.assignments,
      )) as AssignmentType[];
      const collections = await get(this.props.urls.collections);
      const questions = (await get(
        this.props.urls.questions,
      )) as QuestionType[];
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;

      this.setState(
        {
          assignments,
          collections: collections.results as CollectionType[],
          questions,
          teacher,
        },
        () => console.info(this.state),
      );
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount(): void {
    // Fetch data from db to overwrite placeholders
    this.sync();
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box width="calc(100% - 200px)" marginLeft="200px">
            <Typography variant="h1" align="center">
              {this.props.gettext("Good Morning,")} {this.props.user.username}
            </Typography>
            <Container align="center">
              <SuperUserBar
                {...this.state.teacher}
                gettext={this.props.gettext}
              />
            </Container>
            {this.assignments()}
            <Container>
              <Subtitle>
                {this.collectionsTitle()}
                <Link variant="h4" href={this.props.urls.collectionsLink}>
                  {this.props.gettext("Explore collections")}
                </Link>
              </Subtitle>
              <Grid container spacing="20px">
                {this.state.collections.map(
                  (collection: CollectionType, i: number) => (
                    <Grid key={i} item xs={6}>
                      <Collection
                        gettext={this.props.gettext}
                        logo={this.props.logo}
                        collection={collection}
                      />
                    </Grid>
                  ),
                )}
              </Grid>
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
                {this.state.questions.map(
                  (question: QuestionType, i: number) => (
                    <Question
                      key={i}
                      gettext={this.props.gettext}
                      question={question}
                    />
                  ),
                )}
              </Stack>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
