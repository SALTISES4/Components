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
import {
  AnswerWithRationalesType,
  RationalesAppProps,
  RationalesAppState,
  RationalesType,
} from "./types";
import { Container } from "@mui/system";

import { answersWithRationales } from "./data";
import { SankeyChart } from "./_sankey/Sankey/Sankey";
import { ExtraNodeProperties } from "./_sankey/Sankey/types";
import { data } from "./_sankey/Sankey/data";
import { Link, Node } from "./_sankey/Sankey";

export class App extends Component<RationalesAppProps, RationalesAppState> {
  constructor(props: RationalesAppProps) {
    super(props);
    this.state = {
      answersWithRationales,
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
                  <Box display={"flex"} justifyContent="center">
                    <SankeyChart<ExtraNodeProperties, {}>
                      data={data}
                      nodeWidth={100}
                      nodePadding={40}
                      width={580}
                      height={300}
                    >
                      {({ graph }) => {
                        const color = [
                          "#6691FF",
                          "#0D2666",
                          "#1743B3",
                          "#AEAEBF",
                        ];
                        const opacity = [0.5, 1, 0.5, 0.5];
                        const textPadding = [44, 54, 10, 10];

                        return (
                          <g>
                            {graph &&
                              graph.links.map((link, i) => (
                                <Link
                                  key={`sankey-link-${i}`}
                                  link={link}
                                  opacityInit={opacity[i]}
                                  color={color[i]}
                                  graphHeight={300}
                                />
                              ))}
                            {graph &&
                              graph.nodes.map((node, i) => (
                                <Node<ExtraNodeProperties, {}>
                                  key={`sankey-node-${i}`}
                                  link={node}
                                  name={node.name}
                                  textPadding={textPadding[i]}
                                  graph={graph}
                                  graphHeight={300}
                                  graphWidth={780}
                                />
                              ))}
                          </g>
                        );
                      }}
                    </SankeyChart>
                  </Box>
                  <Stack spacing={"40px"}>
                    {this.state.answersWithRationales.map(
                      (answer: AnswerWithRationalesType, i: number) => (
                        <Box key={i}>
                          <Typography
                            variant="h3"
                            sx={{ margin: "0px 0px 10px 190px" }}
                          >
                            {answer.description}
                          </Typography>
                          <Stack spacing={"20px"}>
                            {answer.rationales.map(
                              (rationale: RationalesType, j: number) => (
                                <Box key={j}>
                                  <Box display="flex">
                                    <Box position="absolute" display="flex">
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          backgroundColor: "secondary1.main",
                                          borderRadius: "4px 0px 0px 4px",
                                          padding: "4px 7px",
                                          width: "64",
                                          boxSizing: "border-box",
                                        }}
                                      >
                                        <VisibilityIcon
                                          sx={{
                                            mr: "5px",
                                            width: "11px",
                                            height: "11px",
                                          }}
                                        />
                                        <Typography fontSize="10px">
                                          {rationale.viewCount}
                                          {this.props.gettext(" views")}
                                        </Typography>
                                      </Box>
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                          width: "83px",
                                          boxSizing: "border-box",
                                          backgroundColor: "successTint.main",
                                          borderRadius: "0px 4px 4px 0px",
                                          padding: "4px 7px",
                                        }}
                                      >
                                        <CheckCircleIcon
                                          sx={{
                                            mr: "5px",
                                            width: "11px",
                                            height: "11px",
                                          }}
                                        />
                                        <Typography fontSize="10px">
                                          {rationale.selectedCount}
                                          {this.props.gettext(" selected")}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Typography
                                      key={i}
                                      variant="h4"
                                      sx={{ ml: "190px" }}
                                    >
                                      {rationale.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              ),
                            )}
                          </Stack>
                        </Box>
                      ),
                    )}
                  </Stack>
                </Card>
              </Box>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
