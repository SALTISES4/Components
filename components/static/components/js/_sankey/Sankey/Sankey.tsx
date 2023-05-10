// Libraries
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
//import * as d3 from "d3";
// Library Types

import {
  sankey as d3sankey,
  SankeyGraph,
  SankeyNode,
  SankeyLink,
} from "d3-sankey";
import { ExtraLinkProperties, ExtraNodeProperties } from "./types";

// Props
interface SankeyProps {
  data: {
    nodes: SankeyNode<ExtraNodeProperties, ExtraLinkProperties>[];
    links: SankeyLink<ExtraNodeProperties, ExtraLinkProperties>[];
  };
  width: number;
  height: number;
  nodeWidth: number;
  nodePadding: number;
  children?: (sankey: {
    graph: SankeyGraph<ExtraNodeProperties, ExtraLinkProperties>;
  }) => JSX.Element;
}

// Component
export function SankeyChart({
  data,
  width,
  height,
  nodeWidth,
  nodePadding,
  children,
}: SankeyProps) {
  // Handling Size
  const sankeyWidth = width;
  const sankeyHeight = height;

  // State & Data
  const [graph, setGraph] = useState<
    SankeyGraph<ExtraNodeProperties, ExtraLinkProperties>
  >({
    nodes: [],
    links: [],
  });
  useEffect(() => {
    setGraph(
      d3sankey<ExtraNodeProperties, ExtraLinkProperties>()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .extent([
          [0, 0],
          [sankeyWidth, sankeyHeight],
        ])(data),
    );
  }, [nodePadding, nodeWidth, sankeyWidth, sankeyHeight, data]);

  if (children)
    return (
      <svg width={sankeyWidth} height={sankeyHeight}>
        {children({ graph })}
      </svg>
    );

  return <g />;
}
