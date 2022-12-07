import { h } from "preact";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";

import BarChartIcon from "@mui/icons-material/BarChart";
import CircleIcon from "@mui/icons-material/Circle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

//import saltise from "../theme.js";
import { Tag } from "../styledComponent.js";

export const Question = (props) => {
  const { question } = props;
  // const theme = saltise;
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" sx={{ mb: "5px" }}>
              {question.title}
            </Typography>
            <Box display="flex">
              <Box display="flex" sx={{ mr: "30px" }}>
                <CircleIcon
                  color="primaryGreen"
                  fontSize="medium"
                  sx={{ pl: "10px", pr: "10px" }}
                />
                <Typography variant="h4">{question.difficulty}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h4">Peer Impact</Typography>
              </Box>
            </Box>
          </Box>
          <Typography variant="h6">From {question.autor}</Typography>
          <Typography sx={{ mb: "10px", mt: "20px" }}>
            {question.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            {question.tags.map((tag) => (
              <Tag key={tag} sx={{ marginRight: "5px" }}>
                <Typography variant="tag"> {tag} </Typography>
              </Tag>
            ))}
            <Tag
              sx={{
                bgcolor: "white",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <BarChartIcon fontSize="small" sx={{ pr: "6px" }} />
              <Typography variant="tag"> 123 answers </Typography>
            </Tag>
          </Grid>
          <IconButton sx={{ pl: "12px", pr: "12px" }}>
            <PlaylistAddIcon fontSize="medium" />
          </IconButton>
          <IconButton sx={{ pl: "4px", pr: "12px" }}>
            <VisibilityIcon fontSize="medium" />
          </IconButton>
          <IconButton sx={{ pl: "4px" }}>
            <MoreHorizIcon fontSize="medium" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
