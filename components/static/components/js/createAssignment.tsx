import { Component, h, render } from "preact";
export { h, render };

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
    this.state = {};
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

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Box width="calc(100% - 200px)" marginLeft="200px">
            <Container sx={{ width: "65%" }}>
              <Typography variant="h1" align="left">
                {this.props.gettext("Create Assignement")}
              </Typography>
              <Card>
                <CardHeader title={"Assignment settings"} />
                <Divider />
                <CardContent>
                  <Stack spacing={"20px"}>
                    <CustomTextField
                      id="identifier"
                      title="Identifier *"
                      defaultValue=""
                      icon={HelpOutlineIcon}
                      helperText={this.props.gettext(
                        "Only use letters, numbers and the underscore for the identifier. Max length is 100 characters.",
                      )}
                    />
                    <CustomTextField
                      id="title"
                      title="Title *"
                      defaultValue=""
                      icon={HelpOutlineIcon}
                      helperText={this.props.gettext(
                        "Max length is 200 characters.",
                      )}
                    />
                    <CustomEditorField
                      id="Description"
                      title="Description"
                      icon={HelpOutlineIcon}
                      EditorIcons={this.props.EditorIcons}
                    />
                    <CustomEditorField
                      id="specialInstructions"
                      title="Special instructions"
                      icon={HelpOutlineIcon}
                      EditorIcons={this.props.EditorIcons}
                    />
                    <CustomEditorField
                      id="postAssignmentNotes"
                      title="Post assignment notes"
                      icon={HelpOutlineIcon}
                      EditorIcons={this.props.EditorIcons}
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
                <CancelButton>
                  <Typography>{this.props.gettext("Cancel")}</Typography>
                </CancelButton>
                <ValidateButton variant="contained">
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
