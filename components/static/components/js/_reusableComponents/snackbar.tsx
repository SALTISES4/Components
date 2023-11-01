import { h } from "preact";

// Styles
import { useTheme } from "@mui/material/styles";

// Mui components
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Snackbar as MUISnackbar } from "@mui/material";
import { SnackbarProps } from "./types";

export const Snackbar = ({
  message,
  open,
  onClose,
  severity,
}: SnackbarProps) => {
  const theme = useTheme();

  const action = () => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  if (severity) {
    return (
      <MUISnackbar autoHideDuration={6000} onClose={onClose} open={open}>
        <Alert
          action={action()}
          onClose={onClose}
          elevation={6}
          severity={severity}
          sx={{ alignItems: "center" }}
        >
          {message}
        </Alert>
      </MUISnackbar>
    );
  }
  return (
    <MUISnackbar
      action={action()}
      autoHideDuration={6000}
      message={message}
      onClose={onClose}
      open={open}
      sx={{
        " .MuiPaper-root": {
          backgroundColor: theme.palette.primary5.main,
        },
      }}
    />
  );
};
