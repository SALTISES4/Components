import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import { Tag } from "../styledComponents";
import { AssignmentBisProps } from "./types";

export function AssignmentBis({
  gettext,
  assignment,
}: AssignmentBisProps): JSX.Element {
  return (
    <Card sx={{ padding: "10px 20px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assignment.title}</Typography>
          <Typography
            variant="caption"
            sx={{ display: assignment.owner ? "block" : "none" }}
          >
            {gettext("By")} {assignment.owner}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Tag
            sx={{
              mx: "10px",
              minWidth: "102px",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <FormatListBulletedIcon fontSize="small" />
            <Typography>
              {assignment.question_count} {gettext("questions")}
            </Typography>
          </Tag>
          <Tag
            sx={{
              mx: "10px",
              minWidth: "102px",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <QuestionAnswerIcon fontSize="small" />
            <Typography>
              {assignment.answer_count} {gettext("answers")}
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
