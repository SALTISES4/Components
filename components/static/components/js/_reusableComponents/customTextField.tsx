import { h } from "preact";
import { useState } from "preact/hooks";

//components
import { Box, SvgIcon, TextField, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

//types
import { CustomTextFieldProps } from "./types";

//style
import { formTheme } from "../theme";

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
        <Typography sx={{ marginBottom: "2px", marginLeft: "14px" }}>
          {title}
        </Typography>
        {icon && tooltip.length > 0 ? (
          <Tooltip
            arrow
            title={tooltip}
            TransitionComponent={Zoom}
            placement="right"
          >
            <SvgIcon
              sx={{
                position: "relative",
                color: formTheme.palette.primary.main,
                fontSize: "14px",
              }}
              component={icon}
            />
          </Tooltip>
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
