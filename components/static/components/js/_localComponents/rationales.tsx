import { Component, h } from "preact";

//functions
import { purifyHTML } from "../functions";
import { get } from "../ajax";

//material ui components
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

//components
import { SankeyChart } from "../_sankey/Sankey/Sankey";
import {
  ExtraLinkProperties,
  ExtraNodeProperties,
} from "../_sankey/Sankey/types";
import { data } from "../_sankey/Sankey/data";
import { Link, Node } from "../_sankey/Sankey";
import VerticalBorder from "../_sankey/Sankey/VerticalBorder";
import { SankeyLink, SankeyNode } from "d3-sankey";

//types
import {
  AnswerChoiceWithRationalesType,
  AnswerMatrixType,
  RationalesAppProps,
  RationalesAppState,
  RationalesType,
} from "./types";

export class RationalesModal extends Component<
  RationalesAppProps,
  RationalesAppState
> {
  constructor(props: RationalesAppProps) {
    super(props);
    this.state = {
      loaded:
        this.props.matrix !== undefined && this.props.rationales !== undefined,
      matrix: this.props.matrix,
      rationales: this.props.rationales,
    };
  }

  sync = async (rationalesURL: string, matrixURL: string) => {
    try {
      const rationales = (await get(
        rationalesURL,
      )) as unknown as AnswerChoiceWithRationalesType[];

      const matrix = (await get(matrixURL)) as unknown as AnswerMatrixType;

      this.setState({ rationales, loaded: true, matrix });
    } catch (error: any) {
      console.error(error);
    }
  };

  componentWillUpdate(
    nextProps: Readonly<RationalesAppProps>,
    nextState: Readonly<RationalesAppState>,
  ): void {
    // Loading on mount will lead to a ton of unnecessary db hits
    // - Only load if data not passed in props and component is open
    if (
      !nextState.loaded &&
      nextProps.open == true &&
      nextProps.urls?.matrix &&
      nextProps.urls?.rationales
    ) {
      this.sync(nextProps.urls.rationales, nextProps.urls.matrix);
    }
  }

  render() {
    const cardWidth = 780;
    const sankeyPaddingX = 135;
    const sankeyHeight = 207;
    const sankeyWidth = cardWidth - 2 * sankeyPaddingX;

    const _data = { ...data };
    let sum = 0;
    if (this.state.matrix && this.state.loaded) {
      _data.links[0].value = this.state.matrix.tricky;
      _data.links[1].value = this.state.matrix.easy;
      _data.links[2].value = this.state.matrix.peer;
      _data.links[3].value = this.state.matrix.hard;

      sum = Object.values(this.state.matrix).reduce((acc, curr) => curr + acc);
    }

    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.gettext("Rationales")}</DialogTitle>
        <DialogContent>
          {sum ? (
            <Box
              display={"flex"}
              justifyContent="center"
              sx={{ marginBottom: "35px" }}
            >
              <SankeyChart
                data={_data}
                nodeWidth={60}
                nodePadding={40}
                width={sankeyWidth}
                height={sankeyHeight}
              >
                {({ graph }) => {
                  const textPadding = [44, 54, 10, 10];
                  return (
                    <g>
                      {graph &&
                        graph.links.map(
                          (
                            link: SankeyLink<
                              ExtraNodeProperties,
                              ExtraLinkProperties
                            >,
                            i: number,
                          ) => (
                            <g key={`sankey-link-${i}`}>
                              <Link link={link} graphHeight={sankeyHeight} />
                              <VerticalBorder
                                link={link}
                                graphHeight={sankeyHeight}
                              />
                            </g>
                          ),
                        )}
                      {graph &&
                        graph.nodes.map(
                          (
                            node: SankeyNode<
                              ExtraNodeProperties,
                              ExtraLinkProperties
                            >,
                            i: number,
                          ) => (
                            <Node
                              key={`sankey-node-${i}`}
                              node={node}
                              textPadding={textPadding[i]}
                              graph={graph}
                              graphHeight={sankeyHeight}
                              graphWidth={sankeyWidth}
                            />
                          ),
                        )}
                    </g>
                  );
                }}
              </SankeyChart>
            </Box>
          ) : null}

          <Box sx={{ overflowY: "scroll" }}>
            <Stack spacing={"40px"}>
              {this.state.rationales?.map(
                (answer: AnswerChoiceWithRationalesType, i: number) => (
                  <Box key={i}>
                    <Stack spacing={"20px"}>
                      <Typography variant="h4" ml={"175px"}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${answer.label}. ${purifyHTML(
                              answer.text,
                            )}`,
                          }}
                        />
                      </Typography>
                      {answer.most_convincing.map(
                        (rationale: RationalesType, j: number) => (
                          <Stack key={j} direction={"row"}>
                            <Stack
                              direction={"row"}
                              sx={{
                                height: "fit-content",
                                minWidth: "175px",
                              }}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                  backgroundColor: "secondary1.main",
                                  borderRadius: "4px 0px 0px 4px",
                                  padding: "4px 7px",
                                  whiteSpace: "nowrap",
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
                                  {rationale.times_shown}
                                  {rationale.times_shown == 1
                                    ? this.props.gettext(" view")
                                    : this.props.gettext(" views")}
                                </Typography>
                              </Box>
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                  backgroundColor: "successTint.main",
                                  borderRadius: "0px 4px 4px 0px",
                                  padding: "4px 7px",
                                  whiteSpace: "nowrap",
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
                                  {rationale.times_chosen}
                                  {this.props.gettext(" selected")}
                                </Typography>
                              </Box>
                            </Stack>
                            <Typography key={i} variant="body2">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: purifyHTML(rationale.rationale),
                                }}
                              />
                            </Typography>
                          </Stack>
                        ),
                      )}
                    </Stack>
                  </Box>
                ),
              )}
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}
