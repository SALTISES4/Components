// Libraries
import { h } from "preact";
import { linkHorizontal } from "d3-shape";

// Library Types
import type { SankeyLink } from "d3-sankey";
import { useState } from "preact/hooks";

// Props
type LinkProps = {
  link: SankeyLink<{}, {}>;
  color: string;
  maxWidth?: number;
};

function horizontalSourceO(d: any) {
  const y = (d.source.y1 - d.source.y0) / 2 + d.source.y0;
  return [d.source.x1, y];
}

function horizontalTargetO(d: any) {
  const y = (d.target.y1 - d.target.y0) / 2 + d.target.y0;
  return [d.target.x0, y];
}

function horizontalSource(d: any) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d: any) {
  return [d.target.x0, d.y1];
}

function sankeyLinkHorizontal() {
  return linkHorizontal().source(horizontalSource).target(horizontalTarget);
}

function sankeyLinkHorizontalO() {
  return linkHorizontal().source(horizontalSourceO).target(horizontalTargetO);
}

// Component
export default function Link({ link, color, maxWidth }: LinkProps) {
  const linkWidth = maxWidth
    ? (link.value / link.source.value) * maxWidth
    : link.width;

  const path: string = maxWidth
    ? sankeyLinkHorizontalO()(link)
    : sankeyLinkHorizontal()(link);

  const [opacity, setOpacity] = useState(0.3);

  return (
    <path
      d={path}
      style={{
        fill: "none",
        strokeOpacity: opacity,
        stroke: color,
        strokeWidth: linkWidth && !isNaN(linkWidth) ? linkWidth : 0,
      }}
      onMouseEnter={() => setOpacity(0.8)}
      onMouseLeave={() => setOpacity(0.3)}
    >
      <title>
        {link.source.name} -&gt; {link.target.name}: {link.value}
      </title>
    </path>
  );
}
