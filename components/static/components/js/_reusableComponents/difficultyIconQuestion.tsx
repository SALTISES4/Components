import { h } from "preact";
import saltise from "../theme";

import CircleIcon from "@mui/icons-material/Circle";

import { QuestionDifficulty } from "../_localComponents/types";
import { DifficultyCircleIconProps } from "./types";
import { QuestionDifficultyLevels } from "../_localComponents/enum";

const theme = saltise;

const colorPicker = (difficulty: QuestionDifficulty) => {
  let color = theme.palette.primary.main;
  if (difficulty.label == QuestionDifficultyLevels.un) {
    color = theme.palette.success.main;
  } else if (difficulty.label == QuestionDifficultyLevels.deux) {
    color = theme.palette.warning.main;
  } else if (difficulty.label == QuestionDifficultyLevels.trois) {
    color = theme.palette.error.main;
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
      titleAccess={difficulty.value}
    />
  );
};
