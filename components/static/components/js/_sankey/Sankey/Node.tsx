// Libraries
import { h } from "preact";

// Library Types
import type {
  SankeyNode,
  sankey,
  SankeyGraph,
  SankeyExtraProperties,
} from "d3-sankey";
import { ExtraLinkProperties, ExtraNodeProperties } from "./types";

// Props
type NodeProps = {
  node: SankeyNode<ExtraNodeProperties, ExtraLinkProperties>;
  graphWidth: number;
  graphHeight: number;
  graph?: SankeyGraph<SankeyExtraProperties, SankeyExtraProperties>;
  textPadding: number;
  sankey?: typeof sankey;
};

// Component
export default function Node({
  node: { x0, x1, y0, y1, name },
  graphWidth,
  graphHeight,
  textPadding,
}: NodeProps) {
  const textX = x0 > graphWidth / 2 ? x0 + textPadding : x1 - textPadding;
  const y = (y1 - y0) / 2 + y0;
  const textY = y < graphHeight / 2 ? 27.5 + 20 : 27.7 + 145 - 10;
  const nodeName = name;
  return (
    <g style={{ pointerEvents: "all" }} onClick={() => console.log()}>
      <text
        x={textX}
        y={textY}
        fill="#515159"
        style={{
          userSelect: "none",
          overflowX: "hidden",
          fontSize: "14px",
          fontFamily: "Open sans, sans-serif",
        }}
      >
        {nodeName}
      </text>
    </g>
  );
}
