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
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import { Tag } from "../styledComponents";

export const Collection = (props) => {
  const collection = props.collection;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        action={<img src="../static/components/img/logo.gif" height="30" />}
        title={collection.title}
        subheader={"From ".concat(collection.autor)}
      />
      <CardContent>
        <Typography color="text.secondary">
          {collection.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          {collection.tags.map((tag) => (
            <Tag key={tag}>
              <Typography variant="tag"> {tag} </Typography>
            </Tag>
          ))}
          <Tag>
            <BookmarksIcon fontSize="small" sx={{ pr: "6px" }} />
            <Typography variant="tag"> 123 </Typography>
          </Tag>
        </Stack>
        <Checkbox
          icon={<BookmarkAddOutlinedIcon />}
          checkedIcon={<BookmarkAddedIcon />}
          sx={{
            color: "primaryBlue.main",
            "&.Mui-checked": {
              color: "primaryBlue.main",
            },
          }}
        />
      </CardActions>
    </Card>
  );
};
