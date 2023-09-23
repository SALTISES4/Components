import { Component, Fragment, h, render } from "preact";
export { h, render };

import {
  booleanValidator,
  questionAnswerStyleValidator,
  questionImageValidator,
  questionImageAltTextValidator,
  questionRationaleSelectionAlgorithmValidator,
  questionTextValidator,
  questionTitleValidator,
  questionTypeValidator,
  questionVideoURLValidator,
} from "./validators";

//material ui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CancelButton, StepBar } from "./styledComponents";
import { Main } from "./_reusableComponents/main";
import { Answer, Collaborators, Content, Indexing } from "./_questions";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

//types
import { CreateQuestionAppProps, CreateQuestionAppState } from "./types";
import {
  AnswerStyles,
  RationaleSelectionAlgorithms,
} from "./_localComponents/enum";

export class App extends Component<
  CreateQuestionAppProps,
  CreateQuestionAppState
> {
  constructor(props: CreateQuestionAppProps) {
    super(props);
    this.state = {
      answerForm: [
        { answer_choice: null, answer: null },
        { answer_choice: null, answer: null },
      ],
      questionForm: {
        answer_style: AnswerStyles.Alphabetic,
        categories: [],
        collaborators: [],
        discipline: null,
        image: undefined,
        image_alt_text: "",
        rationale_selection_algorithm: "prefer_expert_and_highly_voted",
        sequential_review: false,
        text: "",
        title: "",
        type: "PI",
        video_url: "",
      },
      step: 1,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  back = () => {
    this.setState({ step: 1 });
  };

  next = () => {
    this.setState({ step: 2 });
  };

  save = () => {
    console.info(this.state.questionForm);
  };

  validateAnswerForm = () => false;

  validateQuestionForm = () =>
    questionAnswerStyleValidator(this.state.questionForm.answer_style) &&
    (this.state.questionForm.image
      ? questionImageValidator(this.state.questionForm.image) &&
        questionImageAltTextValidator(this.state.questionForm.image_alt_text)
      : true) &&
    questionRationaleSelectionAlgorithmValidator(
      this.state.questionForm.rationale_selection_algorithm,
    ) &&
    booleanValidator(this.state.questionForm.sequential_review) &&
    questionTitleValidator(this.state.questionForm.title) &&
    questionTextValidator(this.state.questionForm.text) &&
    questionTypeValidator(this.state.questionForm.type) &&
    questionVideoURLValidator(this.state.questionForm.video_url);

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Main>
            <Typography variant="h1" align="left">
              {this.props.gettext("Create question")}
            </Typography>
            {this.state.step == 1 ? (
              <Fragment>
                <Typography variant="h3">
                  {this.props.gettext("Step 1/2")}
                </Typography>
                <Typography fontSize="body1">
                  {this.props.gettext("Question parameters")}
                </Typography>
                <StepBar
                  sx={{
                    background:
                      "linear-gradient(to right, #1743B3 50%, #AEAEBF 50%)",
                  }}
                />
                <Stack spacing={"30px"}>
                  <Content
                    gettext={this.props.gettext}
                    EditorIcons={this.props.EditorIcons}
                    form={this.state.questionForm}
                    setAnswerStyle={(answer_style) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          answer_style,
                        },
                      })
                    }
                    setImage={(image, cb) => {
                      this.setState(
                        {
                          questionForm: { ...this.state.questionForm, image },
                        },
                        cb,
                      );
                    }}
                    setImageAltText={(image_alt_text) => {
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          image_alt_text,
                        },
                      });
                    }}
                    setRationaleSectionAlgorithm={(
                      rationale_selection_algorithm: keyof typeof RationaleSelectionAlgorithms,
                    ) => {
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          rationale_selection_algorithm,
                        },
                      });
                    }}
                    // setSequentialReview={(sequential_review) =>
                    //   this.setState({
                    //     questionForm: { ...this.state.questionForm, sequential_review },
                    //   })
                    // }
                    setText={(text) =>
                      this.setState({
                        questionForm: { ...this.state.questionForm, text },
                      })
                    }
                    setTitle={(title) =>
                      this.setState({
                        questionForm: { ...this.state.questionForm, title },
                      })
                    }
                    setType={(type) =>
                      this.setState({
                        questionForm: { ...this.state.questionForm, type },
                      })
                    }
                    setVideo={(video_url) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          video_url,
                        },
                      })
                    }
                  />

                  <Indexing
                    gettext={this.props.gettext}
                    categoryValues={this.state.questionForm.categories}
                    disciplineValue={this.state.questionForm.discipline}
                    setCategoryValues={(categories) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          categories,
                        },
                      })
                    }
                    setDisciplineValue={(discipline) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          discipline,
                        },
                      })
                    }
                    urls={{
                      categories: this.props.urls.categories,
                      disciplines: this.props.urls.disciplines,
                    }}
                  />

                  <Collaborators
                    gettext={this.props.gettext}
                    setUserValues={(collaborators) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          collaborators,
                        },
                      })
                    }
                    url={this.props.urls.teachers}
                    userValues={this.state.questionForm.collaborators}
                  />
                </Stack>
              </Fragment>
            ) : (
              <Fragment>
                <Typography variant="h2" sx={{ marginTop: "30px" }}>
                  {this.props.gettext("Step 2/2")}
                </Typography>
                <Typography fontSize="body1">
                  {this.props.gettext("Answer parameters")}
                </Typography>
                <StepBar
                  sx={{
                    background:
                      "linear-gradient(to right, #1743B3 100%, #AEAEBF 100%)",
                  }}
                />
                <Stack spacing={"30px"}>
                  <Answer
                    gettext={this.props.gettext}
                    EditorIcons={this.props.EditorIcons}
                    forms={this.state.answerForm}
                  />
                </Stack>
              </Fragment>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                margin: "50px 0px 0px 0px",
              }}
            >
              <CancelButton onClick={() => history.back()}>
                <Typography>{this.props.gettext("Cancel")}</Typography>
              </CancelButton>
              {this.state.step == 1 ? (
                <Button
                  disabled={!this.validateQuestionForm()}
                  onClick={this.next}
                  variant="contained"
                >
                  <Typography>
                    {this.props.gettext("Save and continue")}
                  </Typography>
                </Button>
              ) : (
                <Fragment>
                  <Button onClick={this.back} variant="contained">
                    <Typography>{this.props.gettext("Back")}</Typography>
                  </Button>
                  <Button
                    disabled={!this.validateAnswerForm()}
                    onClick={this.save}
                    variant="contained"
                  >
                    <Typography>{this.props.gettext("Save")}</Typography>
                  </Button>
                </Fragment>
              )}
            </Box>
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
