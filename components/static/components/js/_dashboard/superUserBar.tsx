import { h } from "preact";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
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
        {activeAssignmentCount !== undefined ? (
          `${activeAssignmentCount} ${
            activeAssignmentCount != 1
              ? gettext("active assignments")
              : gettext("active assignments")
          }`
        ) : (
          <Skeleton sx={{ margin: "0 auto", width: "60%" }} />
        )}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h4" width="100%" align="center">
        {activeGroupCount !== undefined ? (
          `${activeGroupCount} ${
            activeGroupCount != 1 ? gettext("groups") : gettext("groups")
          }`
        ) : (
          <Skeleton sx={{ margin: "0 auto", width: "35%" }} />
        )}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h4" width="100%" align="center">
        {createdQuestionCount !== undefined ? (
          `${createdQuestionCount} ${
            createdQuestionCount != 1
              ? gettext("questions")
              : gettext("question")
          }`
        ) : (
          <Skeleton sx={{ margin: "0 auto", width: "50%" }} />
        )}
      </Typography>
    </Box>
  );
};
