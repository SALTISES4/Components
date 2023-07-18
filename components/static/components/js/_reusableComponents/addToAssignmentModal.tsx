import { h } from "preact";
import { useState } from "preact/hooks";

//styles
import { modal as style } from "../_assignments/styles";

//material ui components
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

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
  waiting,
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

        <Stack spacing={3}>
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
            <LoadingButton
              disabled={assignment == ""}
              endIcon={<AddIcon />}
              loadingPosition="end"
              loading={waiting}
              onClick={() => handleSubmit(assignment)}
              sx={{
                " .MuiLoadingButton-loadingIndicatorEnd": { right: "28px" }, // Layout fix
              }}
              variant="contained"
            >
              <Typography>{gettext("Add")}</Typography>
            </LoadingButton>
          </FormButtonBox>
        </Stack>
      </Box>
    </Modal>
  );
}
