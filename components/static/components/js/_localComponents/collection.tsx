import { h } from "preact";

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

export function Collection({
  gettext,
  logo,
  collection,
}: CollectionProps): JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        action={() =>
          collection.featured ? <img src={logo} height="30" /> : ""
        }
        onClick={() => (window.location.href = collection.url)}
        title={collection.title}
        subheader={gettext("From ".concat(collection.author))}
        sx={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography>{collection.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Stack direction="row" spacing="5px">
          <Tag sx={{ backgroundColor: theme.palette.primary1.main }}>
            <Typography>{collection.discipline?.title}</Typography>
          </Tag>
          {collection.tags?.map((tag) => (
            <Tag key={tag}>
              <Typography> {tag} </Typography>
            </Tag>
          ))}
          <Tag
            sx={{
              bgcolor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
              paddingTop: "3px",
              paddingBottom: "3px",
            }}
          >
            <BarChartIcon fontSize="small" />
            <Typography>
              {collection.answerCount}{" "}
              {collection.answerCount == 1
                ? gettext("answer")
                : gettext("answers")}
            </Typography>
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
