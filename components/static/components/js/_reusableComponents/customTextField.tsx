import { Box, SvgIcon, TextField, Typography } from "@mui/material";
import { h } from "preact";
import { CustomTextFieldProps } from "./types";
import { formTheme } from "../theme";

export const CustomTextField = ({
  id,
  title,
  defaultValue,
  helperText,
  icon,
}: CustomTextFieldProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <Typography sx={{ marginLeft: "14px" }}>{title}</Typography>
        <SvgIcon
          sx={{
            position: "relative",
            color: formTheme.palette.primary.main,
            fontSize: "14px",
          }}
          component={icon}
        />
      </Box>
      <TextField
        id={id}
        required
        defaultValue={defaultValue}
        variant="outlined"
        helperText={helperText}
      />
    </Box>
  );
};
