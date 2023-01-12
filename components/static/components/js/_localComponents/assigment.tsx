import { Fragment, h } from "preact";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Group } from "../_localComponents/group";
import { AssigmentStateIcon } from "../_reusableComponents/assigmentStateIcon";

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
            <Typography variant="caption">
              {gettext("By")} {assignment.author}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
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
            </Box>
            <Box display="flex" sx={{ width: "190px" }}>
              <AssigmentStateIcon state={assignment.distributionState} />
              <Typography variant="h4">
                {assignment.distributionState}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: "24px" }}>
              {assignment.distributionState == "Distributed" ? (
                <IconButton size="medium">
                  <AddIcon fontSize="medium" />
                </IconButton>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Card>
      {assignment.groups.map((group) => (
        <Group key={group.title} group={group} />
      ))}
    </Fragment>
  );
}
