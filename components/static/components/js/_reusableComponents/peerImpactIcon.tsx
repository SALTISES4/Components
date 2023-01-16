import { Box } from "@mui/material";
import { h } from "preact";
import saltise from "../theme";
import styled from "@mui/system/styled";
import { PeerImpactIconProps } from "./types";

const theme = saltise;
const color0 = theme.palette.secondary2.main;
const color1 = theme.palette.warning.main;

const ImpactRectangle = styled(Box)({
  height: "18px",
  width: "6px",
  borderRadius: "4px",
  margin: "0.5px",
});

const colorPicker = (peerImpact: number) => {
  const color = [color0, color0, color0];
  if (peerImpact >= 1) {
    color[0] = color1;
  }
  if (peerImpact >= 2) {
    color[1] = color1;
  }
  if (peerImpact >= 3) {
    color[2] = color1;
  }
  return color;
};

export const PeerImpactIcon = ({ peerImpact }: PeerImpactIconProps) => {
  const color = colorPicker(peerImpact);
  return (
    <Box marginRight="10px" display="flex">
      <ImpactRectangle sx={{ backgroundColor: color[0] }} />
      <ImpactRectangle sx={{ backgroundColor: color[1] }} />
      <ImpactRectangle sx={{ backgroundColor: color[2] }} />
    </Box>
  );
};
