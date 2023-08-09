import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";

//functions
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

//styles
import { useTheme } from "@mui/material/styles";

//material ui components
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ShareIcon from "@mui/icons-material/Share";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CancelButton, FormButtonBox } from "../styledComponents";
import { CopyBox } from "../_reusableComponents/clipboard";
import { DraggableQuestion } from "../_localComponents/question";
import Errors from "../_reusableComponents/errors";

//types
import { DistributeModalProps } from "./types";
import { QuestionType } from "../_localComponents/types";

export default function DistributeModal({
  gettext,
  nonce,
  assignment,
  errors,
  groups,
  handleSubmit,
  lti,
  method,
  onClose,
  waiting,
}: DistributeModalProps): JSX.Element {
  /*
  NB: https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/reparenting.md
  */
  const theme = useTheme();

  const [dueDate, setDueDate] = useState(dayjs().add(7, "day"));
  const [group, setGroup] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
  const [order, setOrder] = useState<number[]>([]);

  useEffect(() => {
    if (assignment.questions !== undefined) {
      setOrder([...Array(assignment.questions?.length || 0).keys()]);
    }
  }, [assignment]);

  dayjs.extend(utc);

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle?: DraggingStyle | NotDraggingStyle,
  ) => ({
    userSelect: "none",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? theme.palette.primary.main : "unset",
    marginLeft: "-10px",
    padding: "10px",
  });

  const onDragEnd = (result: DropResult) => {
    const _order = Array.from(order);
    const [dragged] = _order.splice(result.source.index, 1);
    if (result.destination?.index) {
      _order.splice(result.destination.index, 0, dragged);
      setOrder(_order);
    }
  };

  const ltiDialog = (): JSX.Element | undefined => {
    if (assignment?.questions && assignment.questions.length > 0) {
      return (
        <Fragment>
          <DialogTitle>{gettext("Distribute via LMS")}</DialogTitle>
          <DialogContent>
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
          </DialogContent>
        </Fragment>
      );
    }
  };

  const myDaliteDialog = (): JSX.Element | undefined => {
    return (
      <Fragment>
        <DialogTitle>{gettext("Distribute via myDalite")}</DialogTitle>
        <DialogContent>
          <Stack spacing={"1.5rem"}>
            <Typography>
              {gettext(
                "Select one of your current groups and specify a due date (the due date can be changed later). Upon clicking submit, your students will receive an e-mail with a link to the assignment.",
              )}
            </Typography>

            <Errors errors={errors} />

            <FormControl required>
              <InputLabel
                id="group-select"
                sx={{
                  fontSize: theme.typography.body2.fontSize,
                }}
              >
                {gettext("Group")}
              </InputLabel>
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
                    <Typography variant="body2">{g.title}</Typography>
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
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root, .MuiInputLabel-root": {
                    color: theme.palette.secondary4.main,
                    fontSize: theme.typography.body2.fontSize,
                  },
                }}
                value={dueDate}
              />
            </LocalizationProvider>

            <FormGroup>
              <FormControlLabel
                componentsProps={{ typography: { variant: "body2" } }}
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 24 },
                    }}
                  />
                }
                label={gettext("Show correct answers")}
                onChange={() => setShowCorrectAnswers(!showCorrectAnswers)}
                sx={{ pr: "10px" }}
              />
            </FormGroup>

            <FormGroup>
              <Typography variant="body2">
                {gettext("Question order")}
              </Typography>
              <DragDropContext nonce={nonce} onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="questions"
                  renderClone={(provided, snapshot, rubric) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <DraggableQuestion
                        dense={true}
                        question={
                          assignment?.questions[order[rubric.source.index]]
                        }
                        sx={{
                          background: theme.palette.secondary1.main,
                        }}
                      />
                    </div>
                  )}
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Stack spacing={"10px"}>
                        {order.map((index: number, i: number) => (
                          <Draggable
                            key={`key-${assignment.questions[index].question.pk}`}
                            draggableId={`id-${assignment.questions[index].question.pk}`}
                            index={i}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                )}
                              >
                                <DraggableQuestion
                                  key={i}
                                  dense={true}
                                  question={
                                    assignment.questions[index].question
                                  }
                                  rank={i}
                                  sx={{
                                    background: theme.palette.secondary1.main,
                                  }}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Stack>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
                      order: order.join(","),
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
        </DialogContent>
      </Fragment>
    );
  };

  return (
    <Dialog open={method == "myDalite" || method == "LMS"} onClose={onClose}>
      {method == "myDalite" ? myDaliteDialog() : ltiDialog()}
    </Dialog>
  );
}
