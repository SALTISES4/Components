import { Component, h, render } from "preact";
export { h, render };

//functions
// import { get, submitData } from "./ajax";

//material ui components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { Main } from "./_reusableComponents/main";

//types
import { UpdateGroupAppProps, UpdateGroupAppState } from "./types";
// import { StudentGroupType } from "./_localComponents/types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise, { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<UpdateGroupAppProps, UpdateGroupAppState> {
  constructor(props: UpdateGroupAppProps) {
    super(props);
    this.state = {
      editing: false,
      snackbarIsOpen: false,
      snackbarMessage: "",
      //   name: this.props.group.name,
      //   title: this.props.group.title,
      //   semester: this.props.group.semester,
      //   year: this.props.group.year,
    };
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  error = (e: any): void => {
    console.error(e);
  };

  sync = async (): Promise<void> => {};

  componentDidMount(): void {
    this.sync();
  }

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Box>
            <Paper elevation={0}>
              <Main>
                <ThemeProvider theme={saltise} />
                <Box>
                  <Typography variant="h2">{this.state.name}</Typography>
                </Box>
              </Main>
            </Paper>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
