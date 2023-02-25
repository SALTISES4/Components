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

export function Question({
  gettext,
  bookmarked,
  question,
  toggleBookmarked,
}: QuestionProps): JSX.Element {
  const [{ showDetails }, setShowDetails] = useState<{
    showDetails: boolean;
  }>({ showDetails: false });

  const handleChange = () => {
    setShowDetails((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  const answerchoices = () => {
    if (question.answerchoice_set?.length > 0 && showDetails) {
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

  const image = () => {
    if (showDetails && question.image) {
      return (
        <img
          src={question.image}
          alt={question.image_alt_text}
          title={gettext("Question image")}
          style={{
            display: "block",
            margin: "auto",
            maxHeight: "300px",
            maxWidth: "80%",
            padding: "12px 0px",
            width: "auto",
          }}
        />
      );
    }
  };

  const video = () => {
    if (showDetails && question.video_url) {
      return (
        <object
          data={question.video_url}
          height={390}
          style={{
            display: "block",
            margin: "auto",
            padding: "12px 0px",
          }}
          width={640}
        />
      );
    }
  };

  const showDetailsIcon = () => {
    if (question.answerchoice_set?.length > 0 || question.image) {
      return (
        <Checkbox
          checked={showDetails}
          onChange={handleChange}
          inputProps={{ "aria-label": gettext("Show/hide details") }}
          icon={<VisibilityIcon fontSize="medium" />}
          checkedIcon={<VisibilityOffIcon fontSize="medium" />}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
          title={
            showDetails ? gettext("Hide details") : gettext("Show details")
          }
        />
      );
    }
  };

  const bookmarkIcon = () => {
    if (bookmarked !== undefined) {
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
          }}
        />
      );
    }
  };

  const discipline = () => {
    if (question?.discipline) {
      return (
        <Tag
          sx={{ backgroundColor: theme.palette.primary1.main }}
          title={gettext("Discipline")}
        >
          <Typography>{question.discipline.title}</Typography>
        </Tag>
      );
    }
  };

  const difficulty = () => {
    if (parseInt(question.difficulty.label) < 4) {
      return (
        <Box display="flex">
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
        {image()}
        {video()}
        {answerchoices()}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          {discipline()}
          {question.category?.map((category, i) => (
            <Tag key={i} title={gettext("Category")}>
              <Typography>{category.title}</Typography>
            </Tag>
          ))}
          <Tag
            sx={{
              bgcolor: "white",
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
          {showDetailsIcon()}
          <IconButton>
            <PlaylistAddIcon fontSize="medium" />
          </IconButton>
          {bookmarkIcon()}
          <IconButton>
            <MoreHorizIcon fontSize="medium" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
