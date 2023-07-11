import { Component, h, render } from "preact";
export { h, render };

import { submitData } from "./ajax";
import { titlecase } from "./functions";
import {
  lengthValidator,
  lettersNumbersUnderscoreOnlyValidator,
} from "./validators";

//components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

//types
import { AssignmentType } from "./_localComponents/types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CreateAssignmentAppProps, CreateAssignmentAppState } from "./types";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";
import { CustomTextField } from "./_reusableComponents/customTextField";
import { CustomEditorField } from "./_reusableComponents/customEditorField";
import { CancelButton, ValidateButton } from "./styledComponents";

export class App extends Component<
  CreateAssignmentAppProps,
  CreateAssignmentAppState
> {
  constructor(props: CreateAssignmentAppProps) {
    super(props);
    this.state = {
      description: "",
      errors: [],
      errorsOpen: [],
      identifier: "",
      specialInstructions: "",
      postAssignmentNotes: "",
      submitting: false,
      title: "",
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  submitForm = async () => {
    try {
      this.setState({ submitting: true });
      const newAssignment = (await submitData(
        this.props.urls.create,
        {
          conclusion_page: this.state.postAssignmentNotes,
          description: this.state.description,
          errors: [],
          errorsOpen: [],
          intro_page: this.state.specialInstructions,
          pk: this.state.identifier,
          title: this.state.title,
        },
        "POST",
      )) as unknown as AssignmentType;
      if (newAssignment.urls?.update) {
        window.location.assign(newAssignment.urls.update);
      }
    } catch (error: any) {
      if (typeof error === "object") {
        const e = Object.values(error) as string[];
        this.setState({ errors: e, errorsOpen: e.map(() => true) }, () =>
          console.info(this.state, error),
        );
      }
    } finally {
      this.setState({ submitting: false });
    }
  };

  setErrorsOpen = (open: boolean, i: number) => {
    const errorsOpen = [...this.state.errorsOpen];
    errorsOpen[i] = open;
    this.setState({ errorsOpen });
  };

  identifierValidator = () => {
    return (
      lettersNumbersUnderscoreOnlyValidator(this.state.identifier) &&
      lengthValidator(this.state.identifier, 2, 100)
    );
  };

  titleValidator = () => {
    return lengthValidator(this.state.title, 1, 200);
  };

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Container sx={{ maxWidth: "780px!important" }}>
            <Typography variant="h1" align="left">
              {this.props.gettext("Create Assignment")}
            </Typography>
            <Card>
              <CardHeader title={"Assignment settings"} />
              <Divider />
              <CardContent>
                <Stack spacing={"20px"}>
                  {this.state.errors.map((e, i) => (
                    <Collapse key={i} in={this.state.errorsOpen[i]}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="error"
                            onClick={() => {
                              this.setErrorsOpen(false, i);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        {titlecase(e[0])}
                      </Alert>
                    </Collapse>
                  ))}
                  <CustomTextField
                    gettext={this.props.gettext}
                    autoFocus={true}
                    id="identifier"
                    title="Identifier *"
                    defaultValue=""
                    error={!this.identifierValidator()}
                    icon={HelpOutlineIcon}
                    helperText={this.props.gettext(
                      "Between 2 and 100 characters (letters, numbers and underscore only).",
                    )}
                    minLength={2}
                    maxLength={100}
                    setValue={(identifier) => this.setState({ identifier })}
                    value={this.state.identifier}
                  />
                  <CustomTextField
                    gettext={this.props.gettext}
                    id="title"
                    title="Title *"
                    defaultValue=""
                    error={!this.titleValidator()}
                    icon={HelpOutlineIcon}
                    minLength={1}
                    maxLength={200}
                    setValue={(title) => this.setState({ title })}
                    value={this.state.title}
                  />
                  <CustomEditorField
                    title="Description"
                    icon={HelpOutlineIcon}
                    EditorIcons={this.props.EditorIcons}
                    value={this.state.description}
                    setValue={(description) =>
                      this.setState({ description }, () =>
                        console.info(this.state),
                      )
                    }
                    tooltip={this.props.gettext(
                      "Notes you would like keep for yourself (or other teachers) regarding this assignment.",
                    )}
                  />
                  <CustomEditorField
                    title="Special instructions"
                    icon={HelpOutlineIcon}
                    EditorIcons={this.props.EditorIcons}
                    value={this.state.specialInstructions}
                    setValue={(specialInstructions) =>
                      this.setState({ specialInstructions })
                    }
                    tooltip={
                      "Any special instructions you would like students to read before they start the assignment."
                    }
                  />
                  <CustomEditorField
                    title="Post assignment notes"
                    icon={HelpOutlineIcon}
                    EditorIcons={this.props.EditorIcons}
                    value={this.state.postAssignmentNotes}
                    setValue={(postAssignmentNotes) =>
                      this.setState({ postAssignmentNotes })
                    }
                    tooltip={
                      "Any notes you would like to leave for students to read that will be shown after the last question of the assignment."
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                margin: "50px 0px",
              }}
            >
              <CancelButton onClick={() => history.back()}>
                <Typography>{this.props.gettext("Cancel")}</Typography>
              </CancelButton>
              <ValidateButton
                onClick={this.submitForm}
                variant="contained"
                disabled={
                  ![this.identifierValidator(), this.titleValidator()].every(
                    (test) => test,
                  ) || this.state.submitting
                }
              >
                <Typography>
                  {this.props.gettext("Create assignment")}
                </Typography>
              </ValidateButton>
            </Box>
          </Container>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
