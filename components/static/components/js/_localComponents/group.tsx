import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { DueInTag } from "../_reusableComponents/dueInTag";
import { CircleProgressIcon } from "../_reusableComponents/circularProgressIcon";

import { GroupProps } from "./types";

export function Group({ gettext, group }: GroupProps): JSX.Element {
  return (
    <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h3"> {group.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <DueInTag dueDate={group.dueDate} gettext={gettext} />
          <Box display="flex" alignItems="center">
            <CircleProgressIcon progress={group.progress} />
            <Typography>{gettext(`${group.progress}% completed`)}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
