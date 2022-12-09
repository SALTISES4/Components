import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import AlarmIcon from "@mui/icons-material/Alarm";

import saltise from "../theme";
import { Tag, CircularBox } from "../styledComponent.js";

import CircularProgress from "@mui/material/CircularProgress";

export const Group = (props) => {
  const theme = saltise;
  const { group } = props;
  const progress = 32.4;
  return (
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
            <AlarmIcon fontSize="small" sx={{ pr: "6px" }} />
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
  );
};
/*   <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={assigment.image}
            alt={assigment.imageLabel}
          />
       */
