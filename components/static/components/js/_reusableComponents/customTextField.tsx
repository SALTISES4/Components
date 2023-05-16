import { Box, SvgIcon, TextField, Typography } from "@mui/material";
import { h } from "preact";
import { CustomTextFieldProps } from "./types";
import { formTheme } from "../theme";

export const CustomTextField = ({
  gettext,
  autoFocus = false,
  id,
  title,
  defaultValue,
  error = false,
  helperText,
  icon,
  minLength = 0,
  maxLength,
  required = true,
  setValue,
  value,
}: CustomTextFieldProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <Typography fontSize={"12px"} sx={{ marginLeft: "14px" }}>
          {title}
        </Typography>
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
        autoFocus={autoFocus}
        id={id}
        required={required}
        defaultValue={defaultValue}
        error={error}
        inputProps={{ minLength, maxLength }}
        value={value}
        variant="outlined"
        helperText={`${helperText || ""}  ${
          value.length
        }/${maxLength} ${gettext("characters")}.`}
        onChange={(evt: Event) => {
          if (evt.target && evt.target instanceof HTMLInputElement) {
            setValue(evt.target.value);
          }
        }}
      />
    </Box>
  );
};
