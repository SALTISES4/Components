import { h } from "preact";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  background: "linear-gradient(white, transparent)",
  color: "secondary4.main",
  borderRadius: "10px",
  padding: "30px 50px 28px 50px",
  height: "230px",
};

export const InvitedUserBar = (props) => {
  return (
    <Box sx={style}>
      <Typography fontSize="26px" margin="15px">
        We're glad to have you!
      </Typography>
      <Typography fontSize="16px" margin="5px">
        Discover the content your colleagues have shared with you
      </Typography>
    </Box>
  );
};
