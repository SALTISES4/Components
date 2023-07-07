import { h } from "preact";

import DOMPurify from "dompurify";

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

export const HTMLTextBox = ({ title, text }: TextBoxProps) => {
  const sanitizedText = DOMPurify.sanitize(text, {
    USE_PROFILES: { html: true },
  });

  return (
    <Box display="flex" flexDirection={"column"} sx={{ gap: "5px" }}>
      <Divider sx={{ mt: "30px" }} />
      <Typography variant="h5">{title}</Typography>
      <Typography
        dangerouslySetInnerHTML={{ __html: sanitizedText }}
        sx={{ "p:first-of-type": { marginTop: "0px" } }}
      />
    </Box>
  );
};
