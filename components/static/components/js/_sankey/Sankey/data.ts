import type { SankeyNode, SankeyLink } from "d3-sankey";
import type { ExtraNodeProperties } from "./types";

export const data: {
  nodes: SankeyNode<ExtraNodeProperties, {}>[];
  links: SankeyLink<ExtraNodeProperties, {}>[];
} = {
  nodes: [
    { name: "Kohle", origin: "import", type: "primary" },
    { name: "Öl", origin: "import", type: "primary" },
    { name: "Gas", origin: "import", type: "primary" },
    { name: "Gas", origin: "import", type: "primary" },
  ],
  links: [
    { source: 0, target: 2, value: 2 },
    { source: 0, target: 3, value: 2 },
    { source: 1, target: 2, value: 2 },
    { source: 1, target: 3, value: 2 },
  ],
};
