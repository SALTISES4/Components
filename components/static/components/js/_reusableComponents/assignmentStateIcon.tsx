import { h } from "preact";
import saltise from "../theme";

import CircleIcon from "@mui/icons-material/Circle";
import { AssignmentStateIconProps } from "./types";

const theme = saltise;

const colorPicker = (state: string) => {
  let color = theme.palette.primary.main;
  if (state == "Draft") {
    color = theme.palette.inactive.main;
  } else if (state == "Distributed") {
    color = theme.palette.success.main;
  }
  return color;
};

export const AssignmentStateIcon = ({ state }: AssignmentStateIconProps) => {
  const color = colorPicker(state);
  return (
    <CircleIcon
      fontSize="medium"
      sx={{ pr: "6px", color: { color } }}
      titleAccess={state}
    />
  );
};
