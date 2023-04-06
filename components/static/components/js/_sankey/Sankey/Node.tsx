// Libraries
import { h } from "preact";

// Library Types
import type { SankeyNode, sankey, SankeyGraph } from "d3-sankey";

// Props
type NodeProps<N, L> = {
  link: SankeyNode<{}, {}>;
  name: string;
  graphWidth: number;
  graphHeight: number;
  graph?: SankeyGraph<N, L>;
  textPadding: number;
  sankey?: typeof sankey;
};

// Component
export default function Node<N, L>({
  link: { x0, x1, y0, y1 },
  name,
  graphWidth,
  graphHeight,
  textPadding,
}: NodeProps<N, L>) {
  const textX = x0 > graphWidth / 2 ? x0 + textPadding : x1 - textPadding;
  const y = (y1 - y0) / 2 + y0;
  const textY = y < graphHeight / 2 ? y + 10 : y - 7;

  return (
    <g style={{ pointerEvents: "all" }} onClick={() => console.log()}>
      <text
        x={textX}
        y={textY}
        fill="#515159"
        style={{ userSelect: "none", overflowX: "hidden", fontSize: "14px" }}
      >
        {name}
      </text>
    </g>
  );
}
