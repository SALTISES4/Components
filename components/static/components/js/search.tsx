/* eslint-disable indent */
import { Component, Fragment, h, render } from "preact";
export { h, render };

import { get, submitData } from "./ajax";

import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PeopleIcon from "@mui/icons-material/People";
import ScienceIcon from "@mui/icons-material/Science";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { Subtitle } from "./styledComponents";
import { AssignmentBis } from "./_localComponents/assignment_bis";
import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { SearchFilter } from "./_search/searchFilter";
import {
  SearchAppProps,
  SearchAppState,
  SearchData,
  TeacherType,
} from "./types";

import { assignments, collections, questions, teacher } from "./data";
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
      categoryFilters: [],
      collections,
      difficultyFilterLabels: {},
      difficultyFilters: [],
      disciplineFilters: [],
      height: 0,
      hitCount: 0,
      lastKeyStroke: 0,
      peerImpactFilterLabels: {},
      peerImpactFilters: [],
      questionLimit: 10,
      questions,
      searching: false,
      searchTerm: "",
      selectedCategories: [],
      selectedDifficulty: [],
      selectedDisciplines: [],
      selectedImpact: [],
      selectedTypes: ["Question", "Assignment", "Collection"],
      snackbarIsOpen: false,
      snackbarMessage: "",
      teacher,
      timeoutID: 0,
    };
  }

  typeFilterLabels = {
    Question: this.props.gettext("Question"),
    Assignment: this.props.gettext("Assigment"),
    Collection: this.props.gettext("Collection"),
  };

  typeFilters = ["Question", "Assignment", "Collection"];

  handleSubmit = async (): Promise<void> => {
    console.debug("handleSubmit called");
    /* Prevent searches from being submitted faster than once per DT ms */
    const DT = 500;
    const startTime = performance.now();
    const timeElapsed = startTime - this.state.lastKeyStroke;
    if (timeElapsed > DT || this.state.questions.length == 0) {
      console.info("Submitting...");
      window.clearTimeout(this.state.timeoutID);
      this.setState(
        {
          lastKeyStroke: performance.now(),
        },
        () => console.debug(this.state),
      );

      // Build query url for questions
      let searchString = this.state.searchTerm;

      if (this.state.selectedCategories.length > 0) {
        searchString = `${this.state.selectedCategories.reduce(
          (acc, curr) =>
            `${acc} category__title::${curr.replaceAll(" ", "_")}`,
          "",
        )} ${searchString}`;
      }

      if (this.state.selectedDisciplines.length > 0) {
        searchString = `${this.state.selectedDisciplines.reduce(
          (acc, curr) =>
            `${acc} discipline.title::${curr.replaceAll(" ", "_")}`,
          "",
        )} ${searchString}`;
      }

      if (this.state.selectedDifficulty.length > 0) {
        searchString = `${this.state.selectedDifficulty.reduce(
          (acc, curr) => `${acc} difficulty.label::${curr}`,
          "",
        )} ${searchString}`;
      }

      if (this.state.selectedImpact.length > 0) {
        searchString = `${this.state.selectedImpact.reduce(
          (acc, curr) => `${acc} peer_impact.label::${curr}`,
          "",
        )} ${searchString}`;
      }

      if (this.state.searchTerm.length > 2) {
        try {
          this.setState({ searching: true });

          if (this.state.selectedTypes.includes("Question")) {
            const queryString = new URLSearchParams();
            queryString.append("search_string", searchString);
            const url = new URL(
              this.props.urls.questions,
              window.location.origin,
            );
            url.search = queryString.toString();
            const data = (await get(url.toString())) as SearchData;
            console.debug(data);
            this.setState(
              {
                categoryFilters: data.meta.categories,
                difficultyFilterLabels: data.meta.difficulties.reduce(
                  (acc, curr) => {
                    acc[curr[0]] = curr[1];
                    return acc;
                  },
                  {},
                ),
                difficultyFilters: data.meta.difficulties.map(
                  (d) => `${d[0]}`,
                ),
                disciplineFilters: data.meta.disciplines,
                peerImpactFilterLabels: data.meta.impacts.reduce(
                  (acc, curr) => {
                    acc[curr[0]] = curr[1];
                    return acc;
                  },
                  {},
                ),
                peerImpactFilters: data.meta.impacts.map((d) => `${d[0]}`),
                hitCount: data.meta.hit_count,
                questions: data.results,
                searching: false,
              },
              () =>
                console.debug(
                  `Search time: ${(
                    (performance.now() - startTime) /
                    1000
                  ).toExponential(3)}s`,
                ),
            );
          } else {
            // Clear out question results
            this.setState({
              hitCount: 0,
              questions: [],
              questionLimit: 10,
              categoryFilters: [],
              difficultyFilterLabels: {},
              difficultyFilters: [],
              disciplineFilters: [],
              peerImpactFilterLabels: {},
              peerImpactFilters: [],
              selectedCategories: [],
              selectedDifficulty: [],
              selectedDisciplines: [],
              selectedImpact: [],
            });
          }

          if (this.state.selectedTypes.includes("Assignment")) {
            const queryString = new URLSearchParams();
            queryString.append("search_string", searchString);
            const url = new URL(
              this.props.urls.assignments,
              window.location.origin,
            );
            url.search = queryString.toString();
            const data = (await get(url.toString())) as SearchData;
            console.debug(data);
            this.setState(
              {
                assignments: data.results,
                searching: false,
              },
              () =>
                console.debug(
                  `Search time: ${(
                    (performance.now() - startTime) /
                    1000
                  ).toExponential(3)}s`,
                ),
            );
          }
        } catch (error) {
          console.debug(error);
          this.setState({
            snackbarIsOpen: true,
            snackbarMessage: this.props.gettext(
              "An error occurred.  Try refreshing this page.",
            ),
          });
        }
      } else {
        this.setState({
          assignments: [],
          hitCount: 0,
          questions: [],
          questionLimit: 10,
          categoryFilters: [],
          difficultyFilterLabels: {},
          difficultyFilters: [],
          disciplineFilters: [],
          peerImpactFilterLabels: {},
          peerImpactFilters: [],
          selectedCategories: [],
          selectedDifficulty: [],
          selectedDisciplines: [],
          selectedImpact: [],
        });
      }
    } else {
      window.clearTimeout(this.state.timeoutID);
      this.setState({
        lastKeyStroke: performance.now(),
        timeoutID: window.setTimeout(this.handleSubmit, DT),
      });
    }
  };

  sync = async (): Promise<void> => {
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;

      // Temp to populate during dev
      const collections = await get(this.props.urls.collections);

      this.setState(
        {
          collections: (collections as any).results as CollectionType[],
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

  handleQuestionBookmarkClick = async (pk: number): Promise<void> => {
    const index = this.state.teacher.favourite_questions.indexOf(pk);
    const newFavouriteQuestions = [...this.state.teacher.favourite_questions];
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
  };

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

  assignmentResults = () => {
    if (
      this.state.assignments.length > 0 &&
      this.state.selectedTypes.includes("Assignment")
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.assignments.length}
              {this.props.gettext(" results in Assignments")}
            </Typography>
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
        </Fragment>
      );
    }
  };

  collectionResults = () => {
    if (
      this.state.collections.length > 0 &&
      this.state.selectedTypes.includes("Collection")
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.collections.length}
              {this.props.gettext(" results in Collections")}
            </Typography>
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
                      this.handleCollectionBookmarkClick(collection.follow_url)
                    }
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Fragment>
      );
    }
  };

  questionResults = () => {
    if (
      this.state.questions.length > 0 &&
      this.state.selectedTypes.includes("Question")
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.questions.length > this.state.questionLimit ||
              this.state.questions.length < this.state.hitCount
                ? `${this.props.gettext("Top")} ${this.state.questionLimit}`
                : this.state.questions.length}{" "}
              {this.props.gettext("results in Questions")}
            </Typography>
            <Link
              variant="h4"
              onClick={() => {
                this.setState({
                  questionLimit: this.state.questions.length,
                });
              }}
              sx={{ cursor: "pointer" }}
            >
              {this.state.questions.length <= this.state.questionLimit
                ? ""
                : this.state.questions.length == this.state.hitCount
                ? this.props.gettext("View all results")
                : this.props.gettext("View top 50 results")}
            </Link>
          </Subtitle>
          <Stack spacing="10px">
            {[...this.state.questions]
              .slice(0, this.state.questionLimit)
              .map((question: QuestionType, i: number) => (
                <Question
                  key={i}
                  bookmarked={this.state.teacher.favourite_questions?.includes(
                    question.pk,
                  )}
                  difficultyLabels={this.state.difficultyFilterLabels}
                  gettext={this.props.gettext}
                  question={question}
                  toggleBookmarked={() =>
                    this.handleQuestionBookmarkClick(question.pk)
                  }
                />
              ))}
          </Stack>
        </Fragment>
      );
    }
  };

  results = () => {
    if (this.state.searchTerm.length < 3) {
      return (
        <span
          style={{
            visibility:
              this.state.searchTerm.length == 0 ? "hidden" : "visible",
          }}
        >
          {this.props.gettext("Keep typing...")}
        </span>
      );
    }
    if (this.state.questions.length > 0) {
      return (
        <span>
          {this.state.hitCount} {this.props.gettext("potential matches")}
        </span>
      );
    }
    return <span>{this.props.gettext("No results")}</span>;
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
                <TextField
                  fullWidth
                  onInput={(evt: InputEvent) => {
                    this.setState(
                      { searchTerm: evt.target?.value },
                      this.handleSubmit,
                    );
                  }}
                  placeholder={this.props.gettext("Type something...")}
                  sx={{
                    backgroundColor: "white",
                    borderColor: "white",
                    borderRadius: "4px",
                  }}
                  type="search"
                  variant="outlined"
                />
                <Typography sx={{ mt: "5px" }}>{this.results()}</Typography>
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
                  {this.props.gettext("Filter by")}
                </Typography>
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedTypes: selections,
                      },
                      this.handleSubmit,
                    );
                  }}
                  filter={{
                    choices: this.typeFilters,
                    icon: CategoryIcon,
                    notification: this.typeFilters.length,
                    subtitle: this.props.gettext("Types"),
                    title: this.props.gettext("Type"),
                  }}
                  labels={this.typeFilterLabels}
                  minimum={1}
                  selected={this.state.selectedTypes}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedDisciplines: selections,
                      },
                      this.handleSubmit,
                    );
                  }}
                  filter={{
                    choices: this.state.disciplineFilters,
                    icon: ScienceIcon,
                    notification: this.state.disciplineFilters.length,
                    subtitle: this.props.gettext("Disciplines"),
                    title: this.props.gettext("Discipline"),
                  }}
                  selected={this.state.selectedDisciplines}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedCategories: selections,
                      },
                      this.handleSubmit,
                    );
                  }}
                  filter={{
                    choices: this.state.categoryFilters,
                    icon: FilterAltIcon,
                    notification: this.state.categoryFilters.length,
                    subtitle: this.props.gettext("Categories"),
                    title: this.props.gettext("Category"),
                  }}
                  selected={this.state.selectedCategories}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedDifficulty: selections,
                      },
                      this.handleSubmit,
                    );
                  }}
                  filter={{
                    choices: this.state.difficultyFilters,
                    icon: NetworkCheckIcon,
                    notification: this.state.difficultyFilters.length,
                    subtitle: this.props.gettext("Difficulty levels"),
                    title: this.props.gettext("Difficulty"),
                  }}
                  labels={this.state.difficultyFilterLabels}
                  selected={this.state.selectedDifficulty}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedImpact: selections,
                      },
                      this.handleSubmit,
                    );
                  }}
                  filter={{
                    choices: this.state.peerImpactFilters,
                    icon: PeopleIcon,
                    notification: this.state.peerImpactFilters.length,
                    subtitle: this.props.gettext("Impact levels"),
                    title: this.props.gettext("Peer impact"),
                  }}
                  labels={this.state.peerImpactFilterLabels}
                  selected={this.state.selectedImpact}
                />
              </Box>
            </Box>
            <Box width={this.pageWidth}>
              <Container>{this.questionResults()}</Container>
              <Container>{this.assignmentResults()}</Container>
              <Container>{this.collectionResults()}</Container>
            </Box>
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
