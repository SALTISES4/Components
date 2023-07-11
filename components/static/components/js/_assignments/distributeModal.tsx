import { h } from "preact";
import { useState } from "preact/hooks";

//styles
import { modal as style } from "./styles";

//material ui components
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//components
import {
  CancelButton,
  FormButtonBox,
  ValidateButton,
} from "../styledComponents";

//types
import { DistributeModalProps } from "./types";

export default function DistributeModal({
  gettext,
  groups,
  open,
  onClose,
}: DistributeModalProps): JSX.Element {
  const [group, setGroup] = useState("");
  const [datetime, setDateTime] = useState(dayjs());

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h1" sx={{ margin: "0px" }}>
          {gettext("Distribute to group")}
        </Typography>
        <Typography
          fontSize={"16"}
          sx={{ padding: "20px 0px", textAlign: "justify" }}
        >
          {gettext(
            "Select one of your current groups and specify a due date (the due date can be changed later). Upon clicking submit, your students will receive an e-mail with a link to the assignment.",
          )}
        </Typography>

        <Stack spacing={3}>
          <FormControl required>
            <InputLabel id="group-select">{gettext("Group")}</InputLabel>
            <Select
              labelId="group-select"
              value={group}
              label={`${gettext("Group")}*`}
              onChange={(event: SelectChangeEvent) => {
                if (event.target) {
                  setGroup((event.target as HTMLInputElement).value);
                }
              }}
            >
              {groups.map((g, i) => (
                <MenuItem key={i} value={g.pk}>
                  {g.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {gettext(
                "You can only distribute assignments to groups created from within myDALITE, or using the LTI-Standalone launch URL in your LMS. To distribute one question at a time to your students via an LMS (like Moodle), use the “Distribute via LMS” option.",
              )}
            </FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disablePast={true}
              id="due-date-and-time-picker"
              label={`${gettext("Due date and time")}*`}
              onChange={(newDateTime: Dayjs) => setDateTime(newDateTime)}
              required={true}
              timeSteps={{ hours: 1, minutes: 15 }}
              sx={{ width: "100%" }}
              value={datetime}
            />
          </LocalizationProvider>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={gettext("Show correct answers")}
            />
          </FormGroup>

          <FormButtonBox sx={{ margin: "0px" }}>
            <CancelButton onClick={onClose}>
              <Typography>{gettext("Cancel")}</Typography>
            </CancelButton>
            <ValidateButton
              disabled={group == "" || datetime < dayjs()}
              variant="contained"
            >
              <Typography>{gettext("Share")}</Typography>
            </ValidateButton>
          </FormButtonBox>
        </Stack>
      </Box>
    </Modal>
  );
}