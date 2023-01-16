import { h } from "preact";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Tag } from "../styledComponents";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { daysDiff } from "../functions";
import { DueInTagProps } from "./types";

export const DueInTag = ({ dueDate }: DueInTagProps) => {
  const daysDifference = daysDiff(dueDate);
  return (
    <Box>
      {daysDifference < 5 ? (
        <Tag
          sx={{
            mr: "10px",
            color: "red.main",
            backgroundColor: "paleRed.main",
          }}
        >
          <AlarmIcon fontSize="small" />
          <Typography> Due un {daysDifference} days </Typography>
        </Tag>
      ) : null}
    </Box>
  );
};
