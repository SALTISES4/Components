import { h } from "preact";
import AlarmIcon from "@mui/icons-material/Alarm";
import saltise from "../theme";
import { Tag } from "../styledComponents";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const theme = saltise;

const daysDiff = (date) => {
  const currentDate = new Date();
  // (YYYY-MM-DD)
  const dueDate = new Date(date);
  const millisBetween = dueDate.getTime() - currentDate.getTime();
  const days = millisBetween / (1000 * 3600 * 24);
  return Math.round(Math.abs(days));
};

export const DueInTag = (props) => {
  const daysDifference = daysDiff(props.dueDate);
  return (
    <Box>
      {daysDifference < 5 ? (
        <Tag
          sx={{
            mr: "10px",
            color: theme.palette.red.main,
            backgroundColor: theme.palette.paleRed.main,
          }}
        >
          <AlarmIcon fontSize="small" sx={{ pr: "6px" }} />
          <Typography variant="tag"> Due un {daysDifference} days </Typography>
        </Tag>
      ) : null}
    </Box>
  );
};
