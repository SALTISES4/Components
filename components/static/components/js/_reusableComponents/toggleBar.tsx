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
    color: theme.palette.secondary4.main,
    "&.Mui-selected": {
      color: theme.palette.secondary4.main,
    },
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: "3px",
    },
    "&:first-of-type": {
      borderRadius: "3px",
    },
  },
}));

const StyleDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(0.5),
  border: 0,
  color: theme.palette.secondary4.main,
  "&.Mui-selected": {
    color: theme.palette.secondary4.main,
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
          backgroundColor: "secondary1.main",
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.secondary2.main}`,
          flexWrap: "wrap",
          borderRadius: "3px 3px 0px 0px",
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
        <Divider flexItem />
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
            <Typography
              sx={{ fontSize: "16px !important", fontWeight: "600" }}
            >
              X<sup>2</sup>
            </Typography>
          </ToggleButton>
          <ToggleButton value="" aria-label="color">
            <Typography
              sx={{ fontSize: "16px !important", fontWeight: "600" }}
            >
              X<sub>2</sub>
            </Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup>
          <ToggleButton value="" aria-label="color">
            <LinkIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Box>
  );
};
