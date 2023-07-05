import { Component, Fragment, h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise, { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  DetailedAssignmentAppProps,
  DetailedAssignmentAppState,
  TeacherType,
} from "./types";

import { detailedAssignment, teacher } from "./data";
import { Paper } from "@mui/material";
import { ValidateButton } from "./styledComponents";
import { GeneralDescription } from "./_assignments/generalDescription";
import { GroupType, QuestionType } from "./_localComponents/types";
import { Question } from "./_localComponents/question";
import { submitData } from "./ajax";
import Stack from "@mui/material/Stack";
import { Group } from "./_localComponents/group";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Group as GroupSkeleton } from "./_skeletons/group";
import { Toolbar } from "./_assignments/toolbar";
export class App extends Component<
  DetailedAssignmentAppProps,
  DetailedAssignmentAppState
> {
  constructor(props: DetailedAssignmentAppProps) {
    super(props);
    this.state = {
      detailedAssignment,
      questions: [],
      questionsLoading: false,
      groups: [],
      groupsLoading: false,
      teacher,
    };
  }

  componentDidMount(): void {
    // Fetch data from db to overwrite placeholders
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

  groups = () => {
    return (
      <ThemeProvider theme={saltise}>
        <Box sx={{ mt: "30px" }}>
          {!this.state.groupsLoading ? (
            this.state.detailedAssignment.groups?.length > 0 ? (
              <Stack spacing={"10px"}>
                {this.state.detailedAssignment.groups.map(
                  (group: GroupType, i: number) => (
                    <Group
                      key={i}
                      gettext={this.props.gettext}
                      group={group}
                    />
                  ),
                )}
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
      </ThemeProvider>
    );
  };

  questions = () => {
    return (
      <ThemeProvider theme={saltise}>
        <Box sx={{ marginTop: "30px" }}>
          {!this.state.questionsLoading ? (
            this.state.detailedAssignment.questions?.length > 0 ? (
              <Stack spacing={"10px"}>
                {this.state.detailedAssignment.questions.map(
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
      </ThemeProvider>
    );
  };

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Box width="calc(100% - 200px)" marginLeft="200px">
            <Paper elevation={0}>
              <Container sx={{ width: "65%" }}>
                <Toolbar gettext={this.props.gettext} />
              </Container>
            </Paper>
            <Container sx={{ width: "65%" }}>
              <Typography variant="h1" align="left">
                {this.state.detailedAssignment.title}
              </Typography>
              <Stack spacing={"50px"}>
                <Box>
                  <Typography variant="h2" sx={{ marginTop: "0px" }}>
                    {this.props.gettext("General")}
                  </Typography>
                  <GeneralDescription
                    gettext={this.props.gettext}
                    author={this.state.detailedAssignment.author}
                    title={this.state.detailedAssignment.title}
                    description={this.state.detailedAssignment.description}
                    instructions={
                      this.state.detailedAssignment.specialInstructions
                    }
                    notes={this.state.detailedAssignment.postAssignmentNotes}
                  />
                </Box>
                <Box>
                  {this.state.detailedAssignment.is_owner ? (
                    <Box>
                      <Typography variant="h2" sx={{ mt: "0px", mb: "30px" }}>
                        {this.props.gettext("Groups")}
                      </Typography>
                      {this.groups()}
                    </Box>
                  ) : null}
                </Box>
                <Box>
                  <Typography variant="h2" sx={{ mt: "0px", mb: "30px" }}>
                    {this.props.gettext("Questions")}
                  </Typography>
                  {this.questions()}
                  <ValidateButton
                    variant="contained"
                    sx={{ margin: "30px 0px" }}
                  >
                    <Typography> {this.props.gettext("Search")}</Typography>
                  </ValidateButton>
                </Box>
              </Stack>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
