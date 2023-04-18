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
  SankeyExtraProperties,
} from "d3-sankey";

// Props
interface SankeyProps<SankeyExtraProperties, SankeyExtraProperties> {
  data: {
    nodes: SankeyNode<SankeyExtraProperties, SankeyExtraProperties>[];
    links: SankeyLink<SankeyExtraProperties, SankeyExtraProperties>[];
  };
  width: number;
  height: number;
  nodeWidth: number;
  nodePadding: number;
  children?: (sankey: {
    graph: SankeyGraph<SankeyExtraProperties, SankeyExtraProperties>;
  }) => JSX.Element;
}

// Component
export function SankeyChart<N, L>({
  data,
  width,
  height,
  nodeWidth,
  nodePadding,
  children,
}: SankeyProps<N, L>) {
  // Handling Size
  const sankeyWidth = width;
  const sankeyHeight = height;

  // State & Data
  const [graph, setGraph] = useState<
    SankeyGraph<SankeyExtraProperties, SankeyExtraProperties>
  >({
    nodes: [],
    links: [],
  });
  useEffect(() => {
    setGraph(
      d3sankey<SankeyExtraProperties, SankeyExtraProperties>()
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
