import { h } from "preact";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

import { Tag } from "../styledComponent.js";

export const Collection = (props) => {
  const collection = props.collection;
  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          avatar={<Avatar />}
          action={<img src="../static/components/img/logo.gif" height="30" />}
          title={<Typography variant="h3">{collection.title}</Typography>}
          subheader={"From ".concat(collection.autor)}
        />
        <CardContent>
          <Typography color="text.secondary">
            {collection.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            {collection.tags.map((tag) => (
              <Tag key={tag} sx={{ marginRight: "5px" }}>
                <Typography variant="tag"> {tag} </Typography>
              </Tag>
            ))}
            <Tag>
              <BookmarksIcon fontSize="small" sx={{ pr: "6px" }} />
              <Typography variant="tag"> 123 </Typography>
            </Tag>
          </Grid>
          <Box>
            <BookmarkAddOutlinedIcon fontSize="medium" color="primaryBlue" />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};
