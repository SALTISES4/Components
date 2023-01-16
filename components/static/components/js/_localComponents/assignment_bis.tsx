import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { Tag } from "../styledComponents";
import { AssignmentBisProps } from "./types";

export function AssignmentBis({
  gettext,
  assignment,
}: AssignmentBisProps): JSX.Element {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assignment.title}</Typography>
          <Typography variant="caption">
            {gettext("From")} {assignment.author}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Tag sx={{ mr: "10px", ml: "10px" }}>
            <FormatListBulletedIcon fontSize="small" />
            <Typography>
              {assignment.questionCount} {gettext("questions")}
            </Typography>
          </Tag>
          <Tag sx={{ mr: "10px", ml: "10px" }}>
            <FormatListBulletedIcon fontSize="small" />
            <Typography>
              {assignment.answerCount} {gettext("answers")}
            </Typography>
          </Tag>
          <IconButton sx={{ ml: "80px" }}>
            <BookmarkAddOutlinedIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
