import { Component, h, render } from "preact";
export { h, render };

import { submitData } from "./ajax";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
      identifier: "",
      specialInstructions: "",
      postAssignmentNotes: "",
      title: "",
    };
  }

  componentDidMount(): void {
    // Fetch data from db to overwrite placeholders
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  submitForm = async () => {
    try {
      const message = await submitData(
        this.props.urls.create,
        {
          description: this.state.description,
          pk: this.state.identifier,
          specialInstructions: this.state.specialInstructions,
          postAssignmentNotes: this.state.postAssignmentNotes,
          title: this.state.title,
        },
        "POST",
      );
      console.info(message);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Box>
            <Container sx={{ width: "65%" }}>
              <Typography variant="h1" align="left" mt={0}>
                {this.props.gettext("Create Assignment")}
              </Typography>
              <Card>
                <CardHeader title={"Assignment settings"} />
                <Divider />
                <CardContent>
                  <Stack spacing={"20px"}>
                    <CustomTextField
                      gettext={this.props.gettext}
                      id="identifier"
                      title="Identifier *"
                      defaultValue=""
                      error={
                        this.state.identifier.length < 2 ||
                        this.state.identifier.length > 100
                      }
                      icon={HelpOutlineIcon}
                      helperText={this.props.gettext(
                        "Between 2 and 100 characters; only letters, numbers and the underscore permitted.",
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
                      error={
                        this.state.title.length < 1 ||
                        this.state.title.length > 200
                      }
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
                    />
                    <CustomEditorField
                      title="Special instructions"
                      icon={HelpOutlineIcon}
                      EditorIcons={this.props.EditorIcons}
                      value={this.state.specialInstructions}
                      setValue={(specialInstructions) =>
                        this.setState({ specialInstructions })
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
                <ValidateButton onClick={this.submitForm} variant="contained">
                  <Typography>
                    {this.props.gettext("Create assignment")}
                  </Typography>
                </ValidateButton>
              </Box>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
