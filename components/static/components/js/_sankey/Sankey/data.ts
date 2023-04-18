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
    { source: 0, target: 3, value: 51 }, // Right to Wrong
    { source: 0, target: 2, value: 45 }, //Right to Right
    { source: 1, target: 2, value: 17 }, // Wrong to Right
    { source: 1, target: 3, value: 33 }, // Wrong to Wrong
  ],
};
