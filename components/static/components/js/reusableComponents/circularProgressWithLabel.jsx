import { h } from "preact";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import saltise from "../theme";
//import { color } from "@mui/system";
import styled from "@mui/system/styled";
import saltise from "../theme";

const CircularBox = styled("div")({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  backgroundColor: saltise.palette.paleOrange.main,
  background: saltise.palette.paleOrange.main,
});

export const CircularProgressWithLabel = (props) => {
  const progress = props.value;
  // const color = colorPicker(progress).color;
  //const backgroundColor = colorPicker(progress).backgroundColor;
  return (
    <CircularBox>
      <CircularProgress
        variant="determinate"
        value={progress}
        color="orange"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="paleOrange">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </CircularBox>
  );
};

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

/*const colorPicker = (value) => {
  const progress = value;
  let color = saltise.palette.paleGreen.main;
  let backgroundColor = saltise.palette.paleGreen.main;
  if (0 <= progress < 25) {
    color = saltise.palette.Red.main;
    backgroundColor = saltise.palette.paleRed.main;
  } else if (25 <= value < 50) {
    color = saltise.palette.Orange.main;
    backgroundColor = saltise.palette.paleOrange.main;
  } else if (50 <= value < 75) {
    color = saltise.palette.paleYellow.main;
    backgroundColor = saltise.palette.paleYellow.main;
  } else {
    color = saltise.palette.paleGreen.main;
    backgroundColor = saltise.palette.paleGreen.main;
  }
  return [color, backgroundColor];
};*/
