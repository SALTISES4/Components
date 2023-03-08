import { Component, h, render } from "preact";
export { h, render };

import { get, submitData } from "./ajax";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import CancelIcon from "@mui/icons-material/Cancel";

import { SearchBar, Subtitle } from "./styledComponents";
import { AssignmentBis } from "./_localComponents/assignment_bis";
import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { SearchFilter } from "./_search/searchFilter";
import { SearchAppProps, SearchAppState } from "./types";

import {
  assignments,
  collections,
  questions,
  typeFilters,
  disciplineFilters,
  categoryFilters,
  peerImpactFilters,
  difficultyFilters,
} from "./data";
import {
  AssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";

export class App extends Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);
    this.state = {
      assignments,
      collections,
      height: 0,
      questions,
      searchTerm: "",
      typeFilters,
      disciplineFilters,
      categoryFilters,
      peerImpactFilters,
      difficultyFilters,
    };
  }

  sync = async (): Promise<void> => {
    try {
      // Temp to populate during dev
      const collections = await get(this.props.urls.collections);

      this.setState(
        { collections: (collections as any).results as CollectionType[] },
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

  handleCollectionBookmarkClick = async (
    url: string | undefined,
  ): Promise<void> => {
    if (url) {
      try {
        await submitData(url, {}, "PUT");

        const collections = await get(this.props.urls.collections);
        this.setState({
          collections: (collections as any).results as CollectionType[],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  getHeight = (height: number) => {
    if (height > this.state.height) {
      this.setState({ height });
    }
  };

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  pageWidth = "82%";

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box
            marginLeft="200px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              sx={{
                mt: "-8px",
                padding: "15px 15px 16px",
                backgroundColor: "#061A4E",
              }}
            >
              <Box
                width={this.pageWidth}
                sx={{
                  " .MuiTypography-body1": {
                    ml: "15px",
                    color: "#fff",
                  },
                }}
              >
                <Typography>{this.props.gettext("Search")}</Typography>
                <SearchBar>
                  <Typography variant="h4">
                    {this.state.searchTerm || this.props.gettext("Search")}
                  </Typography>
                  <CancelIcon color="primary" fontSize="large" />
                </SearchBar>
                <Typography> XX {this.props.gettext("Results")}</Typography>
              </Box>
            </Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              sx={{ backgroundColor: "#fff", padding: "15px" }}
            >
              <Box
                width={this.pageWidth}
                display="flex"
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Typography variant="h4" sx={{ margin: "5px 10px" }}>
                  {this.props.gettext("Filtred by")}
                </Typography>
                <SearchFilter
                  gettext={this.props.gettext}
                  filter={typeFilters}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  filter={disciplineFilters}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  filter={categoryFilters}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  filter={difficultyFilters}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  filter={peerImpactFilters}
                />
              </Box>
            </Box>
            <Box width={this.pageWidth}>
              <Container>
                <Subtitle>
                  <Typography variant="h2">
                    {this.state.questions.length}
                    {this.props.gettext(" results in Questions")}
                  </Typography>
                  <Link variant="h4">
                    {this.props.gettext("View All Results")}
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
              <Container>
                <Subtitle>
                  <Typography variant="h2">
                    {this.state.assignments.length}
                    {this.props.gettext(" results in Assignments")}
                  </Typography>
                  <Link variant="h4">
                    {this.props.gettext("View All Results")}
                  </Link>
                </Subtitle>
                <Stack spacing="10px">
                  {this.state.assignments.map(
                    (assignment: AssignmentType, i: number) => (
                      <AssignmentBis
                        key={i}
                        assignment={assignment}
                        gettext={this.props.gettext}
                      />
                    ),
                  )}
                </Stack>
              </Container>
              <Container>
                <Subtitle>
                  <Typography variant="h2">
                    {this.state.collections.length}
                    {this.props.gettext(" results in Collections")}
                  </Typography>
                  <Link variant="h4">
                    {this.props.gettext("View All Results")}
                  </Link>
                </Subtitle>
                <Grid container spacing="20px">
                  {this.state.collections.map(
                    (collection: CollectionType, i: number) => (
                      <Grid key={i} item xs={6}>
                        <Collection
                          collection={collection}
                          gettext={this.props.gettext}
                          getHeight={this.getHeight}
                          logo={this.props.logo}
                          minHeight={this.state.height}
                          toggleBookmarked={() =>
                            this.handleCollectionBookmarkClick(
                              collection.follow_url,
                            )
                          }
                        />
                      </Grid>
                    ),
                  )}
                </Grid>
              </Container>
            </Box>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
