import { Component, createRef, h } from "preact";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

import saltise from "../theme";
import { Tag } from "../styledComponents";
import { CollectionProps } from "./types";

const theme = saltise;

export class Collection extends Component<CollectionProps> {
  ref = createRef();

  componentDidMount(): void {
    if (this.ref.current) {
      this.props.getHeight(this.ref.current.getBoundingClientRect().height);
    }
  }

  bookmarkIcon = () => {
    if (
      this.props.collection.followed_by_user !== undefined &&
      this.props.collection.follow_url !== undefined
    ) {
      return (
        <Checkbox
          checked={this.props.collection.followed_by_user}
          icon={<BookmarkAddOutlinedIcon />}
          checkedIcon={<BookmarkAddedIcon />}
          onChange={this.props.toggleBookmarked}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />
      );
    }
  };

  render() {
    return (
      <Card>
        <CardHeader
          avatar={<Avatar />}
          action={() =>
            this.props.collection.featured ? (
              <img src={this.props.logo} height="30" />
            ) : (
              ""
            )
          }
          onClick={() => (window.location.href = this.props.collection.url)}
          title={this.props.collection.title}
          subheader={this.props.gettext(
            "From ".concat(this.props.collection.author),
          )}
          sx={{ cursor: "pointer" }}
        />
        <CardContent ref={this.ref} sx={{ minHeight: this.props.minHeight }}>
          <Typography>{this.props.collection.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing="5px">
            <Tag sx={{ backgroundColor: theme.palette.primary1.main }}>
              <Typography>
                {this.props.collection.discipline?.title}
              </Typography>
            </Tag>
            <Tag
              sx={{
                bgcolor: "white",
                borderStyle: "solid",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              <BarChartIcon fontSize="small" />
              <Typography>
                {this.props.collection.answerCount}{" "}
                {this.props.collection.answerCount == 1
                  ? this.props.gettext("answer")
                  : this.props.gettext("answers")}
              </Typography>
            </Tag>
          </Stack>
          {this.bookmarkIcon()}
        </CardActions>
      </Card>
    );
  }
}
