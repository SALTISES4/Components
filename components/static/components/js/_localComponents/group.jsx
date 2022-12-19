import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { CircularBox } from "../styledComponents.js";
import { DueInTag } from "../reusableComponents/dueInTag";

import CircularProgress from "@mui/material/CircularProgress";

export const Group = (props) => {
  const { group } = props;
  const progress = 32.4;
  return (
    <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h3">{group.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <DueInTag dueDate={group.dueDate} />
          <Box display="flex" alignItems="center">
            <CircularBox>
              <CircularProgress
                variant="determinate"
                value={progress}
                size="20px"
                color="orange"
              />
            </CircularBox>
            <Typography> {progress}% completed</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
