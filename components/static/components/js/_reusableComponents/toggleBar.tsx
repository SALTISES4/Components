import { h } from "preact";
import { styled } from "@mui/material/styles";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LinkIcon from "@mui/icons-material/Link";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box, Typography } from "@mui/material";
import { useState } from "preact/hooks";

//const theme = saltise;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const StyledToggleBar = () => {
  const [formats, setFormats] = useState(() => ["italic"]);

  const handleFormat = (event: MouseEvent, newFormats: string[]) => {
    setFormats(newFormats);
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "secondary1",
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.secondary2.main}`,
          flexWrap: "wrap",
        }}
      >
        <StyledToggleButtonGroup size="small" exclusive aria-label="undo redo">
          <ToggleButton value="undo" aria-label="undo">
            <UndoIcon />
          </ToggleButton>
          <ToggleButton value="redo" aria-label="redo">
            <RedoIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup size="small">
          <ToggleButton value="" aria-label="color">
            <Typography fontSize="20px">X</Typography>
          </ToggleButton>
          <ToggleButton value="" aria-label="color">
            <Typography fontSize="20px">X</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButton value="" aria-label="color">
          <LinkIcon />
        </ToggleButton>
      </Paper>
    </Box>
  );
};
