import { h } from "preact";
import { useState } from "preact/hooks";

//mui components
import { Box, TextField, Typography } from "@mui/material";

//components
import Tooltip from "./tooltip";

//types
import { CustomTextFieldProps } from "./types";

export const CustomTextField = ({
  gettext,
  autoFocus = false,
  id,
  title,
  defaultValue,
  helperText,
  icon,
  minLength = 0,
  maxLength,
  required = true,
  setValue,
  tooltip = "",
  validator = () => true,
  value,
  sx = {},
}: CustomTextFieldProps) => {
  const [error, setError] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
      >
        {title ? (
          <Typography variant="h5" sx={{ mb: "2px" }}>
            {title}
          </Typography>
        ) : null}
        {icon && tooltip.length > 0 ? (
          <Tooltip icon={icon} title={tooltip} />
        ) : null}
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
        }/${maxLength} ${gettext("characters")}`}
        onChange={(evt: Event) => {
          if (evt.target && evt.target instanceof HTMLInputElement) {
            setValue(evt.target.value);
            setError(!validator(evt.target.value));
          }
        }}
        sx={sx}
      />
    </Box>
  );
};
