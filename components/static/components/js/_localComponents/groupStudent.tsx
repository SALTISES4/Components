import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Tag } from "../styledComponents";
import CircleIcon from "@mui/icons-material/Circle";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import CardHeader from "@mui/material/CardHeader";

import { GroupStudentProps } from "./types";

export function GroupStudent({
  gettext,
  group,
}: GroupStudentProps): JSX.Element {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <CardHeader
          title={group.title}
          subheader={"From ".concat(group.author)}
        />
        <Box paddingTop="4px" display="flex">
          <CircleIcon
            color="success"
            sx={{ padding: "0px 10px", fontSize: "20px" }}
          />
          <Typography>{gettext("Active")}</Typography>
        </Box>
      </Box>
      <CardActions sx={{ justifyContent: "space-between", mt: "10px" }}>
        <Stack direction="row" spacing="5px">
          {group.tags.map((tag) => (
            <Tag key={tag}>
              <Typography> {tag} </Typography>
            </Tag>
          ))}
          <Tag>
            <LibraryBooksIcon fontSize="small" />
            <Typography> ? {gettext("assignments")} </Typography>
          </Tag>
        </Stack>
      </CardActions>
    </Card>
  );
}
