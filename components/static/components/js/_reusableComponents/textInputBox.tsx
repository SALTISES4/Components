import { Box, TextField, Typography } from "@mui/material";
import { h } from "preact";
import { styled } from "@mui/material/styles";
import { StyledToggleBar } from "./toggleBar";
import { TextInputBoxProps } from "./types";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "0px 0px 4px 4px",
  },
}));

export const TextInputBox = ({
  id,
  title,
  rows,
  defaultValue,
}: TextInputBoxProps) => {
  return (
    <Box>
      <Typography sx={{ marginLeft: "14px" }}>{title}</Typography>
      <StyledToggleBar />
      <StyledTextField
        required
        id={id}
        defaultValue={defaultValue}
        multiline
        rows={rows}
      />
    </Box>
  );
};
