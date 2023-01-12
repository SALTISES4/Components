import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { CircleProgressIcon } from "../_reusableComponents/circularProgressIcon";

import { Tag } from "../styledComponents";

import { daysDiff } from "../functions";

export const AssigmentStudent = (props) => {
  const { assigment } = props;
  const daysDifference = daysDiff(assigment.dueDate);
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assigment.title}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          width="30%"
          minWidth="270px"
          justifyContent="space-between"
        >
          {assigment.progress == 0 ? (
            <Tag sx={{ mr: "10px", ml: "10px", width: "100px" }}>
              <FormatListBulletedIcon fontSize="small" />
              <Box display="flex">
                <Typography>{assigment.questions.length} questions</Typography>
              </Box>
            </Tag>
          ) : (
            <Box display="flex" alignItems="center">
              <CircleProgressIcon progress={assigment.progress} />
              <Typography> {assigment.progress}% completed</Typography>
            </Box>
          )}
          <Box display="flex" alignItems="center">
            {daysDifference > 5 ? (
              <AccessTimeIcon
                color="secondary4"
                sx={{ fontSize: "24px", margin: "2px" }}
              />
            ) : (
              <AccessTimeIcon
                sx={{ fontSize: "24px", margin: "2px" }}
                color="warning"
              />
            )}
            <Typography variant="h4" sx={{ margin: "0px 10px" }}>
              Due In {daysDifference} days
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
