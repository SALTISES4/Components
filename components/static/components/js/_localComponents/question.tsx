/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

//functions
import { purifyHTML } from "../functions";

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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

//components
import { AddToAssignmentModal } from "../_reusableComponents/addToAssignmentModal";
import { DifficultyCircleIcon } from "../_reusableComponents/difficultyIconQuestion";
import { PeerImpactIcon } from "../_reusableComponents/peerImpactIcon";
import { RationalesModal } from "./rationales";
import { Tag } from "../styledComponents";

//style
import saltise from "../theme";

// types
import { DraggableQuestionProps, QuestionProps } from "./types";

const theme = saltise;

export function DraggableQuestion({
  dense,
  question,
  rank,
  ...props
}: DraggableQuestionProps): JSX.Element {
  return (
    <Card raised={true} {...props}>
      <CardContent sx={{ p: "10px" }}>
        <Stack alignItems={"center"} columnGap={"20px"} direction={"row"}>
          <DragIndicatorRoundedIcon color="primary" />
          <Typography variant={dense ? "body2" : "body1"}>
            {question ? (
              rank !== undefined ? (
                `${rank + 1}. ${question.title}`
              ) : (
                question.title
              )
            ) : (
              <Skeleton width={200} />
            )}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function Question({
  bookmarked,
  difficultyLabels,
  expanded,
  gettext,
  handleAddToAssignment,
  handleRemove,
  question,
  questionsEditableByUser,
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
  };
  const handleCloseAddToAssignmentModal = () =>
    setOpenAddToAssignmentModal(false);

  const [openRationalesModal, setOpenRationalesModal] = useState(false);
  const handleOpenRationalesModal = () => {
    setOpenRationalesModal(true);
  };
  const handleCloseRationalesModal = () => setOpenRationalesModal(false);

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
          dangerouslySetInnerHTML={{ __html: purifyHTML(question.text) }} // Bleached in serializer and elastic doc and purified here
          variant={"body2"}
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
                  <Typography variant={"body2"}>
                    {answerchoice.label}.
                  </Typography>
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
                    variant={"body2"}
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

  const editIcon = () => {
    if (showDetails) {
      if (question.is_editable) {
        return (
          <IconButton
            color="primary"
            onClick={(evt: MouseEvent) => {
              evt.stopPropagation();
              if (question.urls?.update) {
                window.location.assign(question.urls.update);
              }
            }}
            title={gettext("Update question")}
          >
            <EditIcon fontSize="medium" />
          </IconButton>
        );
      }
      return (
        <IconButton
          color="primary"
          onClick={(evt: MouseEvent) => {
            evt.stopPropagation();
            if (question.urls?.copy) {
              window.location.assign(question.urls.copy);
            }
          }}
          title={gettext("Copy question")}
        >
          <ContentCopyIcon fontSize="medium" />
        </IconButton>
      );
    }
  };

  const previewIcon = () => {
    if (showDetails) {
      return (
        <IconButton
          color="primary"
          onClick={(evt: MouseEvent) => {
            evt.stopPropagation();
            if (question.urls?.test) {
              window.location.assign(question.urls.test);
            }
          }}
          title={gettext("Preview question")}
        >
          <VisibilityIcon fontSize="medium" />
        </IconButton>
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

  const removeFromAssignmentIcon = () => {
    if (questionsEditableByUser === true && handleRemove && showDetails) {
      return (
        <Box>
          <IconButton
            color="primary"
            onClick={(evt: MouseEvent) => {
              evt.stopPropagation();
              handleRemove();
            }}
            title={gettext("Remove from assignment")}
            sx={{ marginLeft: "0px!important" }}
          >
            <PlaylistRemoveIcon fontSize="medium" />
          </IconButton>
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

  const rationales = () => {
    const enableDialog =
      ((question.urls?.rationales && question.urls?.matrix) ||
        (question.most_convincing_rationales && question.matrix)) &&
      question.answer_count > 0 &&
      question.type == "PI";
    return (
      <Fragment>
        <Tag
          onClick={(evt: MouseEvent) => {
            if (enableDialog) {
              evt.stopPropagation();
              handleOpenRationalesModal();
            }
          }}
          sx={{
            bgcolor: enableDialog ? "white" : theme.palette.inactiveTint.main,
            borderStyle: enableDialog ? "solid" : "none",
            color: enableDialog ? "inherit" : theme.palette.inactive.main,
            paddingTop: "3px",
            paddingBottom: "3px",
            cursor: enableDialog ? "pointer" : "default",
            " .MuiTypography-root": {
              color: enableDialog ? "inherit" : theme.palette.inactive.main,
            },
            "&:hover": {
              bgcolor: enableDialog
                ? theme.palette.secondary4.main
                : theme.palette.inactiveTint.main,
              color: enableDialog
                ? theme.palette.background.paper
                : theme.palette.inactive.main,
              " .MuiTypography-root": {
                color: enableDialog
                  ? theme.palette.background.paper
                  : theme.palette.inactive.main,
              },
            },
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
        {enableDialog ? (
          <RationalesModal
            gettext={gettext}
            aria-labelledby="add"
            aria-describedby="add question to assignment"
            matrix={question.matrix}
            open={openRationalesModal}
            onClose={handleCloseRationalesModal}
            rationales={question.most_convincing_rationales}
            urls={{
              matrix: question.urls?.matrix,
              rationales: question.urls?.rationales,
            }}
          />
        ) : null}
      </Fragment>
    );
  };

  const discipline = () => {
    if (question?.discipline?.title) {
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

  const errors = () => {
    if (question.is_valid !== undefined && !question.is_valid) {
      return (
        <Tag sx={{ background: theme.palette.errorTint.main }}>
          <ErrorIcon color={"error"} fontSize="small" />
          <Typography color={"error"}>{gettext("Invalid")}</Typography>
        </Tag>
      );
    }
  };

  const difficulty = () => {
    if (question.difficulty.label < 4) {
      return (
        <Box display="flex">
          <DifficultyCircleIcon difficulty={question.difficulty} />
          <Typography variant="body2" sx={{ width: "64px" }}>
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
          <Typography variant="body2" sx={{ width: "80px" }}>
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
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4">{question.title}</Typography>
            <Box display="flex">
              {difficulty()}
              {peerImpact()}
            </Box>
          </Box>
          <Typography variant="subtitle2">
            {question.user?.username ? gettext("By") : ""}{" "}
            {question.user?.username}
          </Typography>
          {text()}
          {image()}
          {video()}
          {answerchoices()}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing="5px">
            {rationales()}
            {discipline()}
            {categories()}
            {extraCategories()}
            {errors()}
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
            {editIcon()}
            {previewIcon()}
            {addToAssignmentIcon()}
            {removeFromAssignmentIcon()}
            {bookmarkIcon()}
          </Stack>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
