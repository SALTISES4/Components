import { Box, TextField, Typography } from "@mui/material";
import { h } from "preact";
import { styled } from "@mui/material/styles";
import { StyledToggleBar } from "./toggleBar";

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
  gettext,
}: {
  id: string;
  title: string;
  rows: number;
  defaultValue: string;
  gettext: (a: string) => string;
}) => {
  return (
    <Box>
      <Typography sx={{ marginLeft: "14px" }}>{gettext(title)}</Typography>
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
