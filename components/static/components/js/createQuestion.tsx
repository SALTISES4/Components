import { Component, Fragment, h, render } from "preact";
export { h, render };

import { v1 as uuid } from "uuid";

import { get, submitFormData } from "./ajax";

import {
  answerChoiceValidator,
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

// MUI components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Local components
import { Answer, Collaborators, Content, Indexing } from "./_questions";
import { CancelButton, StepBar } from "./styledComponents";
import DeleteDialog from "./_reusableComponents/deleteDialog";
import { Main } from "./_reusableComponents/main";
import { Snackbar } from "./_reusableComponents/snackbar";

// Style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

// Cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Types
import {
  AnswerChoiceForm,
  CreateQuestionAppProps,
  CreateQuestionAppState,
} from "./types";
import {
  AnswerStyles,
  RationaleSelectionAlgorithms,
} from "./_localComponents/enum";
import { QuestionType } from "./_localComponents/types";

export class App extends Component<
  CreateQuestionAppProps,
  CreateQuestionAppState
> {
  constructor(props: CreateQuestionAppProps) {
    super(props);
    this.state = {
      answerChoiceForm: [
        {
          correct: false,
          formId: uuid(),
          text: "",
          sample_answers: [{ formId: uuid(), rationale: "" }],
        },
        {
          correct: false,
          formId: uuid(),
          text: "",
          sample_answers: [{ formId: uuid(), rationale: "" }],
        },
      ],
      answerChoiceFormErrors: {
        nonFieldErrors: [],
        fieldErrors: [],
      },
      dialogOpen: false,
      errors: {
        delete: [],
      },
      questionForm: {
        answer_style: AnswerStyles.Alphabetic,
        category_pk: [],
        collaborators_pk: [],
        discipline_pk: null,
        pk: undefined,
        image: new File([], ""),
        image_alt_text: "",
        rationale_selection_algorithm: "prefer_expert_and_highly_voted",
        sequential_review: false,
        text: "",
        title: "",
        type: "PI",
        video_url: "",
      },
      questionFormErrors: {
        nonFieldErrors: [], // TODO: Use nonfielderror field from API
        fieldErrors: {
          title: [],
        },
      },
      snackbarIsOpen: false,
      snackbarMessage: "",
      snackbarSeverity: undefined,
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

  delete = async () => {
    // Try to delete question
    // May return error if question is no longer editable or network error
    if (this.props.pk) {
      const url = `${this.props.urls.create}${this.props.pk}/`;
      try {
        await submitFormData(url, new FormData(), "DELETE");
        window.location.assign(this.props.urls.library);
      } catch (error: any) {
        const errors = { ...this.state.errors };
        if (error instanceof TypeError) {
          errors["delete"] = Array([error.message]);
          this.setState({ errors });
        } else {
          // Override returned error message
          errors["delete"] = [error];
          this.setState({ errors });
        }
      }
    }
  };

  save = async () => {
    // Try to save question
    console.info("Submitting save request...");
    console.info(this.state.questionForm);
    console.info(this.state.answerChoiceForm);

    // May return errors if:
    // - The question is no longer editable or object-level validation fails (i.e. non-field errors) --> Snackbar
    // - Field-level validation fails (i.e. field errors) --> <Error /> above field
    // - Network fails (i.e. non-REST errors) --> Snackbar

    // Clear any existing form errors
    this.setState({
      answerChoiceFormErrors: {
        nonFieldErrors: [],
        fieldErrors: [],
      },
      questionFormErrors: {
        nonFieldErrors: [],
        fieldErrors: {
          title: [],
        },
      },
    });

    // Build form
    // - We may be sending a file along with data so convert JSON to FormData
    this.setState({ waiting: true });
    const formdata = new FormData();
    Object.entries(this.state.questionForm).forEach((e) => {
      // Spread arrays
      if (Array.isArray(e[1])) {
        if (e[1].length == 0) {
          // FormData doesn't support idea of an empty array, but PATCH needs it
          // Workaround is to have "[]" and "null" signify "None" on the backend
          formdata.append(e[0], JSON.stringify([]));
        } else {
          e[1].forEach((v) => formdata.append(e[0], v));
        }
      } else {
        formdata.append(e[0], e[1]);
      }
    });
    this.state.answerChoiceForm.forEach((e, i) => {
      formdata.append(
        `answerchoice_set[${i}]correct`,
        JSON.stringify(e.correct),
      );
      formdata.append(`answerchoice_set[${i}]text`, e.text);
      if (e.pk) {
        formdata.append(`answerchoice_set[${i}]pk`, JSON.stringify(e.pk));
      }
      e.sample_answers.forEach((s, j) => {
        formdata.append(
          `answerchoice_set[${i}]sample_answers[${j}]rationale`,
          s.rationale,
        );
        if (s.pk) {
          formdata.append(
            `answerchoice_set[${i}]sample_answers[${j}]pk`,
            JSON.stringify(s.pk),
          );
        }
      });
      e.expert_answers?.forEach((ex, j) => {
        formdata.append(
          `answerchoice_set[${i}]expert_answers[${j}]rationale`,
          ex.rationale,
        );
        if (ex.pk) {
          formdata.append(
            `answerchoice_set[${i}]expert_answers[${j}]pk`,
            JSON.stringify(ex.pk),
          );
        }
      });
    });

    // Submit form
    try {
      if (this.props.pk) {
        // Update question
        const url = `${this.props.urls.create}${this.props.pk}/`;
        const question = (await submitFormData(
          url,
          formdata,
          "PATCH",
        )) as QuestionType;

        this.updateForms(question);
        this.setState({
          snackbarSeverity: undefined,
          snackbarIsOpen: true,
          snackbarMessage: this.props.gettext("Save successful!"),
          waiting: false,
        });
      } else {
        // Create question
        const url = this.props.urls.create;
        const question = (await submitFormData(
          url,
          formdata,
          "POST",
        )) as QuestionType;

        console.info(question);

        if (question.urls?.update) {
          const url = new URL(question.urls.update);
          console.info(url.origin, window.origin);
          if (url.origin == window.origin) {
            window.location.assign(question.urls.update);
          }
        }
      }
    } catch (error: any) {
      if (error instanceof TypeError) {
        // Network error
        this.setState({
          snackbarSeverity: "error",
          snackbarIsOpen: true,
          snackbarMessage:
            error.message.at(0)?.toLocaleUpperCase() + error.message.slice(1),
        });
      } else if (typeof error === "object") {
        // Field and non-field errors
        console.info(error);
        const _answerChoiceFormErrors = {
          ...this.state.answerChoiceFormErrors,
        };
        const _questionFormErrors = { ...this.state.questionFormErrors };
        if (Object.hasOwn(error, "title")) {
          _questionFormErrors.fieldErrors.title = error.title;
        }
        if (Object.hasOwn(error, "answerchoice_set")) {
          error.answerchoice_set.forEach(
            (
              e: {
                expert_answers?: [];
                sample_answers?: [];
              },
              i: number,
            ) => {
              _answerChoiceFormErrors.fieldErrors[i] = e;
            },
          );
        }
        this.setState(
          {
            answerChoiceFormErrors: _answerChoiceFormErrors,
            questionFormErrors: _questionFormErrors,
            snackbarSeverity: "error",
            snackbarIsOpen: true,
            snackbarMessage: this.props.gettext(
              "Please review the form for errors",
            ),
          },
          () => console.info("Form errors updated", this.state),
        );
      } else {
        // Provide default error message
        this.setState({
          snackbarSeverity: "error",
          snackbarIsOpen: true,
          snackbarMessage: this.props.gettext(
            "This question could not be created/updated.",
          ),
        });
      }
    } finally {
      this.setState({ waiting: false });
    }
  };

  sync = async (pk: number) => {
    console.info(`Fetching data for question ${pk}`);
    try {
      // Fetch question data
      const question = (await get(
        `${this.props.urls.create + this.props.pk}/`,
      )) as QuestionType;

      this.updateForms(question);
    } catch {}
  };

  updateForms = async (question: QuestionType) => {
    // Fetch image file, if exists
    let file;
    if (question.image) {
      const blob = (await get(question.image)) as unknown as Blob;
      const filename = question.image
        .split("/")
        .pop()
        ?.split("_")
        .slice(1)
        .join("_");
      file = new File([blob], filename || "", { type: blob.type });
    } else {
      file = new File([], "");
    }

    if (question.answerchoice_set.length > 0) {
      // Only overwrite default answerChoiceForm if there are existing answer choices
      this.setState({
        answerChoiceForm: question.answerchoice_set.map((answer_choice) => {
          // Invalid questions may be missing sample or expert answers
          const _answer_choice: AnswerChoiceForm = {
            correct: answer_choice.correct,
            expert_answers:
              answer_choice.expert_answers?.map((e) => ({
                formId: uuid(),
                ...e,
              })) || [],
            formId: uuid(),
            pk: answer_choice.pk,
            sample_answers: answer_choice.sample_answers.map((s) => ({
              formId: uuid(),
              ...s,
            })),
            text: answer_choice.text,
          };
          if (_answer_choice["sample_answers"].length == 0) {
            _answer_choice["sample_answers"].push({
              formId: uuid(),
              rationale: "",
            });
          }
          if (
            _answer_choice["correct"] &&
            _answer_choice["expert_answers"]?.length == 0
          ) {
            _answer_choice["expert_answers"].push({
              formId: uuid(),
              rationale: "",
            });
          }
          return _answer_choice;
        }),
      });
    }

    this.setState(
      {
        questionForm: {
          answer_style: question.answer_style || AnswerStyles.Alphabetic,
          category_pk: question.category
            ? question.category.map((c) => c.title)
            : [],
          collaborators_pk: question.collaborators
            ? question.collaborators.map((c) => c.username)
            : [],
          discipline_pk: question.discipline ? question.discipline.pk : null,
          image: file,
          image_alt_text: question.image_alt_text,
          pk: question.pk,
          rationale_selection_algorithm:
            question.rationale_selection_algorithm ||
            "prefer_expert_and_highly_voted",
          sequential_review: false,
          text: question.text,
          title: question.title,
          type: question.type,
          video_url: question.video_url,
        },
      },
      () => console.info(this.state),
    );
  };

  componentDidMount = () => {
    if (this.props.pk) {
      this.sync(this.props.pk);
    }
  };

  onClose = () => {
    // Clear delete errors and close
    const errors = { ...this.state.errors };
    errors["delete"] = [];
    this.setState({ dialogOpen: false, errors });
  };

  validateAnswerForm = () =>
    this.state.answerChoiceForm.every((ac) => answerChoiceValidator(ac)) && // Every choice is valid
    this.state.answerChoiceForm.some((ac) => ac.correct) && // At least one choice is correct
    this.state.answerChoiceForm.length >= 2; // At least two answer choices

  validateQuestionForm = () =>
    questionAnswerStyleValidator(this.state.questionForm.answer_style) &&
    (this.state.questionForm.image.size > 0
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
              {this.props.pk
                ? `${this.props.gettext("Update question")} ${this.props.pk}`
                : this.props.gettext("Create question")}
            </Typography>
            {this.state.step == 1 ? (
              <Fragment>
                <Typography variant="h3">
                  {this.props.gettext("Step 1/2")}
                </Typography>
                <Typography fontSize="body1">
                  {this.props.gettext("Question content and settings")}
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
                    formErrors={this.state.questionFormErrors}
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
                    categoryValues={this.state.questionForm.category_pk}
                    disciplineValue={this.state.questionForm.discipline_pk}
                    setCategoryValues={(category_pk) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          category_pk,
                        },
                      })
                    }
                    setDisciplineValue={(discipline_pk) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          discipline_pk,
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
                    setUserValues={(collaborators_pk) =>
                      this.setState({
                        questionForm: {
                          ...this.state.questionForm,
                          collaborators_pk,
                        },
                      })
                    }
                    url={this.props.urls.teachers}
                    userValues={this.state.questionForm.collaborators_pk}
                  />
                </Stack>
              </Fragment>
            ) : (
              <Fragment>
                <Typography variant="h2" sx={{ marginTop: "30px" }}>
                  {this.props.gettext("Step 2/2")}
                </Typography>
                <Typography fontSize="body1">
                  {this.props.gettext(
                    "Answer choices, sample answers, and expert rationales",
                  )}
                </Typography>
                <StepBar
                  sx={{
                    background:
                      "linear-gradient(to right, #1743B3 100%, #AEAEBF 100%)",
                  }}
                />
                <Answer
                  gettext={this.props.gettext}
                  EditorIcons={this.props.EditorIcons}
                  forms={this.state.answerChoiceForm}
                  formErrors={this.state.answerChoiceFormErrors}
                  addForm={(i) => {
                    console.info("Add answer choice form");
                    const _answerChoiceForm = [...this.state.answerChoiceForm];
                    _answerChoiceForm.splice(i + 1, 0, {
                      correct: false,
                      formId: uuid(),
                      text: "",
                      sample_answers: [{ formId: uuid(), rationale: "" }],
                    });
                    this.setState({
                      answerChoiceForm: [..._answerChoiceForm],
                    });
                  }}
                  deleteForm={(i) => {
                    const _answerChoiceForm = [...this.state.answerChoiceForm];
                    const _answerChoiceFormErrors = {
                      ...this.state.answerChoiceFormErrors,
                    };
                    _answerChoiceForm.splice(i, 1);
                    _answerChoiceFormErrors.fieldErrors.splice(i, 1);
                    this.setState(
                      {
                        answerChoiceForm: [..._answerChoiceForm],
                        answerChoiceFormErrors: { ..._answerChoiceFormErrors },
                      },
                      () =>
                        console.info(
                          this.state.answerChoiceForm,
                          this.state.answerChoiceFormErrors,
                        ),
                    );
                  }}
                  setForm={(i, form, fieldErrors = undefined) => {
                    const _answerChoiceForm = [...this.state.answerChoiceForm];
                    const _answerChoiceFormErrors = {
                      ...this.state.answerChoiceFormErrors,
                    };
                    _answerChoiceForm[i] = form;
                    if (fieldErrors) {
                      _answerChoiceFormErrors.fieldErrors[i] = fieldErrors;
                    }
                    this.setState(
                      {
                        answerChoiceForm: [..._answerChoiceForm],
                        answerChoiceFormErrors: { ..._answerChoiceFormErrors },
                      },
                      () =>
                        console.info(
                          this.state.answerChoiceForm,
                          this.state.answerChoiceFormErrors,
                        ),
                    );
                  }}
                />
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
              {this.props.pk ? (
                <CancelButton
                  onClick={() => this.setState({ dialogOpen: true })}
                >
                  <Typography>{this.props.gettext("Delete")}</Typography>
                </CancelButton>
              ) : null}
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

            <DeleteDialog
              errors={this.state.errors.delete}
              gettext={this.props.gettext}
              handleDelete={this.delete}
              message={this.props.gettext(
                "Are you sure you'd like to delete this question? This action cannot be undone.",
              )}
              onClose={this.onClose}
              open={this.state.dialogOpen}
            />

            <Snackbar
              message={this.state.snackbarMessage}
              onClose={() =>
                this.setState({
                  snackbarIsOpen: false,
                  snackbarMessage: "",
                })
              }
              open={this.state.snackbarIsOpen}
              severity={this.state.snackbarSeverity}
            />
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
