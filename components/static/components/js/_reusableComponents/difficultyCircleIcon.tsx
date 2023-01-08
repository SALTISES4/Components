import { h } from "preact";
import saltise from "../theme";

import CircleIcon from "@mui/icons-material/Circle";

import { QuestionDifficulty } from "../_localComponents/types";
import { DifficultyCircleIconProps } from "./types";

const theme = saltise;

const colorPicker = (difficulty: QuestionDifficulty) => {
  let color = theme.palette.primaryBlue.main;
  if (difficulty.value == 1) {
    color = theme.palette.green.main;
  } else if (difficulty.value == 2) {
    color = theme.palette.yellow.main;
  } else if (difficulty.value == 3) {
    color = theme.palette.red.main;
  }
  return color;
};

export const DifficultyCircleIcon = ({
  difficulty,
}: DifficultyCircleIconProps) => {
  const color = colorPicker(difficulty);
  return (
    <CircleIcon
      fontSize="medium"
      sx={{ pl: "10px", pr: "10px", color: { color } }}
      titleAccess={difficulty.label}
    />
  );
};
