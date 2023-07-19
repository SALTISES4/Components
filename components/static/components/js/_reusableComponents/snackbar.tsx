import { h } from "preact";
import { createPortal } from "preact/compat";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Snackbar as MUISnackbar } from "@mui/material";
import { SnackbarProps } from "./types";

export const Snackbar = ({ message, open, onClose }: SnackbarProps) => {
  const container = document.querySelector("body");

  const action = () => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
      sx={{ color: "#fff" }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return container
    ? createPortal(
        <MUISnackbar
          action={action()}
          autoHideDuration={6000}
          message={message}
          onClose={onClose}
          open={open}
        />,
        container,
      )
    : null;
};
