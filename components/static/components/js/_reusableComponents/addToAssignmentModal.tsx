import { h } from "preact";
import { useState } from "preact/hooks";

//styles
import { modal as style } from "../_assignments/styles";

//material ui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//components
import { CancelButton, FormButtonBox } from "../styledComponents";

//types
import { AddToAssignmentModalProps } from "./types";

export default function AddToAssignmentModal({
  gettext,
  assignments,
  handleSubmit,
  open,
  onClose,
}: AddToAssignmentModalProps): JSX.Element {
  const [assignment, setAssignment] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h1" sx={{ margin: "0px" }}>
          {gettext("Add to assignment")}
        </Typography>
        <Typography
          fontSize={"16"}
          sx={{ padding: "20px 0px", textAlign: "justify" }}
        >
          {gettext(
            "Select the assignment to which you would like to add this question.",
          )}
        </Typography>

        <Box>
          <FormControl required>
            <InputLabel id="assignment-select">
              {gettext("Assignment")}
            </InputLabel>
            <Select
              labelId="assignment-select"
              value={assignment}
              label={`${gettext("Assignment")}*`}
              onChange={(event: SelectChangeEvent) => {
                if (event.target) {
                  setAssignment((event.target as HTMLInputElement).value);
                }
              }}
            >
              {assignments.map((a, i) => (
                <MenuItem key={i} value={a.pk}>
                  {a.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {gettext(
                "You can only add questions to assignments that have not been distributed yet.",
              )}
            </FormHelperText>
          </FormControl>

          <FormButtonBox sx={{ margin: "0px" }}>
            <CancelButton onClick={onClose}>
              <Typography>{gettext("Cancel")}</Typography>
            </CancelButton>
            <Button
              disabled={assignment == ""}
              onClick={() => handleSubmit(assignment)}
              variant="contained"
            >
              <Typography>{gettext("Add to assignment")}</Typography>
            </Button>
          </FormButtonBox>
        </Box>
      </Box>
    </Modal>
  );
}
