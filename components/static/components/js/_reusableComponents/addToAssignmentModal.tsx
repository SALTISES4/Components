import { Component, h } from "preact";

import { get } from "../ajax";

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
      loading: true,
      snackbarOpen: false,
      snackbarMessage: "",
      waiting: false,
    };
  }

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
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount(): void {
    // Fetch data from db
    this.sync();
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
        <Modal open={this.props.open} onClose={this.props.onClose}>
          <Box sx={style}>
            <Typography variant="h1" sx={{ margin: "0px" }}>
              {this.props.gettext("Add to assignment")}
            </Typography>
            <Typography
              fontSize={"16"}
              sx={{ padding: "20px 0px", textAlign: "justify" }}
            >
              {this.props.gettext(
                "Select the assignment to which you would like to add this question.",
              )}
            </Typography>

            <Stack spacing={3}>
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
                  <Typography>{this.props.gettext("Cancel")}</Typography>
                </CancelButton>
                <LoadingButton
                  disabled={this.state.assignment == ""}
                  endIcon={<AddIcon />}
                  loadingPosition="end"
                  loading={this.state.waiting}
                  onClick={async () => {
                    this.setState({ waiting: true });
                    // Do something with errors?
                    await this.props.handleSubmit(this.state.assignment);
                    this.sync();
                    this.setState({
                      waiting: false,
                      snackbarMessage: `Q${
                        this.props.question.pk
                      } ${this.props.gettext("added to")} ${
                        this.state.assignment
                      }`,
                      snackbarOpen: true,
                    });
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
          </Box>
        </Modal>

        <Snackbar
          message={this.state.snackbarMessage}
          open={this.state.snackbarOpen}
          onClose={() =>
            this.setState({ snackbarOpen: false, snackbarMessage: "" })
          }
        />
      </Box>
    );
  }
}
