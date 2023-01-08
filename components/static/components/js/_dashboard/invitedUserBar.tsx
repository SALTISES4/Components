import { h } from "preact";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { InvitedUserBarProps } from "./types";

const style = {
  background: "linear-gradient(white, transparent)",
  color: "secondary4.main",
  borderRadius: "10px",
  padding: "30px 50px 28px 50px",
  height: "230px",
};

export const InvitedUserBar = ({ gettext }: InvitedUserBarProps) => {
  return (
    <Box sx={style}>
      <Typography fontSize="26px" margin="15px">
        {gettext("We're glad to have you!")}
      </Typography>
      <Typography fontSize="16px" margin="5px">
        {gettext(
          "Discover the content your colleagues have shared with you...",
        )}
      </Typography>
    </Box>
  );
};
