import type { SankeyNode, SankeyLink } from "d3-sankey";
import type { ExtraNodeProperties } from "./types";

export const data: {
  nodes: SankeyNode<ExtraNodeProperties, {}>[];
  links: SankeyLink<ExtraNodeProperties, {}>[];
} = {
  nodes: [
    { name: "Right", origin: "import", type: "primary" },
    { name: "Wrong", origin: "import", type: "primary" },
    { name: "Right", origin: "import", type: "primary" },
    { name: "Wrong", origin: "import", type: "primary" },
  ],
  links: [
    { source: 0, target: 2, value: 76 },
    { source: 0, target: 3, value: 15 },
    { source: 1, target: 2, value: 12 },
    { source: 1, target: 3, value: 3 },
  ],
};
