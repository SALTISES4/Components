// Libraries
import { ComponentChildren, h } from "preact";
import { useEffect, useState } from "preact/hooks";
//import * as d3 from "d3";
// Library Types

import {
  sankey as d3sankey,
  SankeyGraph,
  SankeyNode,
  SankeyLink,
} from "d3-sankey";

// Props
interface SankeyProps<N, L> {
  data: {
    nodes: SankeyNode<N, L>[];
    links: SankeyLink<N, L>[];
  };
  width?: number;
  height?: number;
  nodeWidth: number;
  nodePadding: number;
  children?: (sankey: { graph: SankeyGraph<N, L> }) => JSX.Element;
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
  const { width: windowWidth, height: windowHeight } = {
    width: 120,
    height: 150,
  };

  const sankeyWidth = width ? width : windowWidth - 100;
  const sankeyHeight = height ? height : windowHeight - 100;

  // State & Data
  const [graph, setGraph] = useState<SankeyGraph<N, L>>({
    nodes: [],
    links: [],
  });
  useEffect(() => {
    setGraph(
      d3sankey()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .extent([
          [0, 0],
          [sankeyWidth, sankeyHeight - 50],
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
