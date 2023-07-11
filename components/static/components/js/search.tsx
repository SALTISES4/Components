/* eslint-disable indent */
import { Component, Fragment, h, render } from "preact";
export { h, render };

import { get, submitData } from "./ajax";
import {
  handleCollectionBookmarkClick,
  handleQuestionBookmarkClick,
  updateCollections,
} from "./functions";

import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PeopleIcon from "@mui/icons-material/People";
import RefreshIcon from "@mui/icons-material/Refresh";
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

import { Action, Subtitle } from "./styledComponents";
import { Assignment as AssignmentSkeleton } from "./_skeletons/assignment";
import { AssignmentBis } from "./_localComponents/assignment_bis";
import { CollectionBlock } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { SearchFilter } from "./_search/searchFilter";
import {
  CollectionsPaginatedData,
  SearchAppProps,
  SearchAppState,
  SearchData,
  TeacherType,
} from "./types";

import {
  AssignmentType,
  CollectionType,
  QuestionType,
} from "./_localComponents/types";
import { DifficultyCircleIcon } from "./_reusableComponents/difficultyIconQuestion";
import { PeerImpactIcon } from "./_reusableComponents/peerImpactIcon";

export class App extends Component<SearchAppProps, SearchAppState> {
  constructor(props: SearchAppProps) {
    super(props);
    this.state = {
      assignmentHitCount: 0,
      assignments: [],
      assignmentsLoaded: true,
      categoryFilters: [],
      collectionHitCount: 0,
      collections: [],
      collectionsLoaded: false,
      difficultyFilterLabels: {},
      difficultyFilters: [],
      disciplineFilters: [],
      lastKeyStroke: 0,
      peerImpactFilterLabels: {},
      peerImpactFilters: [],
      questionHitCount: undefined,
      questionPage: 0,
      questionPageSize: 10,
      questions: [],
      questionsLoaded: true,
      searchTerm: "",
      selectedCategories: [],
      selectedDifficulty: [],
      selectedDisciplines: [],
      selectedImpact: [],
      selectedTypes: [],
      snackbarIsOpen: false,
      snackbarMessage: "",
      teacher: undefined,
      timeoutID: 0,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  minimumSearchStringLength = 2;

  pageWidth = "82%";

  typeFilterLabels = {
    Question: this.props.gettext("Question"),
    Assignment: this.props.gettext("Assigment"),
    Collection: this.props.gettext("Collection"),
  };

  typeFilters = ["Question", "Assignment", "Collection"];

  error = (e: any): void => {
    const message = this.props.gettext(
      "An error occurred.  Try refreshing this page.",
    );
    console.error(e);
    this.setState({
      snackbarIsOpen: true,
      snackbarMessage: message,
    });
  };

  searchString = () => {
    // Build query url for questions
    let searchString = this.state.searchTerm;

    if (this.state.selectedCategories.length > 0) {
      searchString = `${this.state.selectedCategories.reduce(
        (acc, curr) => `${acc} category__title::${curr.replaceAll(" ", "_")}`,
        "",
      )} ${searchString}`;
    }

    if (this.state.selectedDisciplines.length > 0) {
      searchString = `${this.state.selectedDisciplines.reduce(
        (acc, curr) => `${acc} discipline.title::${curr.replaceAll(" ", "_")}`,
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

    return searchString;
  };

  submitQuestionSearch = async (
    startTime = performance.now(),
  ): Promise<void> => {
    if (
      this.state.selectedTypes.includes("Question") ||
      this.state.selectedTypes.length == 0
    ) {
      const queryString = new URLSearchParams();
      queryString.append("search_string", this.searchString());
      const url = new URL(
        `${this.props.urls.questions}${this.state.questionPage}`,
        window.location.origin,
      );
      url.search = queryString.toString();

      this.setState({ questionsLoaded: false });

      const data = (await get(url.toString())) as SearchData;

      this.setState(
        {
          categoryFilters: data.meta.categories,
          difficultyFilterLabels: data.meta.difficulties.reduce(
            (acc: Record<string, string>, curr: [number, string]) => {
              acc[curr[0]] = curr[1];
              return acc;
            },
            {},
          ),
          difficultyFilters: data.meta.difficulties.map((d) => `${d[0]}`),
          disciplineFilters: data.meta.disciplines,
          peerImpactFilterLabels: data.meta.impacts.reduce(
            (acc: Record<string, string>, curr: [number, string]) => {
              acc[curr[0]] = curr[1];
              return acc;
            },
            {},
          ),
          peerImpactFilters: data.meta.impacts.map((d) => `${d[0]}`),
          questionHitCount: data.meta.hit_count,
          questions: data.results as QuestionType[],
          questionsLoaded: true,
          questionPage: data.meta.page,
          questionPageSize: data.meta.page_size,
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
        categoryFilters: [],
        difficultyFilterLabels: {},
        difficultyFilters: [],
        disciplineFilters: [],
        peerImpactFilterLabels: {},
        peerImpactFilters: [],
        questionHitCount: undefined,
        questionPage: 0,
        questions: [],
        questionsLoaded: true,
        selectedCategories: [],
        selectedDifficulty: [],
        selectedDisciplines: [],
        selectedImpact: [],
      });
    }
  };

  handleSubmit = async (): Promise<void> => {
    console.debug("handleSubmit called");
    /* Prevent searches from being submitted faster than once per DT ms */
    const DT = 500;
    const startTime = performance.now();
    const timeElapsed = startTime - this.state.lastKeyStroke;
    console.info(timeElapsed);
    if (timeElapsed > DT) {
      window.clearTimeout(this.state.timeoutID);
      this.setState(
        {
          lastKeyStroke: performance.now(),
        },
        () => console.debug(this.state),
      );

      if (this.state.searchTerm.length > this.minimumSearchStringLength) {
        try {
          console.info("Submitting...");

          this.submitQuestionSearch(startTime);

          if (
            this.state.selectedTypes.includes("Assignment") ||
            this.state.selectedTypes.length == 0
          ) {
            const queryString = new URLSearchParams();
            queryString.append("search_string", this.searchString());
            const url = new URL(
              this.props.urls.assignments,
              window.location.origin,
            );
            url.search = queryString.toString();

            this.setState({ assignmentsLoaded: false });

            const data = (await get(url.toString())) as SearchData;

            this.setState(
              {
                assignmentHitCount: data.meta.hit_count,
                assignments: data.results as AssignmentType[],
                assignmentsLoaded: true,
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
            // Clear out assignment results
            this.setState({
              assignmentHitCount: 0,
              assignments: [],
            });
          }

          if (
            this.state.selectedTypes.includes("Collection") ||
            this.state.selectedTypes.length == 0
          ) {
            const queryString = new URLSearchParams();
            queryString.append("search_string", this.searchString());
            const url = new URL(
              this.props.urls.collections,
              window.location.origin,
            );
            url.search = queryString.toString();

            this.setState({ collectionsLoaded: false });

            const data = (await get(url.toString())) as SearchData;

            this.setState(
              {
                collectionHitCount: data.meta.hit_count,
                collections: data.results as CollectionType[],
                collectionsLoaded: true,
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
            // Clear out collection results
            this.setState({
              collectionHitCount: 0,
              collections: [],
            });
          }
        } catch (error: any) {
          this.error(error);
        }
      }

      if (this.state.searchTerm.length == 0) {
        this.setState(
          {
            assignmentHitCount: 0,
            assignments: [],
            questionHitCount: undefined,
            questions: [],
            categoryFilters: [],
            collectionHitCount: 0,
            collections: [],
            difficultyFilterLabels: {},
            difficultyFilters: [],
            disciplineFilters: [],
            peerImpactFilterLabels: {},
            peerImpactFilters: [],
            selectedCategories: [],
            selectedDifficulty: [],
            selectedDisciplines: [],
            selectedImpact: [],
          },
          () => {
            this.getRecommendedAssignments();
            this.getRecommendedCollections();
            this.getRecommendedQuestions();
          },
        );
      }
    } else {
      console.info("Clearing timeout");
      window.clearTimeout(this.state.timeoutID);
      this.setState({
        lastKeyStroke: performance.now(),
        timeoutID: window.setTimeout(this.handleSubmit, DT),
      });
    }
  };

  getRecommendedAssignments = async (): Promise<void> => {
    // Load a set of recommended assignments
    try {
      this.setState({
        assignmentsLoaded: false,
      });

      const assignments = (await get(
        this.props.urls.recommendations.assignments,
      )) as AssignmentType[];

      this.setState({
        assignmentHitCount: assignments.length,
        assignments,
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        assignmentsLoaded: true,
      });
    }
  };

  getRecommendedCollections = async (): Promise<void> => {
    // Load a set of recommended collections
    try {
      this.setState({
        collectionsLoaded: false,
      });

      const collections = (
        (await get(
          this.props.urls.recommendations.collections,
        )) as unknown as CollectionsPaginatedData
      ).results as CollectionType[];

      this.setState({
        collectionHitCount: collections.length,
        collections,
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        collectionsLoaded: true,
      });
    }
  };

  getRecommendedQuestions = async (): Promise<void> => {
    // Load a set of recommended questions
    try {
      this.setState({
        questionsLoaded: false,
      });

      const questions = (await get(
        this.props.urls.recommendations.questions,
      )) as QuestionType[];

      this.setState({
        questionHitCount: undefined, // Endpoint does not support pagination
        questions,
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.setState({
        questionsLoaded: true,
      });
    }
  };

  sync = async (): Promise<void> => {
    if (this.props.type !== undefined) {
      const index = this.typeFilters
        .map((d) => d.toLowerCase())
        .indexOf(this.props.type.toLowerCase());

      if (index >= 0) {
        this.setState({ selectedTypes: [this.typeFilters[index]] });
      }
    }

    // Load teacher info
    try {
      const teacher = (await get(this.props.urls.teacher)) as TeacherType;
      this.setState({ teacher });
    } catch (error: any) {
      this.error(error);
    }

    // Load a set of recommended assignments
    this.getRecommendedAssignments();

    // Load a set of recommended collections
    this.getRecommendedCollections();

    // Load a set of recommended questions
    this.getRecommendedQuestions();
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
  }

  handleAssignmentBookmarkClick = async (pk: string): Promise<void> => {
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

  assignmentResults = () => {
    if (
      this.state.selectedTypes.includes("Assignment") ||
      this.state.selectedTypes.length == 0
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.assignmentsLoaded
                ? `${this.state.assignmentHitCount} ${
                    this.state.searchTerm.length == 0
                      ? this.props.gettext("recommended Assignments")
                      : this.state.assignmentHitCount != 1
                      ? this.props.gettext("results in Assignments")
                      : this.props.gettext("result in Assignments")
                  }`
                : this.props.gettext("Loading assignments...")}
            </Typography>
          </Subtitle>
          <Stack spacing="10px">
            {this.state.assignmentsLoaded ? (
              this.state.assignments.length > 0 ? (
                this.state.assignments.map(
                  (assignment: AssignmentType, i: number) => (
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
                          : !(assignment.owner
                              ? assignment.owner
                                  .map((user) => user.username)
                                  .includes(this.props.user.username)
                              : false)
                      }
                      toggleBookmarked={() =>
                        this.handleAssignmentBookmarkClick(assignment.pk)
                      }
                    />
                  ),
                )
              ) : (
                <Typography>
                  {this.props.gettext("Your search returned no results.")}
                </Typography>
              )
            ) : (
              <Fragment>
                <AssignmentSkeleton />
                <AssignmentSkeleton />
                <AssignmentSkeleton />
              </Fragment>
            )}
          </Stack>
        </Fragment>
      );
    }
  };

  collectionResults = () => {
    if (
      this.state.selectedTypes.includes("Collection") ||
      this.state.selectedTypes.length == 0
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.collectionsLoaded
                ? `${this.state.collectionHitCount}
              ${
                this.state.searchTerm.length == 0
                  ? this.props.gettext("recommended Collections")
                  : this.state.collectionHitCount != 1
                  ? this.props.gettext("results in Collections")
                  : this.props.gettext("result in Collections")
              }`
                : this.props.gettext("Loading collections...")}
            </Typography>
          </Subtitle>
          {this.state.collections.length > 0 ? (
            <CollectionBlock
              collections={this.state.collections}
              gettext={this.props.gettext}
              handleBookmarkClick={async (pk: number) => {
                await handleCollectionBookmarkClick(
                  (teacher) => this.setState({ teacher }),
                  pk,
                  this.state.teacher,
                  this.props.urls.teacher,
                );
                updateCollections(
                  pk,
                  (collections) => this.setState({ collections }),
                  this.props.urls.collection,
                  this.state.collections,
                );
              }}
              loading={!this.state.collectionsLoaded}
              logo={this.props.logo}
              teacher={this.state.teacher}
            />
          ) : (
            <Typography>
              {this.props.gettext("Your search returned no results.")}
            </Typography>
          )}
        </Fragment>
      );
    }
  };

  questionResults = () => {
    if (
      this.state.selectedTypes.includes("Question") ||
      this.state.selectedTypes.length == 0
    ) {
      return (
        <Fragment>
          <Subtitle>
            <Typography variant="h2">
              {this.state.questionsLoaded
                ? `${
                    this.state.questionHitCount || this.state.questions.length
                  } ${
                    this.state.searchTerm.length == 0
                      ? this.props.gettext("recommended Questions")
                      : this.state.questionHitCount != 1
                      ? this.props.gettext("results in Questions")
                      : this.props.gettext("result in Questions")
                  }`
                : this.props.gettext("Loading questions...")}
            </Typography>
            <Link
              variant="h4"
              onClick={() => {
                this.setState({
                  selectedTypes: ["Question"],
                });
              }}
              sx={{
                cursor: "pointer",
                display: this.state.questionsLoaded ? "block" : "none",
              }}
            >
              {this.state.questionsLoaded &&
              this.state.questions.length <
                (this.state.questionHitCount || 0) &&
              this.state.selectedTypes.length != 1
                ? this.props.gettext("View all")
                : null}
            </Link>
          </Subtitle>
          <Stack spacing="10px">
            {this.state.questionsLoaded ? (
              this.state.questions.length > 0 ? (
                [...this.state.questions].map(
                  (question: QuestionType, i: number) => (
                    <Question
                      key={i}
                      bookmarked={this.state.teacher?.favourite_questions?.includes(
                        question.pk,
                      )}
                      difficultyLabels={this.state.difficultyFilterLabels}
                      expanded={
                        this.state.selectedTypes.length == 1 &&
                        this.state.selectedTypes.includes("Question")
                      }
                      gettext={this.props.gettext}
                      question={question}
                      showBookmark={
                        question.is_owner !== undefined
                          ? !question.is_owner
                          : this.props.user.username !=
                              question.user.username &&
                            !(question.collaborators
                              ? question.collaborators
                                  .map((user) => user.username)
                                  .includes(this.props.user.username)
                              : false)
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
                )
              ) : (
                <Typography>
                  {this.props.gettext("Your search returned no results.")}
                </Typography>
              )
            ) : (
              <Fragment>
                <QuestionSkeleton />
                <QuestionSkeleton />
                <QuestionSkeleton />
              </Fragment>
            )}
          </Stack>
          {this.state.selectedTypes.length == 1 &&
          this.state.selectedTypes.includes("Question") &&
          this.state.questionHitCount !== undefined ? (
            <Stack
              direction="row"
              spacing={2}
              mt="12px"
              sx={{ justifyContent: "center" }}
            >
              <Link
                color={this.state.questionPage == 0 ? "disabled" : "primary"}
                variant="h4"
                onClick={() => {
                  this.setState(
                    { questionPage: this.state.questionPage - 1 },
                    this.submitQuestionSearch,
                  );
                }}
                sx={{
                  cursor:
                    this.state.questionPage == 0 ? "not-allowed" : "pointer",
                }}
                underline={this.state.questionPage == 0 ? "none" : "always"}
              >
                {this.props.gettext("Previous")}
              </Link>

              <Typography>
                {this.state.questionPage + 1}/
                {Math.ceil(
                  this.state.questionHitCount / this.state.questionPageSize,
                )}
              </Typography>

              <Link
                color={
                  this.state.questionHitCount >
                  (this.state.questionPage + 1) * this.state.questionPageSize
                    ? "primary"
                    : "disabled"
                }
                variant="h4"
                onClick={() => {
                  this.setState(
                    { questionPage: this.state.questionPage + 1 },
                    this.submitQuestionSearch,
                  );
                }}
                sx={{
                  cursor:
                    this.state.questionHitCount >
                    (this.state.questionPage + 1) * this.state.questionPageSize
                      ? "pointer"
                      : "not-allowed",
                }}
                underline={
                  this.state.questionHitCount >
                  (this.state.questionPage + 1) * this.state.questionPageSize
                    ? "always"
                    : "none"
                }
              >
                {this.props.gettext("Next")}
              </Link>
            </Stack>
          ) : null}
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
    if (
      this.state.questionHitCount ||
      this.state.assignmentHitCount ||
      this.state.collectionHitCount
    ) {
      return (
        <span>
          {this.state.questionHitCount || 0}{" "}
          {this.state.questionHitCount != 1
            ? this.props.gettext("question results")
            : this.props.gettext("question result")}
          , {this.state.assignmentHitCount}{" "}
          {this.state.assignmentHitCount != 1
            ? this.props.gettext("assignment results")
            : this.props.gettext("assignment result")}
          , {this.state.collectionHitCount}{" "}
          {this.state.collectionHitCount != 1
            ? this.props.gettext("collection results")
            : this.props.gettext("collection result")}
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

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              sx={{
                padding: "15px 15px 16px",
                backgroundImage: `url(${this.props.urls.backgroundImage})`,
                backgroundSize: "cover",
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
                      {
                        questionPage: 0,
                        searchTerm: (evt.target as HTMLInputElement)?.value,
                      },
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
                      () =>
                        this.state.searchTerm.length >
                        this.minimumSearchStringLength
                          ? this.handleSubmit()
                          : null,
                    );
                  }}
                  filter={{
                    choices: this.typeFilters,
                    icon: CategoryIcon,
                    notification: this.state.selectedTypes.length,
                    subtitle: this.props.gettext("Types"),
                    title: this.props.gettext("Type"),
                  }}
                  labels={this.typeFilterLabels}
                  selected={this.state.selectedTypes}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedDisciplines: selections,
                      },
                      () =>
                        this.state.searchTerm.length >
                        this.minimumSearchStringLength
                          ? this.handleSubmit()
                          : null,
                    );
                  }}
                  disabled={
                    this.state.selectedTypes.length != 0 &&
                    !this.state.selectedTypes.includes("Question")
                  }
                  filter={{
                    choices: this.props.disciplines,
                    icon: ScienceIcon,
                    notification: this.state.selectedDisciplines.length,
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
                        selectedDifficulty: selections,
                      },
                      () =>
                        this.state.searchTerm.length >
                        this.minimumSearchStringLength
                          ? this.handleSubmit()
                          : null,
                    );
                  }}
                  disabled={
                    this.state.selectedTypes.length != 0 &&
                    !this.state.selectedTypes.includes("Question")
                  }
                  filter={{
                    choices: this.props.difficulties.map((d) => `${d[0]}`),
                    choiceIcons: this.props.difficulties.map((d, i) => (
                      <DifficultyCircleIcon
                        difficulty={{ label: d[0], score: parseInt(d[1]) }}
                        key={i}
                      />
                    )),
                    icon: NetworkCheckIcon,
                    notification: this.state.selectedDifficulty.length,
                    subtitle: this.props.gettext("Difficulty levels"),
                    title: this.props.gettext("Difficulty"),
                  }}
                  labels={this.props.difficulties.reduce(
                    (acc: Record<string, string>, curr: [number, string]) => {
                      acc[curr[0]] = curr[1];
                      return acc;
                    },
                    {},
                  )}
                  selected={this.state.selectedDifficulty}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedImpact: selections,
                      },
                      () =>
                        this.state.searchTerm.length >
                        this.minimumSearchStringLength
                          ? this.handleSubmit()
                          : null,
                    );
                  }}
                  disabled={
                    this.state.selectedTypes.length != 0 &&
                    !this.state.selectedTypes.includes("Question")
                  }
                  filter={{
                    choices: this.props.impacts.map((d) => `${d[0]}`),
                    choiceIcons: this.props.impacts.map((d, i) => (
                      <PeerImpactIcon
                        peerImpact={{ label: d[0], score: parseInt(d[1]) }}
                        key={i}
                      />
                    )),
                    icon: PeopleIcon,
                    notification: this.state.selectedImpact.length,
                    subtitle: this.props.gettext("Impact levels"),
                    title: this.props.gettext("Peer impact"),
                  }}
                  labels={this.props.impacts.reduce(
                    (acc: Record<string, string>, curr: [number, string]) => {
                      acc[curr[0]] = curr[1];
                      return acc;
                    },
                    {},
                  )}
                  selected={this.state.selectedImpact}
                />
                <SearchFilter
                  gettext={this.props.gettext}
                  callback={(selections) => {
                    this.setState(
                      {
                        selectedCategories: selections,
                      },
                      () =>
                        this.state.searchTerm.length >
                        this.minimumSearchStringLength
                          ? this.handleSubmit()
                          : null,
                    );
                  }}
                  disabled={
                    (this.state.selectedTypes.length != 0 &&
                      !this.state.selectedTypes.includes("Question")) ||
                    this.state.categoryFilters.length == 0
                  }
                  filter={{
                    choices: this.state.categoryFilters,
                    icon: FilterAltIcon,
                    notification: this.state.selectedCategories.filter((d) =>
                      this.state.categoryFilters.includes(d),
                    ).length,
                    subtitle: this.props.gettext("Categories"),
                    title: this.props.gettext("Category"),
                  }}
                  selected={this.state.selectedCategories}
                />
                <Box sx={{ flexGrow: 1 }}>
                  {this.state.selectedCategories.length > 0 ||
                  this.state.selectedDifficulty.length > 0 ||
                  this.state.selectedDisciplines.length > 0 ||
                  this.state.selectedImpact.length > 0 ||
                  this.state.selectedTypes.length > 0 ? (
                    <Box
                      alignItems="center"
                      color={"primary.main"}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <RefreshIcon fontSize="small" />
                      <Action
                        onClick={() =>
                          this.setState(
                            {
                              selectedCategories: [],
                              selectedDifficulty: [],
                              selectedDisciplines: [],
                              selectedImpact: [],
                              selectedTypes: [],
                            },
                            this.handleSubmit,
                          )
                        }
                        sx={{ paddingLeft: "8px" }}
                      >
                        {this.props.gettext("Clear all filters")}
                      </Action>
                    </Box>
                  ) : null}
                </Box>
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
