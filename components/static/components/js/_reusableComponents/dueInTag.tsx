import { h } from "preact";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Tag } from "../styledComponents";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { daysDiff } from "../functions";
import { DueInTagProps } from "./types";

export const DueInTag = ({ gettext, dueDate }: DueInTagProps) => {
  const daysDifference: number = daysDiff(dueDate);
  return (
    <Box>
      {daysDifference < 5 ? (
        <Tag
          sx={{
            mr: "10px",
            color: "error.main",
            backgroundColor: "errorTint.main",
          }}
        >
          <AlarmIcon fontSize="small" />
          {daysDifference < 2 ? (
            <Typography color="inherit">
              {gettext("Due in ")} {daysDifference} {gettext(" day")}
            </Typography>
          ) : (
            <Typography color="inherit">
              {gettext("Due in ")} {daysDifference} {gettext(" days")}
            </Typography>
          )}
        </Tag>
      ) : null}
    </Box>
  );
};
