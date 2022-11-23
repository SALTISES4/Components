import { h } from "preact";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Box } from "@mui/system";
//import Button from "@mui/material/Button";
import { Tag } from "../styledComponent.js";
import CircleIcon from "@mui/icons-material/Circle";
import BarChartIcon from "@mui/icons-material/BarChart";
import saltise from "../theme.js";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Question = (props) => {
  const { question } = props;
  const theme = saltise;
  return (
    <Grid item xs={12} md={12}>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h3" sx={{ mb: "5px" }}>
                {question.title}
              </Typography>
              <Typography variant="h6">From {question.autor}</Typography>
            </Box>
            <Box display="flex">
              <Box display="flex" sx={{ mr: "30px" }}>
                <CircleIcon color="primaryGreen" width="20px" />
                <Typography variant="h4">{question.difficulty}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h4">Peer Impact</Typography>
              </Box>
            </Box>
          </Box>
          <Typography>{question.description}</Typography>
        </CardContent>
        <CardActions>
          <Grid container>
            {question.tags.map((tag) => (
              <Tag key={tag}>
                <Typography variant="tag"> {tag} </Typography>
              </Tag>
            ))}
            <Tag
              sx={{
                bgcolor: "white",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: theme.palette.secondary4.main,
              }}
            >
              <BarChartIcon />
              <Typography variant="tag"> 123 answers </Typography>
            </Tag>
          </Grid>
          <IconButton color="primaryBlue">
            <PlaylistAddIcon sx={{ height: "20px" }} />
          </IconButton>
          <IconButton color="primaryBlue">
            <VisibilityIcon sx={{ height: "20px" }} />
          </IconButton>
          <IconButton color="primaryBlue">
            <MoreHorizIcon sx={{ height: "20px" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
