import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

//functions
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

//styles
import { modal as style } from "./styles";

//material ui components
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
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
import { CopyBox } from "../_reusableComponents/clipboard";
import Errors from "../_reusableComponents/errors";

//types
import { DistributeModalProps } from "./types";
import { QuestionType } from "../_localComponents/types";

export default function DistributeModal({
  gettext,
  assignment,
  errors,
  groups,
  handleSubmit,
  lti,
  method,
  onClose,
  waiting,
}: DistributeModalProps): JSX.Element {
  const [dueDate, setDueDate] = useState(dayjs().add(7, "day"));
  const [group, setGroup] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);

  dayjs.extend(utc);

  const ltiDialog = (): JSX.Element | undefined => {
    if (assignment?.questions && assignment.questions.length > 0) {
      return (
        <Fragment>
          <Typography variant="h1" sx={{ margin: "0px" }}>
            {gettext("Distribute via LMS")}
          </Typography>
          <Typography sx={{ padding: "20px 0px" }}>
            {gettext(
              "Use the following information to configure the LTI tool in " +
                "your Learning Management System (e.g. Moodle, OpenEdx).",
            )}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography tag="div" variant={"body2"}>
                {gettext("LTI launch URL")}
              </Typography>
              <CopyBox gettext={gettext}>
                <Typography color="primary">{lti.launchURL}</Typography>
              </CopyBox>
            </Grid>
            <Grid item xs={6}>
              <Typography tag="div" variant={"body2"}>
                {gettext("LTI consumer key")}
              </Typography>
              <CopyBox gettext={gettext}>
                <Typography color="primary">{lti.consumerKey}</Typography>
              </CopyBox>
            </Grid>
            <Grid item xs={6}>
              <Typography tag="div" variant={"body2"}>
                {gettext("LTI shared secret")}
              </Typography>
              <CopyBox gettext={gettext}>
                <Typography color="primary">{lti.sharedSecret}</Typography>
              </CopyBox>
            </Grid>
          </Grid>
          <Typography sx={{ padding: "20px 0px" }}>
            {gettext(
              "To import assignment questions, copy and paste the text " +
                "below the question title into the Custom Parameters box " +
                "of your LTI tool:",
            )}
          </Typography>
          <Stack spacing={2}>
            {assignment.questions
              .map((q: { question: QuestionType }) => q.question)
              .map((q: QuestionType, i: number): JSX.Element => {
                return (
                  <CopyBox
                    key={i}
                    gettext={gettext}
                    text={`assignment_id=${assignment.pk}\nquestion_id=${q.pk}\nteacher_id=${lti.teacherHash}`}
                  >
                    <Typography color="primary">
                      Q{i + 1}. {q.title}
                    </Typography>
                  </CopyBox>
                );
              })}
          </Stack>
        </Fragment>
      );
    }
  };

  const myDaliteDialog = (): JSX.Element | undefined => {
    return (
      <Fragment>
        <Typography variant="h1" sx={{ margin: "0px" }}>
          {gettext("Distribute via myDalite")}
        </Typography>
        <Typography sx={{ padding: "20px 0px", textAlign: "justify" }}>
          {gettext(
            "Select one of your current groups and specify a due date (the due date can be changed later). Upon clicking submit, your students will receive an e-mail with a link to the assignment.",
          )}
        </Typography>

        <Stack spacing={3}>
          <Errors errors={errors} />
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
                " .MuiLoadingButton-loadingIndicatorEnd": {
                  right: "28px",
                }, // Layout fix
              }}
              variant="contained"
            >
              <Typography tag={"span"}>{gettext("Distribute")}</Typography>
            </LoadingButton>
          </FormButtonBox>
        </Stack>
      </Fragment>
    );
  };

  return (
    <Modal open={method == "myDalite" || method == "LMS"} onClose={onClose}>
      <Box sx={style}>
        {method == "myDalite" ? myDaliteDialog() : ltiDialog()}
      </Box>
    </Modal>
  );
}
