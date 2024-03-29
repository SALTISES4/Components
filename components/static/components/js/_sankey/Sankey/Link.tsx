// Libraries
import { h } from "preact";
import { linkHorizontal } from "d3-shape";

// Library Types
import type { SankeyLink } from "d3-sankey";
import { useState } from "preact/hooks";
import { ExtraLinkProperties, ExtraNodeProperties } from "./types";

// Props
type LinkProps = {
  link: SankeyLink<ExtraNodeProperties, ExtraLinkProperties>;
  graphHeight: number;
};

function horizontalSourceO(
  link: SankeyLink<ExtraNodeProperties, ExtraLinkProperties>,
  height: number,
  linkWidth: number,
) {
  const y = (link.source.y1 - link.source.y0) / 2 + link.source.y0;
  const yCorr =
    y < height / 2 ? 27.5 + linkWidth / 2 : 27.5 + 145 - linkWidth / 2;
  return [link.source.x1, yCorr];
}

function horizontalTargetO(
  link: SankeyLink<ExtraNodeProperties, ExtraLinkProperties>,
  height: number,
  linkWidth: number,
) {
  const y = (link.target.y1 - link.target.y0) / 2 + link.target.y0;
  const yCorr =
    y < height / 2 ? 27.5 + linkWidth / 2 : 27.5 + 145 - linkWidth / 2;
  return [link.target.x0, yCorr];
}
function sankeyLinkHorizontalO() {
  return linkHorizontal().source(horizontalSourceO).target(horizontalTargetO);
}

// Component
export default function Link({ link, graphHeight }: LinkProps) {
  const linkWidth = (link.width / 100) * 50;
  //  link.width < graphHeight / 2.7 ? link.width : (link.width / 100) * 75; //block to a max width

  const path: string = sankeyLinkHorizontalO()(link, graphHeight, linkWidth);

  const [opacity, setOpacity] = useState(link.opacity);
  const hoverOpacity = link.opacity + 0.2;

  return (
    <g>
      <path
        d={path}
        style={{
          fill: "none",
          strokeOpacity: opacity,
          stroke: link.color,
          strokeWidth: linkWidth && !isNaN(linkWidth) ? linkWidth : 0,
        }}
        onMouseEnter={() => setOpacity(hoverOpacity)}
        onMouseLeave={() => setOpacity(opacity)}
      >
        <title>
          {link.source.name} -&gt; {link.target.name}: {link.value}
        </title>
      </path>
    </g>
  );
}
