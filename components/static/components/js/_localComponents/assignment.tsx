import { Fragment, h } from "preact";

import { useState } from "preact/hooks";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

import { Group } from "./group";
import { AssignmentStateIcon } from "../_reusableComponents/assignmentStateIcon";

import { Tag } from "../styledComponents";

import { GroupAssignmentProps, GroupType } from "./types";

export function GroupAssignment({
  gettext,
  assignment,
}: GroupAssignmentProps): JSX.Element {
  const [{ open }, setOpen] = useState<{
    open: boolean;
  }>({ open: false });

  const handleClick = () => {
    setOpen((prevState) => ({
      open: !prevState.open,
    }));
  };

  const groups = () => {
    if (open) {
      return assignment.groups.map((group: GroupType, i: number) => (
        <Group key={i} gettext={gettext} group={group} />
      ));
    }
  };

  const icon = () => {
    if (open) {
      return (
        <IconButton size="medium" title={gettext("Hide groups")}>
          <RemoveIcon fontSize="medium" onClick={handleClick} />
        </IconButton>
      );
    }
    return (
      <IconButton size="medium" title={gettext("Show groups")}>
        <AddIcon fontSize="medium" onClick={handleClick} />
      </IconButton>
    );
  };

  return (
    <Fragment>
      <Card sx={{ padding: "10px 20px" }}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h3">{assignment.title}</Typography>
            <Typography variant="caption">
              {gettext("By")} {assignment.author}
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
                {assignment.questionCount} {gettext("questions")}
              </Typography>
            </Tag>
            <Box
              display="flex"
              sx={{ ml: "10px", mr: "10px", width: "102px" }}
            >
              <AssignmentStateIcon state={assignment.distributionState} />
              <Typography variant="h4">
                {assignment.distributionState}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="end" sx={{ width: "118px" }}>
              {assignment.distributionState == "Distributed" ? icon() : null}
            </Box>
          </Box>
        </Box>
      </Card>
      {groups()}
    </Fragment>
  );
}
