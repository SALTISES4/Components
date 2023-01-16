import { h } from "preact";
import saltise from "../theme";

import CircleIcon from "@mui/icons-material/Circle";
import { DifficultyCircleAssignmentProps } from "./types";

const theme = saltise;

const colorPicker = (difficulty: string) => {
  let color = theme.palette.primary.main;
  if (difficulty == "Easy") {
    color = theme.palette.success.main;
  } else if (difficulty == "Moderate") {
    color = theme.palette.warning.main;
  } else if (difficulty == "Difficult") {
    color = theme.palette.error.main;
  }
  return color;
};

export const DifficultyCircleIcon = ({
  difficulty,
}: DifficultyCircleAssignmentProps) => {
  const color = colorPicker(difficulty);
  return (
    <CircleIcon
      fontSize="medium"
      sx={{ pl: "10px", pr: "10px", color: { color } }}
      titleAccess={difficulty}
    />
  );
};
