import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { Tag } from "../styledComponent.js";

export const AssigmentBis = (props) => {
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
          <Tag sx={{ mr: "10px", ml: "10px" }}>
            <FormatListBulletedIcon sx={{ pr: "6px" }} fontSize="small" />
            <Typography variant="tag">123 answers</Typography>
          </Tag>
          <IconButton color="primaryBlue" sx={{ ml: "80px" }}>
            <BookmarkAddOutlinedIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
