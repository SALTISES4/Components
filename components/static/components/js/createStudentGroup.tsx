import { Component, h, render } from "preact";
export { h, render };

import { submitData } from "./ajax";

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
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";

//components
import { Main } from "./_reusableComponents/main";
import { CustomTextField } from "./_reusableComponents/customTextField";
import { StudentGroupType } from "./_localComponents/types";
import { titlecase } from "./functions";

export class App extends Component<CreateGroupAppProps, CreateGroupAppState> {
  constructor(props: CreateGroupAppProps) {
    super(props);
    this.state = {
      name: "",
      errors: [],
      errorsOpen: [],
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
      const newStudentGroup = (await submitData(
        this.props.urls.create,
        {
          name: this.state.name,
        },
        "POST",
      )) as unknown as StudentGroupType;
      if (newStudentGroup.url) {
        window.location.assign(newStudentGroup.url);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                margin: "50px 0px 0px 0px",
              }}
            >
              <Button onClick={this.submitForm} variant="contained">
                <Typography>
                  {this.props.gettext("Create Student Group")}
                </Typography>
              </Button>
            </Box>
          </Main>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
