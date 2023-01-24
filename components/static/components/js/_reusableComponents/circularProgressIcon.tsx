import { h } from "preact";
import saltise from "../theme";
import { CircularBox } from "../styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import { CircleProgressionIconProps } from "./types";

const theme = saltise;

const colorPicker = (progress: number) => {
  const colorSet = [theme.palette.primary.main, theme.palette.primary.main];
  if (progress < 25) {
    colorSet[0] = theme.palette.errorTint.main;
    colorSet[1] = theme.palette.error.main;
  } else if (progress < 50) {
    colorSet[0] = theme.palette.orangeTint.main;
    colorSet[1] = theme.palette.orange.main;
  } else if (progress < 75) {
    colorSet[0] = theme.palette.warningTint.main;
    colorSet[1] = theme.palette.warning.main;
  } else if (progress <= 100) {
    colorSet[0] = theme.palette.successTint.main;
    colorSet[1] = theme.palette.success.main;
  }
  return colorSet;
};

export const CircleProgressIcon = ({
  progress,
}: CircleProgressionIconProps) => {
  const colorSet = colorPicker(progress);
  return (
    <CircularBox sx={{ backgroundColor: colorSet[0] }}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size="20px"
        sx={{ color: colorSet[1] }}
      />
    </CircularBox>
  );
};
