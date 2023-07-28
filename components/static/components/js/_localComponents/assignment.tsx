import { h } from "preact";

//functions
import { purifyText } from "../functions";

//material ui components
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Typography from "@mui/material/Typography";

//components
import { Tag } from "../styledComponents";
import { AssignmentProps } from "./types";

export function Assignment({
  gettext,
  assignment,
  bookmarked,
  showBookmark,
  toggleBookmarked,
}: AssignmentProps): JSX.Element {
  const handleView = () => {
    if (assignment?.urls?.update) {
      window.location.assign(assignment.urls.update);
    } else if (assignment?.urls?.view) {
      window.location.assign(assignment.urls.view);
    }
  };

  const bookmarkIcon = () => {
    if (bookmarked !== undefined && showBookmark) {
      return (
        <Checkbox
          checked={bookmarked}
          icon={<BookmarkAddOutlinedIcon />}
          checkedIcon={<BookmarkAddedIcon />}
          onChange={toggleBookmarked}
          onClick={(evt: MouseEvent) => evt.stopPropagation()}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
            ml: "44px",
          }}
          title={
            bookmarked
              ? gettext("Remove from library")
              : gettext("Add to library")
          }
        />
      );
    }
    return <Box height="38px" ml="44px" width="38px" />;
  };

  return (
    <Card>
      <CardActionArea
        disableRipple={true}
        onClick={handleView}
        title={gettext("View assignment")}
      >
        <CardContent sx={{ padding: "10px 20px" }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography
                variant="h5"
                dangerouslySetInnerHTML={{
                  __html: purifyText(assignment.title),
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  display:
                    assignment.owner && assignment.owner.length > 0
                      ? "block"
                      : "none",
                }}
              >
                {gettext("By")}{" "}
                {assignment.owner && assignment.owner.length > 0
                  ? assignment.owner[0]?.username
                  : ""}
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
                  {assignment.question_count}{" "}
                  {assignment.question_count == 1
                    ? gettext("question")
                    : gettext("questions")}
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
                  {assignment.answer_count}{" "}
                  {assignment.answer_count == 1
                    ? gettext("answer")
                    : gettext("answers")}
                </Typography>
              </Tag>
              {bookmarkIcon()}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
