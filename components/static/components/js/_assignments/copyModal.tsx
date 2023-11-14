import { h } from "preact";
import { useState } from "preact/hooks";

// Functions
import { get } from "../ajax";
import { assignmentIdentifierValidator } from "../validators";

// MUI components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Local components
import { CancelButton, FormButtonBox } from "../styledComponents";
import { CustomTextField } from "../_reusableComponents/customTextField";
import DialogTitle from "../_reusableComponents/dialog";
import Errors from "../_reusableComponents/errors";

// Types
import { CopyModalProps } from "./types";

export default function DistributeModal({
  gettext,
  handleSubmit,
  open,
  onClose,
  url,
}: CopyModalProps): JSX.Element {
  const [assignmentIdentifier, setAssignmentIdentifier] = useState("");
  const [errors, setErrors] = useState<string[][]>([]);

  const _assignmentIdentifierValidator = async (value: string) => {
    // Validate by regex then check server for uniqueness
    if (assignmentIdentifierValidator(value)) {
      try {
        const valid = await get(`${url}?id=${value}`);
        if (valid["valid"]) {
          setErrors([]);
          return true;
        }
        setErrors([[gettext("Identifier already in use")]]);
        return false;
      } catch (error: any) {
        return false;
      }
    }
    setErrors([
      [
        gettext(
          "Identifiers must be at least 3 characters, no more than 100 characters, and contain only letters, numbers and underscores",
        ),
      ],
    ]);
    return false;
  };

  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={onClose}
      onClick={handleSubmit}
    >
      <DialogTitle onClose={onClose}>
        {gettext("Copy this assignment")}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={"1.5rem"}>
          <Errors errors={errors} />
          <CustomTextField
            gettext={gettext}
            id="identifier"
            title={gettext("Assignment identifier")}
            defaultValue=""
            maxLength={100}
            required={true}
            setValue={(id) => setAssignmentIdentifier(id)}
            sx={{ width: "100%" }}
            validator={_assignmentIdentifierValidator}
            value={assignmentIdentifier}
          />
          <FormButtonBox sx={{ margin: "0px" }}>
            <CancelButton onClick={onClose}>
              <Typography>{gettext("Cancel")}</Typography>
            </CancelButton>
            <Button
              disabled={errors.length != 0 || assignmentIdentifier.length == 0}
              onClick={() => handleSubmit(assignmentIdentifier)}
              variant="contained"
            >
              <Typography>{gettext("Submit")}</Typography>
            </Button>
          </FormButtonBox>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
