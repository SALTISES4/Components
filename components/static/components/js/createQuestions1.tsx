import { Component, h, render } from "preact";
export { h, render };

import {
  questionAnswerStyleValidator,
  questionImageValidator,
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
import { Collaborators } from "./_questions/collaborators";
import { Content } from "./_questions/content";
import { Indexing } from "./_questions/indexing";
import { Settings } from "./_questions/settings";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

//types
import { CreateQuestions1AppProps, CreateQuestions1AppState } from "./types";
import { AnswerStyles, QuestionTypes } from "./_localComponents/enum";

export class App extends Component<
  CreateQuestions1AppProps,
  CreateQuestions1AppState
> {
  constructor(props: CreateQuestions1AppProps) {
    super(props);
    this.state = {
      form: {
        answer_style: AnswerStyles.alphabetic,
        image: undefined,
        text: "",
        title: "",
        type: QuestionTypes.PI,
        video_url: "",
      },
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  saveAndContinue = () => {
    console.info(this.state);
  };

  parseVideo = (url: string) => {
    // We want to help ensure well-formed URLs.  Convert string to URL and back to string.
    try {
      const _url = new URL(url.trim());
      if (_url.href.endsWith("/") && !url.endsWith("/")) {
        return _url.href.slice(0, -1);
      }
      return _url.href;
    } catch {
      return url.trim();
    }
  };

  validateForm = () =>
    questionAnswerStyleValidator(this.state.form.answer_style) &&
    questionImageValidator(this.state.form.image) &&
    questionTitleValidator(this.state.form.title) &&
    questionTextValidator(this.state.form.text) &&
    questionTypeValidator(this.state.form.type) &&
    questionVideoURLValidator(this.state.form.video_url);

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Main>
            <Typography variant="h1" align="left">
              {this.props.gettext("Create question")}
            </Typography>
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
                form={this.state.form}
                setAnswerStyle={(answer_style) =>
                  this.setState({ form: { ...this.state.form, answer_style } })
                }
                setImage={(image) => {
                  console.info(image);
                  this.setState({ form: { ...this.state.form, image } });
                }}
                setText={(text) =>
                  this.setState({ form: { ...this.state.form, text } })
                }
                setTitle={(title) =>
                  this.setState({ form: { ...this.state.form, title } })
                }
                setType={(type) =>
                  this.setState({ form: { ...this.state.form, type } })
                }
                setVideo={(video_url) =>
                  this.setState({
                    form: {
                      ...this.state.form,
                      video_url: this.parseVideo(video_url),
                    },
                  })
                }
              />
              <Settings gettext={this.props.gettext} />
              <Indexing gettext={this.props.gettext} />
              <Collaborators gettext={this.props.gettext} />
            </Stack>
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
              <Button
                disabled={!this.validateForm()}
                onClick={this.saveAndContinue}
                variant="contained"
              >
                <Typography>
                  {this.props.gettext("Save and continue")}
                </Typography>
              </Button>
            </Box>
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
