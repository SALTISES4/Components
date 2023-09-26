import { Component, Fragment, h, render } from "preact";
export { h, render };

import { submitFormData } from "./ajax";

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
import LoadingButton from "@mui/lab/LoadingButton";
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
      answerChoiceForm: [
        {
          answer_choice: { correct: false, text: "" },
          sample_answer: { expert: false, rationale: "" },
          expert_rationale: { expert: true, rationale: "" },
        },
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
      waiting: false,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  back = () => {
    this.setState({ step: 1 }, () => window.scrollTo({ top: 0 }));
  };

  next = () => {
    this.setState({ step: 2 }, () => window.scrollTo({ top: 0 }));
  };

  save = async () => {
    console.info(this.state.questionForm);
    this.setState({ waiting: true });
    try {
      // We may be sending a file along with data so convert JSON to FormData
      const formdata = new FormData();
      Object.entries(this.state.questionForm).map((e) => {
        // Don't send fields that are undefined, null, empty [], etc.
        if (e[1]) {
          formdata.append(e[0], e[1]);
        }
      });
      // Object.entries(this.state.answerChoiceForm).map((e) =>
      //   formdata.append(e),
      // );
      const url = this.props.urls.create;
      const question = await submitFormData(url, formdata, "POST");
      this.setState({ waiting: false });
      console.info(question);
    } catch {
      this.setState({ waiting: false });
    }
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
                <Stack>
                  <Answer
                    gettext={this.props.gettext}
                    EditorIcons={this.props.EditorIcons}
                    forms={this.state.answerChoiceForm}
                    addForm={(i) => {
                      console.info("Add answer choice form");
                      const _answerChoiceForm = [
                        ...this.state.answerChoiceForm,
                      ];
                      _answerChoiceForm.splice(i + 1, 0, {
                        answer_choice: { correct: false, text: "" },
                        sample_answer: { expert: false, rationale: "" },
                        expert_rationale: { expert: true, rationale: "" },
                      });
                      this.setState({
                        answerChoiceForm: [..._answerChoiceForm],
                      });
                    }}
                    deleteForm={(i) => {
                      const _answerChoiceForm = [
                        ...this.state.answerChoiceForm,
                      ];
                      _answerChoiceForm.splice(i, 1);
                      this.setState(
                        {
                          answerChoiceForm: [..._answerChoiceForm],
                        },
                        () => console.info(this.state.answerChoiceForm),
                      );
                    }}
                    setForm={(i, form) => {
                      const _answerChoiceForm = [
                        ...this.state.answerChoiceForm,
                      ];
                      _answerChoiceForm[i] = form;
                      this.setState(
                        {
                          answerChoiceForm: [..._answerChoiceForm],
                        },
                        () => console.info(this.state.answerChoiceForm),
                      );
                    }}
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
                <Fragment>
                  <Button
                    disabled={!this.validateQuestionForm()}
                    onClick={this.next}
                    variant="contained"
                  >
                    <Typography>{this.props.gettext("Continue")}</Typography>
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button onClick={this.back} variant="contained">
                    <Typography>{this.props.gettext("Back")}</Typography>
                  </Button>
                  <LoadingButton
                    disabled={!this.validateAnswerForm()}
                    loadingPosition="end"
                    onClick={this.save}
                    loading={this.state.waiting}
                    variant="contained"
                  >
                    <Typography tag={"span"}>
                      {this.props.gettext("Save")}
                    </Typography>
                  </LoadingButton>
                </Fragment>
              )}
            </Box>
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
