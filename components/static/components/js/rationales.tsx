import { Component, h, render } from "preact";
export { h, render };
import chroma from "chroma-js";
import * as d3 from "d3";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Box from "@mui/material/Box";
//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  AnswerWithRationalesType,
  RationalesAppProps,
  RationalesAppState,
  RationalesType,
} from "./types";
import { Container } from "@mui/system";

import { answersWithRationales } from "./data";
import { SankeyChart } from "./_sankey/Sankey/Sankey";
import { ExtraNodeProperties } from "./_sankey/Sankey/types";
import { data } from "./_sankey/Sankey/data";
import { Link, Node } from "./_sankey/Sankey";

export class App extends Component<RationalesAppProps, RationalesAppState> {
  constructor(props: RationalesAppProps) {
    super(props);
    this.state = {
      answersWithRationales,
    };
  }

  componentDidMount(): void {
    // Fetch data from db to overwrite placeholders
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  render() {
    return (
      <div
        className="App"
        style={{
          fontFamily: "sans-serif",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Sankey
        </h1>
        <SankeyChart<ExtraNodeProperties, {}>
          data={data}
          nodeWidth={100}
          nodePadding={40}
        >
          {({ graph }) => {
            const color = chroma.scale("Set2").classes(graph.nodes.length);
            const colorScale = d3
              .scaleLinear()
              .domain([0, graph.nodes.length])
              .range([0, 1]);

            return (
              <g>
                {graph &&
                  graph.links.map((link, i) => (
                    <Link
                      key={`sankey-link-${i}`}
                      link={link}
                      color={color(colorScale(link.source.index)).hex()}
                      maxWidth={30}
                    />
                  ))}
                {graph &&
                  graph.nodes.map((node, i) => (
                    <Node<ExtraNodeProperties, {}>
                      key={`sankey-node-${i}`}
                      link={node}
                      color={color(colorScale(i)).hex()}
                      name={node.name}
                      height={30}
                      graph={graph}
                    />
                  ))}
              </g>
            );
          }}
        </SankeyChart>
      </div>
    );
  }
}
