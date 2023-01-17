import { h } from "preact";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { SuperUserBarProps } from "./types";

const style = {
  color: "neutral.main",
  backgroundColor: "#fff",
  borderRadius: "20px",
  width: "68%px",
  minWidth: "250px",
  maxWidth: "750px",
  height: "45px",
  marginTop: "30px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
};

export const SuperUserBar = ({
  activeAssignmentCount,
  activeGroupCount,
  createdQuestionCount,
  gettext,
}: SuperUserBarProps) => {
  return (
    <Box sx={style}>
      <Typography variant="h4" width="100%" align="center">
        {activeAssignmentCount} {gettext("active assignments")}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h4" width="100%" align="center">
        {activeGroupCount} {gettext("groups")}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h4" width="100%" align="center">
        {createdQuestionCount} {gettext("questions")}
      </Typography>
    </Box>
  );
};
