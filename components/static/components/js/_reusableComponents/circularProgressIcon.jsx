import { h } from "preact";
import saltise from "../theme";
import { CircularBox } from "../styledComponents";
import CircularProgress from "@mui/material/CircularProgress";

const theme = saltise;

const colorPicker = (progress) => {
  const colorSet = [
    theme.palette.primaryBlue.main,
    theme.palette.primaryBlue.main,
  ];
  if (progress < 25) {
    colorSet[0] = theme.palette.paleRed.main;
    colorSet[1] = theme.palette.red.main;
  } else if (progress < 50) {
    colorSet[0] = theme.palette.paleOrange.main;
    colorSet[1] = theme.palette.orange.main;
  } else if (progress < 75) {
    colorSet[0] = theme.palette.paleYellow.main;
    colorSet[1] = theme.palette.yellow.main;
  } else if (progress <= 100) {
    colorSet[0] = theme.palette.paleGreen.main;
    colorSet[1] = theme.palette.green.main;
  }
  return colorSet;
};

export const CircleProgressIcon = (props) => {
  const colorSet = colorPicker(props.progress);
  return (
    <CircularBox sx={{ backgroundColor: colorSet[0] }}>
      <CircularProgress
        variant="determinate"
        value={props.progress}
        size="20px"
        sx={{ color: colorSet[1] }}
      />
    </CircularBox>
  );
};
