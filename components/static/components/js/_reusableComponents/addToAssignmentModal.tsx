import { Component, h } from "preact";

//functions
import { get } from "../ajax";

//material ui components
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
import DialogTitle from "./dialog";
import Errors from "./errors";
import { Snackbar } from "./snackbar";

//types
import { AddToAssignmentModalProps, AddToAssignmentModalState } from "./types";

export class AddToAssignmentModal extends Component<
  AddToAssignmentModalProps,
  AddToAssignmentModalState
> {
  constructor(props: AddToAssignmentModalProps) {
    super(props);
    this.state = {
      assignment: "",
      assignments: [],
      errors: [],
      loaded: false,
      snackbarIsOpen: false,
      snackbarMessage: "",
      waiting: false,
    };
  }

  error = (error: any) => {
    console.error(error);
    if (typeof error === "object") {
      const e = Object.values(error) as string[][];
      this.setState({ errors: e });
    }
    if (error instanceof TypeError) {
      this.setState({ errors: Array([error.message]) });
    }
  };

  sync = async (): Promise<void> => {
    try {
      const assignments = (await get(
        this.props.urls.assignmentList,
      )) as unknown as {
        pk: string;
        title: string;
      }[];
      this.setState({ assignments }), () => console.info(this.state);
    } catch (error: any) {
      this.error(error);
      this.setState({ loaded: false });
    }
  };

  componentWillUpdate(nextProps: Readonly<AddToAssignmentModalProps>): void {
    if (nextProps.open == true && !this.state.loaded) {
      this.setState({ loaded: true }, this.sync);
    }
  }

  choices = () => {
    return this.state.assignments.map((a, i) => (
      <MenuItem key={i} value={a.pk}>
        {a.title}
      </MenuItem>
    ));
  };

  render() {
    return (
      <Box>
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle onClose={this.props.onClose}>
            {this.props.gettext("Add to assignment")}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <Typography>
                {this.props.gettext(
                  "Select the assignment to which you would like to add this question.",
                )}
              </Typography>

              <Errors errors={this.state.errors} />
              <FormControl required>
                <InputLabel id="assignment-select">
                  {this.props.gettext("Assignment")}
                </InputLabel>
                <Select
                  disabled={this.state.waiting}
                  labelId="assignment-select"
                  value={this.state.assignment}
                  label={`${this.props.gettext("Assignment")}*`}
                  onChange={(event: SelectChangeEvent) => {
                    if (event.target) {
                      this.setState({
                        assignment: (event.target as HTMLInputElement).value,
                      });
                    }
                  }}
                >
                  {this.choices()}
                </Select>
                <FormHelperText>
                  {this.props.gettext(
                    "You can only add questions to assignments that have not been distributed yet.",
                  )}
                </FormHelperText>
              </FormControl>

              <FormButtonBox sx={{ margin: "0px" }}>
                <CancelButton onClick={this.props.onClose}>
                  <Typography>{this.props.gettext("Close")}</Typography>
                </CancelButton>
                <LoadingButton
                  disabled={this.state.assignment == ""}
                  endIcon={<AddIcon />}
                  loadingPosition="end"
                  loading={this.state.waiting}
                  onClick={async () => {
                    this.setState({ waiting: true });
                    try {
                      await this.props.handleSubmit(this.state.assignment);
                      this.sync();
                      this.setState({
                        snackbarMessage: `Q${
                          this.props.question.pk
                        } ${this.props.gettext("added to")} ${
                          this.state.assignment
                        }`,
                        snackbarIsOpen: true,
                      });
                    } catch (error: any) {
                      this.error(error);
                    } finally {
                      this.setState({ waiting: false });
                    }
                  }}
                  sx={{
                    " .MuiLoadingButton-loadingIndicatorEnd": {
                      right: "28px",
                    }, // Layout fix
                  }}
                  variant="contained"
                >
                  <Typography>{this.props.gettext("Add")}</Typography>
                </LoadingButton>
              </FormButtonBox>
            </Stack>
          </DialogContent>
        </Dialog>

        <Snackbar
          message={this.state.snackbarMessage}
          onClose={() =>
            this.setState({ snackbarIsOpen: false, snackbarMessage: "" })
          }
          open={this.state.snackbarIsOpen}
        />
      </Box>
    );
  }
}
