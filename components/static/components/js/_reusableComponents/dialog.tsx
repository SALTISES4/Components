import { h } from "preact";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MUIDialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";

export default function DialogTitle({
  children,
  onClose,
  ...props
}: DialogTitleProps) {
  return (
    <MUIDialogTitle {...props}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size={"small"}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MUIDialogTitle>
  );
}
