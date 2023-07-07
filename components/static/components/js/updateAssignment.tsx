import { Component, Fragment, h, render } from "preact";
export { h, render };

//functions
import { get, submitData } from "./ajax";

//material ui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { ValidateButton } from "./styledComponents";
import { GeneralDescription } from "./_assignments/generalDescription";
import { GroupType, QuestionType } from "./_localComponents/types";
import { Question } from "./_localComponents/question";
import { Group } from "./_localComponents/group";
import { Question as QuestionSkeleton } from "./_skeletons/question";
import { Group as GroupSkeleton } from "./_skeletons/group";
import { Toolbar } from "./_assignments/toolbar";

//types
import {
  UpdateAssignmentAppProps,
  UpdateAssignmentAppState,
  TeacherType,
} from "./types";

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
      questions: [],
      questionsLoading: false,
      groups: [],
      groupsLoading: false,
      teacher: undefined,
    };
  }

  loadQuestions = async (): Promise<void> => {
    try {
      this.setState({ questionsLoading: true });

      const data = await get(this.props.urls.questions);
      const questions = data.questions.map(
        (qr) => qr.question,
      ) as QuestionType[];

      this.setState(
        {
          questions,
          questionsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  loadGroups = async (): Promise<void> => {
    try {
      this.setState({ groupsLoading: true });

      const groups = (await get(this.props.urls.groups)) as GroupType[];

      this.setState(
        {
          groups,
          groupsLoading: false,
        },
        () => console.info(this.state),
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  componentDidMount(): void {
    this.loadQuestions();
    // this.loadGroups();
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
      <Box sx={{ mt: "30px" }}>
        {!this.state.groupsLoading ? (
          this.state.groups?.length > 0 ? (
            <Stack spacing={"10px"}>
              {this.state.groups.map((group: GroupType, i: number) => (
                <Group key={i} gettext={this.props.gettext} group={group} />
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
          <Box>
            <Paper elevation={0}>
              <Container sx={{ width: "65%" }}>
                <ThemeProvider theme={saltise}>
                  <Toolbar
                    gettext={this.props.gettext}
                    enableEditMode={this.props.editableByUser}
                    groups={this.state.groups.map((g) => ({
                      title: g.title,
                      pk: g.pk,
                    }))}
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
                    identifier={this.props.assignment.pk}
                    owner={this.props.assignment.owner}
                    description={this.props.assignment.description || ""}
                    instructions={this.props.assignment.intro_page || ""}
                    notes={this.props.assignment.conclusion_page || ""}
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

App.defaultProps = {
  editableByUser: false,
};
