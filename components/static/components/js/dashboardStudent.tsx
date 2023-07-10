import { Component, h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Subtitle } from "./styledComponents";

import { AssignmentStudent } from "./_localComponents/assignmentStudent";
import { AssignmentStudentCompleted } from "./_localComponents/assignmentStudentCompleted";
import { GroupStudent } from "./_localComponents/groupStudent";

import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  assignments,
  collections,
  questions,
  teacher,
  groups,
} from "./data.js";
import { DashboardAppProps, DashboardAppState } from "./types";
import {
  StudentGroupAssignmentType,
  StudentGroupType,
} from "./_localComponents/types";

export class App extends Component<DashboardAppProps, DashboardAppState> {
  constructor(props: DashboardAppProps) {
    super(props);
    this.state = {
      assignments,
      collections,
      questions,
      teacher,
      groups,
    };
  }

  componentDidMount(): void {
    // Fetch data from db to overwrite placeholders
  }

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box width="calc(100% - 200px)" marginLeft="200px">
            <Typography variant="h1" align="center">
              {this.props.gettext("Good Morning, ")} {this.props.user.username}
            </Typography>
            <Container align="center" />
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {this.props.gettext("Assignments due")}
                </Typography>
              </Subtitle>
              <Stack spacing="10px">
                {this.state.assignments.map(
                  (assignment: StudentGroupAssignmentType, i: number) => (
                    <AssignmentStudent
                      key={i}
                      assignment={assignment}
                      gettext={this.props.gettext}
                    />
                  ),
                )}
              </Stack>
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {this.props.gettext("Recently completed")}
                </Typography>
                <Link variant="h4">
                  {this.props.gettext("See all my assignments")}
                </Link>
              </Subtitle>
              <Stack spacing="10px">
                {this.state.assignments.map(
                  (assignment: StudentGroupAssignmentType, i: number) => (
                    <AssignmentStudentCompleted
                      key={i}
                      assignment={assignment}
                      gettext={this.props.gettext}
                    />
                  ),
                )}
              </Stack>
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {this.props.gettext("Active groups")}
                </Typography>
              </Subtitle>
              <Grid container spacing="20px">
                {this.state.groups.map(
                  (group: StudentGroupType, i: number) => (
                    <Grid key={i} item xs={6}>
                      <GroupStudent
                        group={group}
                        gettext={this.props.gettext}
                      />
                    </Grid>
                  ),
                )}
              </Grid>
            </Container>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
