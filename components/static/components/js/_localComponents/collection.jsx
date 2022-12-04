import { h } from "preact";

import Card from "@mui/material/Card";
import {
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import saltise from "../theme";
import { Tag } from "../styledComponent.js";
import Box from "@mui/material/Box";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

export const Collection = (props) => {
  const theme = saltise;
  const collection = props.collection;
  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: theme.palette.primaryBlue.main }} />}
          action={<img src="../static/components/img/logo.gif" height="30" />}
          title={<Typography variant="h3">{collection.title}</Typography>}
          subheader={"From ".concat(collection.autor)}
        />
        <CardContent>
          <Typography color="text.secondary">
            {collection.description}
          </Typography>
          <Box display="flex" />
        </CardContent>
        <CardActions>
          <Grid container>
            {collection.tags.map((tag) => (
              <Tag key={tag}>
                <Typography variant="tag"> {tag} </Typography>
              </Tag>
            ))}
            <Tag>
              <BookmarksIcon sx={{ fontSize: 40 }} />
              <Typography variant="tag"> 123 </Typography>
            </Tag>
          </Grid>
          <Box>
            <BookmarkAddOutlinedIcon
              sx={{ fontSize: 40 }}
              color="primaryBlue"
            />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};
