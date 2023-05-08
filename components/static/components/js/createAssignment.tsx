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
import { SaveBar } from "../questions/saveBar";
import { CreateAssignmentAppProps, CreateAssignmentAppState } from "./types";

import { CustomEditor } from "./_reusableComponents/editor";
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
            <Container sx={{ width: "80%" }}>
              <Typography variant="h1" align="left">
                {this.props.gettext("Create Assignement")}
              </Typography>
              <CustomEditor
                boldIcon={this.props.boldIcon}
                italicIcon={this.props.italicIcon}
                underlineIcon={this.props.underIcon}
                superscriptIcon={this.props.superIcon}
                subscriptIcon={this.props.subIcon}
                linkIcon={this.props.linkIcon}
                redoIcon={this.props.redoIcon}
                undoIcon={this.props.undoIcon}
              />
            </Container>
          </Box>
          <SaveBar gettext={this.props.gettext} />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
