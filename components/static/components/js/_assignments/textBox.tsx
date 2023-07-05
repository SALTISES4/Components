import { Box, Divider, Typography } from "@mui/material";
import { h } from "preact";
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
