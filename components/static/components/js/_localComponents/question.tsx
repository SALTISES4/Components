import { h } from "preact";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Box from "@mui/system/Box";

import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";

//import saltise from "../theme.js";
import { Tag } from "../styledComponents";
import { DifficultyCircleIcon } from "../_reusableComponents/difficultyCircleIcon";
import { PeerImpactIcon } from "../_reusableComponents/peerImpactIcon.jsx";

import { QuestionType } from "./types";

export function Question({
  gettext,
  question,
}: {
  gettext: (a: string) => string;
  question: QuestionType;
}): JSX.Element {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" sx={{ mb: "5px" }}>
            {question.title}
          </Typography>
          <Box display="flex">
            <Box display="flex" sx={{ mr: "30px" }}>
              <DifficultyCircleIcon difficulty={question.difficulty} />
              <Typography variant="h4">{question.difficulty}</Typography>
            </Box>
            <Box display="flex">
              <PeerImpactIcon peerImpact={question.peerImpact} />
              <Typography variant="h4">{gettext("Peer Impact")}</Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="h6">
          {gettext("From")} {question.author}
        </Typography>
        <Typography sx={{ mb: "10px", mt: "20px" }}>
          {question.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          {question.tags?.map((tag, i) => (
            <Tag key={i}>
              <Typography variant="tag">{tag}</Typography>
            </Tag>
          ))}
          <Tag
            sx={{
              bgcolor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            <BarChartIcon fontSize="small" sx={{ pr: "6px" }} />
            <Typography variant="tag">{question.answerCount}</Typography>
          </Tag>
        </Stack>
        <Stack
          direction="row"
          spacing="15px"
          sx={{
            "& .MuiIconButton-root": {
              marginLeft: "15px",
            },
          }}
        >
          <IconButton>
            <PlaylistAddIcon fontSize="medium" />
          </IconButton>
          <IconButton>
            <VisibilityIcon fontSize="medium" />
          </IconButton>
          <Checkbox
            icon={<BookmarkAddOutlinedIcon />}
            checkedIcon={<BookmarkAddedIcon />}
            sx={{
              color: "primaryBlue.main",
              "&.Mui-checked": {
                color: "primaryBlue.main",
              },
            }}
          />
          <IconButton>
            <MoreHorizIcon fontSize="medium" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
