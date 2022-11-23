import { h } from "preact";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
//import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Tag } from "../styledComponent.js";
import CircleIcon from "@mui/icons-material/Circle";

export const Assigment = (props) => {
  const { assigment } = props;

  return (
    <Grid item xs={12} md={12}>
      <Card>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h3">{assigment.title}</Typography>
            <Typography variant="h6">From {assigment.autor}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Tag sx={{ mr: "15px", ml: "15px" }}>
              <FormatListBulletedIcon />
              <Typography variant="tag">
                {assigment.questions.length} questions
              </Typography>
            </Tag>
            <CircleIcon color="primaryGreen" sx={{ height: "20px" }} />
            <Typography variant="h4" sx={{ ml: "4px" }}>
              {assigment.DistributionState}
            </Typography>
            <IconButton color="primaryBlue" sx={{ ml: "80px" }}>
              <AddIcon fontSize="20px" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
