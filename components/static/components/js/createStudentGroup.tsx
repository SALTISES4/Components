import { Component, h, render } from "preact";
export { h, render };

//types
import { CreateGroupAppProps, CreateGroupAppState } from "./types";

//style
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";

//material ui components
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

//components
import { Main } from "./_reusableComponents/main";
import { CustomTextField } from "./_reusableComponents/customTextField";

export class App extends Component<CreateGroupAppProps, CreateGroupAppState> {
  constructor(props: CreateGroupAppProps) {
    super(props);
    this.state = {
      name: "",
      errors: [],
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

  render() {
    return (
      <ThemeProvider theme={formTheme}>
        <CacheProvider value={this.cache}>
          <Main>
            <Typography variant="h1" align="left">
              {this.props.gettext("Create student group")}
            </Typography>
            <Card>
              <CardHeader title={"Group Settings"} />
              <Divider />
              <CardContent>
                <Stack spacing={"20px"}>
                  <CustomTextField
                    gettext={this.props.gettext}
                    autoFocus={true}
                    id="name"
                    title="Name *"
                    defaultValue=""
                    icon={HelpOutlineIcon}
                    helperText={this.props.gettext(
                      "The group name is used as the keyword for access. It must be unique but does not need to be informative.",
                    )}
                    minLength={2}
                    maxLength={100}
                    setValue={(name) => this.setState({ name })}
                    value={this.state.name}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
