import { h } from "preact";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ChatIcon from "@mui/icons-material/Chat";

import { Tag } from "../styledComponents";
import { CollectionProps } from "./types";

export function Collection({
  gettext,
  logo,
  collection,
}: CollectionProps): JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        action={<img src={logo} height="30" />}
        title={collection.title}
        subheader={gettext("From ".concat(collection.author))}
      />
      <CardContent>
        <Typography>{collection.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          {collection.tags?.map((tag) => (
            <Tag key={tag}>
              <Typography> {tag} </Typography>
            </Tag>
          ))}
          <Tag>
            <ChatIcon fontSize="small" />
            <Typography>{collection.answerCount}</Typography>
          </Tag>
        </Stack>
        <Checkbox
          icon={<BookmarkAddOutlinedIcon />}
          checkedIcon={<BookmarkAddedIcon />}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />
      </CardActions>
    </Card>
  );
}
