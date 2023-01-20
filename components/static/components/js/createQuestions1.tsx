import { Component, h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StepBar } from "./styledComponents";
import { Content } from "../questions/content";
import { Settings } from "../questions/settings";
import { Indexing } from "../questions/indexing";
import { Collaborators } from "../questions/collaborators";
import { SaveBar } from "../questions/saveBar";
import { CreateQuestions1AppProps, CreateQuestions1AppState } from "./types";

export class App extends Component<
  CreateQuestions1AppProps,
  CreateQuestions1AppState
> {
  constructor(props: CreateQuestions1AppProps) {
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
                {this.props.gettext("Create Question")}
              </Typography>
              <Typography variant="h2" sx={{ marginTop: "30px" }}>
                {this.props.gettext("Step 1/2")}
              </Typography>
              <Typography fontSize="16px" lineHeight="22px">
                {this.props.gettext("Question parameters")}
              </Typography>
              <StepBar
                sx={{
                  background:
                    "linear-gradient(to right, #1743B3 50%, #AEAEBF 50%)",
                }}
              />
              <Stack spacing={"30px"}>
                <Content gettext={this.props.gettext} />
                <Settings gettext={this.props.gettext} />
                <Indexing gettext={this.props.gettext} />
                <Collaborators gettext={this.props.gettext} />
              </Stack>
            </Container>
          </Box>
          <SaveBar gettext={this.props.gettext} />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
