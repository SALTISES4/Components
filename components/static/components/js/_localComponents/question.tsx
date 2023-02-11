import { h } from "preact";

import { useState } from "preact/hooks";

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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import saltise from "../theme";
import { Tag } from "../styledComponents";
import { DifficultyCircleIcon } from "../_reusableComponents/difficultyIconQuestion";
import { PeerImpactIcon } from "../_reusableComponents/peerImpactIcon";

import { QuestionProps } from "./types";

const theme = saltise;

export function Question({ gettext, question }: QuestionProps): JSX.Element {
  const [{ showAnswerChoices }, setShowAnswerChoices] = useState<{
    showAnswerChoices: boolean;
  }>({ showAnswerChoices: false });

  const handleChange = () => {
    setShowAnswerChoices((prevState) => ({
      showAnswerChoices: !prevState.showAnswerChoices,
    }));
  };

  const answerchoices = () => {
    if (question.answerchoice_set?.length > 0 && showAnswerChoices) {
      return (
        <Box>
          {question.answerchoice_set.map((answerchoice, i) => {
            return (
              <Box
                key={i}
                display={"flex"}
                alignItems={"baseline"}
                sx={{ pb: "4px" }}
              >
                <Box
                  sx={{
                    height: "18px",
                    minWidth: "26px",
                    position: "relative",
                    top: "4px",
                  }}
                >
                  {answerchoice.correct ? (
                    <CheckCircleIcon color={"success"} sx={{ fontSize: 18 }} />
                  ) : null}
                </Box>
                <Box sx={{ marginRight: "4px" }}>
                  <Typography>{answerchoice.label}.</Typography>
                </Box>
                <Box>
                  <Typography
                    component={"div"}
                    dangerouslySetInnerHTML={{
                      __html: answerchoice.text,
                    }} // Bleached in serializer
                    sx={{
                      "> p": { mt: 0, mb: "4px" },
                    }}
                    variant={"body1"}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      );
    }
  };

  const showAnswerChoicesIcon = () => {
    if (question.answerchoice_set?.length > 0) {
      return (
        <Checkbox
          checked={showAnswerChoices}
          onChange={handleChange}
          inputProps={{ "aria-label": gettext("Show/hide answer choices") }}
          icon={<VisibilityIcon fontSize="medium" />}
          checkedIcon={<VisibilityOffIcon fontSize="medium" />}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
          title={
            showAnswerChoices
              ? gettext("Hide answer choices")
              : gettext("Show answer choices")
          }
        />
      );
    }
  };

  const difficulty = () => {
    if (parseInt(question.difficulty.label) < 4) {
      return (
        <Box display="flex" sx={{ mr: "30px" }}>
          <DifficultyCircleIcon difficulty={question.difficulty} />
          <Typography variant="h4" sx={{ width: "64px" }}>
            {question.difficulty.value}
          </Typography>
        </Box>
      );
    }
  };

  const peerImpact = () => {
    if (question.peer_impact.label < 4) {
      return (
        <Box display="flex">
          <PeerImpactIcon peerImpact={question.peer_impact.label} />
          <Typography variant="h4">{gettext("Peer Impact")}</Typography>
        </Box>
      );
    }
  };
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" sx={{ mb: "5px" }}>
            {question.title}
          </Typography>
          <Box display="flex">
            {difficulty()}
            {peerImpact()}
          </Box>
        </Box>
        <Typography variant="caption">
          {gettext("From")} {question.user.username}
        </Typography>
        <Typography
          sx={{ mb: "10px", mt: "20px" }}
          dangerouslySetInnerHTML={{ __html: question.text }} // Bleached in serializer
        />
        {answerchoices()}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          <Tag sx={{ backgroundColor: theme.palette.primary1.main }}>
            <Typography>{question.discipline?.title}</Typography>
          </Tag>
          {question.category?.map((category, i) => (
            <Tag key={i}>
              <Typography>{category.title}</Typography>
            </Tag>
          ))}
          <Tag
            sx={{
              bgcolor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              paddingTop: "3px",
              paddingBottom: "3px",
            }}
          >
            <BarChartIcon fontSize="small" />
            <Typography>
              {question.answer_count}{" "}
              {question.answer_count == 1
                ? gettext("answer")
                : gettext("answers")}
            </Typography>
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
          {showAnswerChoicesIcon()}
          <IconButton>
            <PlaylistAddIcon fontSize="medium" />
          </IconButton>
          <Checkbox
            icon={<BookmarkAddOutlinedIcon />}
            checkedIcon={<BookmarkAddedIcon />}
            sx={{
              color: "primary.main",
              "&.Mui-checked": {
                color: "primary.main",
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
