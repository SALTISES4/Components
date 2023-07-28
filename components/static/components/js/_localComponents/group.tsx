import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { DueInTag } from "../_reusableComponents/dueInTag";
import { CircleProgressIcon } from "../_reusableComponents/circularProgressIcon";

import { StudentGroupAssignmentProps } from "./types";

export function StudentGroupAssignment({
  gettext,
  studentgroupassignment,
  showGroup = false,
}: StudentGroupAssignmentProps): JSX.Element {
  /*
  Render a single studentgroupassignment object
  */
  return (
    <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            onClick={() => (window.location.href = studentgroupassignment.url)}
            sx={{ cursor: "pointer" }}
          >
            {showGroup
              ? studentgroupassignment.group.title
              : studentgroupassignment.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <DueInTag
            dueDate={new Date(studentgroupassignment.due_date)}
            gettext={gettext}
          />
          <Box display="flex" alignItems="center">
            <CircleProgressIcon progress={studentgroupassignment.progress} />
            <Typography variant={"body2"}>
              {studentgroupassignment.progress}% {gettext("completed")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
