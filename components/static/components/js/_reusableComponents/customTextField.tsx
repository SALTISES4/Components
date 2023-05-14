import { Box, SvgIcon, TextField, Typography } from "@mui/material";
import { h } from "preact";
import { CustomTextFieldProps } from "./types";
import { formTheme } from "../theme";

export const CustomTextField = ({
  gettext,
  id,
  title,
  defaultValue,
  helperText,
  icon,
  maxLength,
  required = true,
  setValue,
  value,
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
        required={required}
        defaultValue={defaultValue}
        value={value}
        variant="outlined"
        helperText={`${helperText || ""}  ${
          value.length
        }/${maxLength} ${gettext("characters")}.`}
        onChange={(evt: Event) => {
          if (evt.target && evt.target instanceof HTMLInputElement) {
            setValue(evt.target.value.slice(0, maxLength));
          }
        }}
      />
    </Box>
  );
};
