import { SankeyExtraProperties, SankeyNode } from "d3-sankey";

export type ExtraNodeProperties = {
  name: string;
};

export type ExtraLinkProperties = {
  color: string;
  opacity: number;
  source:
    | number
    | string
    | SankeyNode<ExtraNodeProperties, SankeyExtraProperties>;
  target:
    | number
    | string
    | SankeyNode<ExtraNodeProperties, SankeyExtraProperties>;
};
