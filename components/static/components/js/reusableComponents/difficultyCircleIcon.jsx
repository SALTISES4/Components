import { h } from "preact";
import saltise from "../theme";
import CircleIcon from "@mui/icons-material/Circle";

const theme = saltise;

const colorPicker = (difficulty) => {
  let color = theme.palette.primaryBlue.main;
  if (difficulty == "Easy") {
    color = theme.palette.green.main;
  } else if (difficulty == "Moderate") {
    color = theme.palette.yellow.main;
  } else if (difficulty == "Difficult") {
    color = theme.palette.red.main;
  }
  return color;
};

export const DifficultyCircleIcon = (props) => {
  const color = colorPicker(props.difficulty);
  return (
    <CircleIcon
      fontSize="medium"
      sx={{ pl: "10px", pr: "10px", color: { color } }}
    />
  );
};
