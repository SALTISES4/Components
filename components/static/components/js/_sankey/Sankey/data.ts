import type { SankeyNode, SankeyLink } from "d3-sankey";
import type { ExtraLinkProperties, ExtraNodeProperties } from "./types";
import { formTheme } from "../../theme";

export const data: {
  nodes: SankeyNode<ExtraNodeProperties, ExtraLinkProperties>[];
  links: SankeyLink<ExtraNodeProperties, ExtraLinkProperties>[];
} = {
  nodes: [
    { name: "Right" },
    { name: "Wrong" },
    { name: "Right" },
    { name: "Wrong" },
  ],
  links: [
    {
      source: 0,
      target: 3,
      value: 51,
      color: formTheme.palette.primary4.main,
      opacity: 1,
    }, // Right to Wrong
    {
      source: 0,
      target: 2,
      value: 45,
      color: formTheme.palette.primary2.main,
      opacity: 0.5,
    }, //Right to Right
    {
      source: 1,
      target: 2,
      value: 17,
      color: formTheme.palette.primary.main,
      opacity: 0.5,
    }, // Wrong to Right
    {
      source: 1,
      target: 3,
      value: 33,
      color: formTheme.palette.secondary2.main,
      opacity: 0.5,
    }, // Wrong to Wrong
  ],
};
