import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import { Tag } from "../styledComponents";
import { AssignmentBisProps } from "./types";

export function AssignmentBis({
  gettext,
  assignment,
  bookmarked,
  toggleBookmarked,
}: AssignmentBisProps): JSX.Element {
  const bookmarkIcon = () => {
    if (bookmarked !== undefined && !assignment.is_owner) {
      return (
        <Checkbox
          checked={bookmarked}
          icon={<BookmarkAddOutlinedIcon />}
          checkedIcon={<BookmarkAddedIcon />}
          onChange={toggleBookmarked}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
            ml: "80px",
          }}
          title={
            bookmarked
              ? gettext("Remove from library")
              : gettext("Add to library")
          }
        />
      );
    }
    return <Box height="38px" ml="80px" width="38px" />;
  };

  return (
    <Card>
      <CardContent sx={{ padding: "10px 20px" }}>
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
            {bookmarkIcon()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
