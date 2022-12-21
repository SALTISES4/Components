import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { DueInTag } from "../_reusableComponents/dueInTag";
import { CircleProgressIcon } from "../_reusableComponents/circularProgressIcon";

export const Group = (props) => {
  const { group } = props;
  return (
    <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h3">{group.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <DueInTag dueDate={group.dueDate} />
          <Box display="flex" alignItems="center">
            <CircleProgressIcon progress={group.progress} />
            <Typography> {group.progress}% completed</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
