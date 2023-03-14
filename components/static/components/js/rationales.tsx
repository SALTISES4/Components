import { Component, h, render } from "preact";
export { h, render };

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Box from "@mui/material/Box";
//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { rationalesAppProps, rationalesAppState } from "./types";
import { Container } from "@mui/system";

export class App extends Component<rationalesAppProps, rationalesAppState> {
  constructor(props: rationalesAppProps) {
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
            <Container>
              <Box width={780} sx={{ margin: "auto" }}>
                <Card sx={{ padding: "50px" }}>
                  <Typography variant="h1" sx={{ margin: "0px" }}>
                    {this.props.gettext("Rationales")}
                  </Typography>
                  <Box height={190} width="300px" />
                  <Box>
                    <Stack spacing={"40px"}>
                      <Stack spacing={"20px"}>
                        <Box>
                          <Typography
                            variant="h3"
                            sx={{ margin: "0px 0px 10px 190px" }}
                          >
                            {this.props.gettext("A. Net Positive")}
                          </Typography>
                          <Box display="flex">
                            <Box position="absolute" display="flex">
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                  backgroundColor: "secondary1.main",
                                  borderRadius: "4px 0px 0px 4px",
                                  padding: "4px 7px",
                                }}
                              >
                                <VisibilityIcon
                                  fontSize="small"
                                  sx={{ mr: "5px" }}
                                />
                                <Typography>
                                  {this.props.gettext("views")}
                                </Typography>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                  backgroundColor: "successTint.main",
                                  borderRadius: "0px 4px 4px 0px",
                                  padding: "4px 7px",
                                }}
                              >
                                <CheckCircleIcon
                                  fontSize="small"
                                  sx={{ mr: "5px" }}
                                />
                                <Typography>
                                  {this.props.gettext("selected")}
                                </Typography>
                              </Box>
                            </Box>

                            <Typography variant="h4" sx={{ ml: "190px" }}>
                              Justification Justification Justification
                              Justification Justification Justification
                              Justification Justification Justification
                              Justification Justification Justification
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                      <Stack spacing={"20px"} />
                    </Stack>
                  </Box>
                </Card>
              </Box>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
