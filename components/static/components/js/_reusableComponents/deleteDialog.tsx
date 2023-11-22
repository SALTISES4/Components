import { h } from "preact";

// MUI components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Local components
import { CancelButton, DeleteButton } from "../styledComponents";
import DialogTitle from "./dialog";
import Errors from "./errors";

// Types
import { DeleteDialogProps } from "./types";

export default function DeleteDialog({
  errors,
  gettext,
  handleDelete,
  message,
  onClose,
  open,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle onClose={onClose}>{gettext("Confirm delete")}</DialogTitle>

      <DialogContent>
        <Stack spacing={1}>
          {errors ? <Errors errors={errors} /> : null}
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </Stack>
        <DialogActions sx={{ padding: "24px 0px 0px" }}>
          <CancelButton onClick={onClose}>
            <Typography>{gettext("Cancel")}</Typography>
          </CancelButton>
          <DeleteButton onClick={handleDelete}>
            <Typography>{gettext("Yes, I'm sure")}</Typography>
          </DeleteButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
