import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { DifficultyCircleIcon } from "../_reusableComponents/difficultyCircleIcon.jsx";

import { Tag } from "../styledComponents";

export const Assigment = (props) => {
  const { assigment } = props;
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assigment.title}</Typography>
          <Typography variant="h6">From {assigment.autor}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Tag sx={{ mr: "10px", ml: "10px" }}>
            <FormatListBulletedIcon sx={{ pr: "6px" }} fontSize="small" />
            <Typography variant="tag">
              {assigment.questions.length} questions
            </Typography>
          </Tag>
          <DifficultyCircleIcon difficulty={assigment.difficulty} />
          <Typography variant="h4">{assigment.distributionState}</Typography>
          <IconButton color="primaryBlue" sx={{ ml: "80px" }}>
            <AddIcon fontSize="20px" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
