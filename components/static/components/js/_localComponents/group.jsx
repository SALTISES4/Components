import { h } from "preact";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
//import IconButton from "@mui/material/IconButton";
//import Button from "@mui/material/Button";
import { Tag } from "../styledComponent.js";
import styled from "@mui/system/styled";
import saltise from "../theme";
import AlarmIcon from "@mui/icons-material/Alarm";

const CircularBox = styled("div")({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  backgroundColor: saltise.palette.paleOrange.main,
  background: saltise.palette.paleOrange.main,
  width: "20px",
  height: "20px",
  margin: "10px",
});

import CircularProgress from "@mui/material/CircularProgress";

//import { CircularProgressWithLabel } from "../reusableComponents/circularProgressWithLabel.jsx";

export const Group = (props) => {
  const theme = saltise;
  const { group } = props;
  const progress = 32.4;
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h3">{group.title}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Tag
              sx={{
                mr: "10px",
                color: theme.palette.primaryRed.main,
                backgroundColor: theme.palette.paleRed.main,
              }}
            >
              <AlarmIcon />
              <Typography variant="tag"> Due un five days </Typography>
            </Tag>
            <Box display="flex" alignItems="center">
              <CircularBox>
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size="20px"
                  color="primaryOrange"
                />
              </CircularBox>
              <Typography> {progress}% completed</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
/*   <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={assigment.image}
            alt={assigment.imageLabel}
          />
       */
