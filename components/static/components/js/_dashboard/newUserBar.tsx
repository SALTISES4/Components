import { h } from "preact";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { NewUserBarProps } from "./types";

const style = {
  backgroundColor: "background.paper",
  color: "secondary4.main",
  borderRadius: "10px",
  padding: "30px 50px 28px 50px",
};

export const NewUserBar = ({ gettext }: NewUserBarProps) => {
  return (
    <Box sx={style}>
      <Typography fontSize="26px" margin="15px">
        {gettext("We're glad to have you!")}
      </Typography>
      <Typography fontSize="16px" margin="5px">
        {gettext(
          "Get started by browsing our infinite database of quality question.",
        )}
      </Typography>
      <Button variant="contained" color="primaryBlue" sx={{ margin: "15px" }}>
        <Typography>{gettext("Explore our database")}</Typography>
      </Button>
    </Box>
  );
};
