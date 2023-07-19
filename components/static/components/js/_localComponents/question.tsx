/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { h } from "preact";

import { useEffect, useState } from "preact/hooks";

//material ui components
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//components
import { AddToAssignmentModal } from "../_reusableComponents/addToAssignmentModal";
import { DifficultyCircleIcon } from "../_reusableComponents/difficultyIconQuestion";
import { PeerImpactIcon } from "../_reusableComponents/peerImpactIcon";
import { Tag } from "../styledComponents";

//style
import saltise from "../theme";

// types
import { QuestionProps } from "./types";

const theme = saltise;

export function Question({
  bookmarked,
  difficultyLabels,
  expanded,
  gettext,
  handleAddToAssignment,
  question,
  showBookmark,
  toggleBookmarked,
}: QuestionProps): JSX.Element {
  let maxCategoriesShown = 3;

  const [{ showDetails }, setShowDetails] = useState<{
    showDetails: boolean;
  }>({ showDetails: false });

  const [{ showAllCategories }, setShowAllCategories] = useState<{
    showAllCategories: boolean;
  }>({ showAllCategories: false });

  const [openAddToAssignmentModal, setOpenAddToAssignmentModal] =
    useState(false);
  const handleOpenAddToAssignmentModal = () => {
    setOpenAddToAssignmentModal(true);
    console.info("click");
  };
  const handleCloseAddToAssignmentModal = () =>
    setOpenAddToAssignmentModal(false);

  useEffect(() => {
    if (expanded !== undefined && showDetails != expanded) {
      setShowDetails(() => ({
        showDetails: expanded,
      }));
    }
  }, [expanded]);

  const handleChange = (evt: MouseEvent) => {
    if (window.getSelection()?.toString()) {
      evt.stopPropagation();
      return;
    }
    setShowDetails((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  const text = () => {
    if (showDetails) {
      return (
        <Typography
          sx={{ cursor: "text", mb: "10px", mt: "20px" }}
          dangerouslySetInnerHTML={{ __html: question.text }} // Bleached in serializer and elastic doc
        />
      );
    }
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
                      cursor: "text",
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
    if (showDetails) {
      return (
        <Checkbox
          checked={false}
          inputProps={{ "aria-label": gettext("Show/hide details") }}
          icon={<VisibilityIcon fontSize="medium" />}
          checkedIcon={<VisibilityOffIcon fontSize="medium" />}
          onClick={(evt: MouseEvent) => evt.stopPropagation()}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
          title={showDetails ? gettext("Hide data") : gettext("Show data")}
        />
      );
    }
  };

  const addToAssignmentIcon = () => {
    if (
      showDetails &&
      question.urls?.addable_assignments &&
      handleAddToAssignment
    ) {
      return (
        <Box>
          <IconButton
            color="primary"
            onClick={(evt: MouseEvent) => {
              evt.stopPropagation();
              handleOpenAddToAssignmentModal();
            }}
            title={gettext("Add to assignment")}
            sx={{ marginLeft: "0px!important" }}
          >
            <PlaylistAddIcon fontSize="medium" />
          </IconButton>
          <AddToAssignmentModal
            gettext={gettext}
            aria-labelledby="add"
            aria-describedby="add question to assignment"
            handleSubmit={handleAddToAssignment}
            open={openAddToAssignmentModal}
            onClose={handleCloseAddToAssignmentModal}
            question={question}
            urls={{
              assignmentList: question.urls?.addable_assignments,
            }}
          />
        </Box>
      );
    }
  };

  const bookmarkIcon = () => {
    if (bookmarked !== undefined && showDetails && showBookmark) {
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
          }}
          title={
            bookmarked
              ? gettext("Remove from library")
              : gettext("Add to library")
          }
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

  const categories = () => {
    if (showAllCategories && question.category) {
      maxCategoriesShown = question.category.length;
    }
    return question.category
      ?.slice(0, maxCategoriesShown)
      .map((category, i) => (
        <Tag key={i} title={gettext("Category")}>
          <Typography>{category.title}</Typography>
        </Tag>
      ));
  };

  const extraCategories = () => {
    if (
      question.category !== undefined &&
      question.category.length > maxCategoriesShown
    ) {
      return (
        <Tag
          onClick={(evt: MouseEvent) => {
            evt.stopPropagation();
            setShowAllCategories({ showAllCategories: true });
          }}
          sx={{ cursor: "pointer" }}
          title={gettext("Click to show all categories")}
        >
          <Typography>{`+${
            question.category.length - maxCategoriesShown
          } ${gettext("more")}`}</Typography>
        </Tag>
      );
    }
  };

  const difficulty = () => {
    if (question.difficulty.label < 4) {
      return (
        <Box display="flex">
          <DifficultyCircleIcon difficulty={question.difficulty} />
          <Typography variant="h4" sx={{ width: "64px" }}>
            {question.difficulty.value
              ? question.difficulty.value
              : difficultyLabels
              ? difficultyLabels[question.difficulty.label]
              : ""}
          </Typography>
        </Box>
      );
    }
  };

  const peerImpact = () => {
    if (question.peer_impact.label < 4) {
      return (
        <Box display="flex">
          <PeerImpactIcon peerImpact={question.peer_impact} />
          <Typography variant="h4" sx={{ width: "80px" }}>
            {gettext("Peer Impact")}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Card>
      <CardActionArea
        disableRipple={true}
        onClick={handleChange}
        sx={{ userSelect: "text" }}
      >
        <CardContent sx={{ pt: "20px" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3" sx={{ m: "0px" }}>
              {question.title}
            </Typography>
            <Box display="flex" sx={{ mt: "5px" }}>
              {difficulty()}
              {peerImpact()}
            </Box>
          </Box>
          <Typography variant="caption">
            {question.user?.username ? gettext("From") : ""}{" "}
            {question.user?.username}
          </Typography>
          {text()}
          {image()}
          {video()}
          {answerchoices()}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing="5px">
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
            {discipline()}
            {categories()}
            {extraCategories()}
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
            {addToAssignmentIcon()}
            {bookmarkIcon()}
          </Stack>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
