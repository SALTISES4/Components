import { h } from "preact";
import saltise from "../theme";

import CircleIcon from "@mui/icons-material/Circle";

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

export const AssigmentStateIcon = ({ state }: { state: string }) => {
  const color = colorPicker(state);
  return (
    <CircleIcon
      fontSize="medium"
      sx={{ pl: "10px", pr: "10px", color: { color } }}
      titleAccess={state}
    />
  );
};
