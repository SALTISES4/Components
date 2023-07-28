import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import { purifyText } from "../functions";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

import { StudentGroupAssignment } from "./group";
import { AssignmentStateIcon } from "../_reusableComponents/assignmentStateIcon";

import { Tag } from "../styledComponents";

import {
  StudentGroupsAssignmentProps,
  StudentGroupAssignmentType,
} from "./types";

export function StudentGroupsAssignment({
  gettext,
  studentgroupsassignment,
}: StudentGroupsAssignmentProps): JSX.Element {
  /*
  List of assignments with associate groups displayed below
  */
  const [{ open }, setOpen] = useState<{
    open: boolean;
  }>({ open: false });

  const handleClick = (evt: MouseEvent) => {
    evt.stopPropagation();
    setOpen((prevState) => ({
      open: !prevState.open,
    }));
  };

  const handleView = () => {
    if (studentgroupsassignment.assignment.urls?.update) {
      window.location.assign(studentgroupsassignment.assignment.urls.update);
    } else if (studentgroupsassignment.assignment.urls?.view) {
      window.location.assign(studentgroupsassignment.assignment.urls.view);
    }
  };

  const groups = () => {
    if (open) {
      return studentgroupsassignment.groups.map(
        (sga: StudentGroupAssignmentType, i: number) => (
          <StudentGroupAssignment
            key={i}
            gettext={gettext}
            studentgroupassignment={sga}
          />
        ),
      );
    }
  };

  const icon = () => {
    if (open) {
      return (
        <IconButton
          color="primary"
          size="medium"
          title={gettext("Hide groups")}
        >
          <RemoveIcon fontSize="medium" onClick={handleClick} />
        </IconButton>
      );
    }
    return (
      <IconButton color="primary" size="medium" title={gettext("Show groups")}>
        <AddIcon fontSize="medium" onClick={handleClick} />
      </IconButton>
    );
  };

  return (
    <Fragment>
      <Card>
        <CardActionArea
          disableRipple={true}
          onClick={handleView}
          title={gettext("View assignment")}
        >
          {" "}
          <CardContent sx={{ padding: "10px 20px" }}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  variant="h5"
                  dangerouslySetInnerHTML={{
                    __html: purifyText(studentgroupsassignment.title),
                  }}
                />
                <Typography variant="subtitle1">
                  {gettext("By")} {studentgroupsassignment.author}
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
                    {studentgroupsassignment.questionCount}{" "}
                    {studentgroupsassignment.questionCount == 1
                      ? gettext("question")
                      : gettext("questions")}
                  </Typography>
                </Tag>
                <Box
                  display="flex"
                  sx={{ ml: "10px", mr: "10px", width: "102px" }}
                >
                  <AssignmentStateIcon
                    state={studentgroupsassignment.distributionState}
                  />
                  <Typography variant="body2">
                    {studentgroupsassignment.distributionState}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  sx={{ width: "82px" }}
                >
                  {studentgroupsassignment.distributionState == "Distributed"
                    ? icon()
                    : null}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      {groups()}
    </Fragment>
  );
}
