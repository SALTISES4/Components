import { h } from "preact";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { TextBoxProps } from "./types";

export const TextBox = ({ title, text }: TextBoxProps) => {
  return (
    <Box display="flex" flexDirection={"column"} sx={{ gap: "5px" }}>
      <Divider sx={{ mt: "30px" }} />
      <Typography variant="h5">{title}</Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};
