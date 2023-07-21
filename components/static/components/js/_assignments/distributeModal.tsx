import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

//functions
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { titlecase } from "../functions";

//styles
import { modal as style } from "./styles";

//material ui components
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ShareIcon from "@mui/icons-material/Share";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CancelButton, FormButtonBox } from "../styledComponents";

//types
import { DistributeModalProps } from "./types";

export default function DistributeModal({
  gettext,
  errors,
  groups,
  handleSubmit,
  open,
  onClose,
  waiting,
}: DistributeModalProps): JSX.Element {
  const [dueDate, setDueDate] = useState(dayjs().add(7, "day"));
  const [errorsOpen, setErrorsOpen] = useState<boolean[]>([]);
  const [group, setGroup] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);

  useEffect(() => {
    setErrorsOpen(errors.map(() => true));
  }, [errors]);

  const closeError = (index: number) => {
    const _errorsOpen = [...errorsOpen];
    _errorsOpen[index] = false;
    setErrorsOpen(_errorsOpen);
  };

  dayjs.extend(utc);

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
          {errors.map((e, i) => (
            <Collapse key={i} in={errorsOpen[i]}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="error"
                    onClick={() => closeError(i)}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              >
                {titlecase(e[0])}
              </Alert>
            </Collapse>
          ))}
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
              desktopModeMediaQuery="@media (pointer: fine) and (min-height: 750px) and (min-width: 500px)"
              disablePast={true}
              id="due-date-and-time-picker"
              label={`${gettext("Due date and time")}*`}
              onChange={(newDateTime: Dayjs) => setDueDate(newDateTime)}
              required={true}
              timeSteps={{ hours: 1, minutes: 15 }}
              sx={{ width: "100%" }}
              value={dueDate}
            />
          </LocalizationProvider>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={gettext("Show correct answers")}
              onChange={() => setShowCorrectAnswers(!showCorrectAnswers)}
            />
          </FormGroup>

          <FormButtonBox sx={{ margin: "0px" }}>
            <CancelButton onClick={onClose}>
              <Typography>{gettext("Cancel")}</Typography>
            </CancelButton>
            <LoadingButton
              disabled={group == "" || dueDate < dayjs()}
              loadingPosition="end"
              onClick={() =>
                handleSubmit(
                  {
                    due_date: dueDate.utc().format(), // Convert to UTC!
                    group_pk: parseInt(group),
                    show_correct_answers: showCorrectAnswers,
                  },
                  onClose,
                )
              }
              loading={waiting}
              endIcon={<ShareIcon />}
              sx={{
                " .MuiLoadingButton-loadingIndicatorEnd": { right: "28px" }, // Layout fix
              }}
              variant="contained"
            >
              <Typography tag={"span"}>{gettext("Distribute")}</Typography>
            </LoadingButton>
          </FormButtonBox>
        </Stack>
      </Box>
    </Modal>
  );
}
