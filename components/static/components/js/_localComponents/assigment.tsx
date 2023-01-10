import { Fragment, h } from "preact";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Group } from "../_localComponents/group";
import { DifficultyCircleIcon } from "../_reusableComponents/difficultyCircleIcon";

import { Tag } from "../styledComponents";

import { AssignmentType } from "./types";

export function Assignment({
  gettext,
  assignment,
}: {
  gettext: (a: string) => string;
  assignment: AssignmentType;
}): JSX.Element {
  return (
    <Fragment>
      <Card>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h3">{assignment.title}</Typography>
            <Typography variant="h6">
              {gettext("By")} {assignment.author}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Tag sx={{ mr: "10px", ml: "10px" }}>
              <FormatListBulletedIcon sx={{ pr: "6px" }} fontSize="small" />
              <Typography variant="tag">
                {assignment.questionCount} {gettext("questions")}
              </Typography>
            </Tag>
            <DifficultyCircleIcon difficulty={assignment.difficulty} />
            <Typography variant="h4">
              {assignment.distributionState}
            </Typography>
            <IconButton color="primaryBlue" sx={{ ml: "80px" }} size="medium">
              <AddIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Card>
      {assignment.groups.map((group) => (
        <Group key={group.title} group={group} />
      ))}
    </Fragment>
  );
}
