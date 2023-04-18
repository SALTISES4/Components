// Libraries
import { h } from "preact";

// Library Types
import type { SankeyLink } from "d3-sankey";

// Props
type VerticalBorderProps = {
  link: SankeyLink<{}, {}>;
  graphHeight: number;
};

function testRect(link: SankeyLink<{}, {}>, height: number) {
  const ySource = (link.source.y1 - link.source.y0) / 2 + link.source.y0;
  const yTarget = (link.target.y1 - link.target.y0) / 2 + link.target.y0;
  let test = false;
  if (ySource < height / 2 && yTarget < height / 2) {
    test = true;
  }
  return { test, ySource };
}

// Component
export default function VerticalBorder({
  link,
  graphHeight,
}: VerticalBorderProps) {
  const test = testRect(link, graphHeight);

  return (
    <g>
      {test.test ? (
        <g>
          <rect
            style="fill: #515159"
            x={link.source.x1}
            y={27.5 - 17}
            width={1}
            height={185}
          />
          <rect
            style="fill: #515159"
            x={link.target.x0}
            y={27.5 - 17}
            width={1}
            height={185}
          />
        </g>
      ) : null}
    </g>
  );
}
