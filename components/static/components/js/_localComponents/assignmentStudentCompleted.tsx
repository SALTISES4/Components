import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { AssignmentType } from "./types";

export function AssignmentStudentCompleted({
  gettext,
  assignment,
}: {
  gettext: (a: string) => string;
  assignment: AssignmentType;
}): JSX.Element {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assignment.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <CheckCircleIcon
            sx={{ fontSize: "24px", margin: "2px" }}
            color="success"
          />
          <Typography variant="h4" sx={{ padding: "0px 77px 0px 10px" }}>
            7 {gettext("/")} 8
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
