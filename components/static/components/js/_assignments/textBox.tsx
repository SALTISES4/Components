import { h } from "preact";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { TextBoxProps } from "./types";

export const TextBox = ({ title, children }: TextBoxProps) => {
  return (
    <Box display="flex" flexDirection={"column"} sx={{ gap: "5px" }}>
      <Divider sx={{ mt: "30px" }} />
      {title ? <Typography variant="h5">{title}</Typography> : null}
      {children}
    </Box>
  );
};
