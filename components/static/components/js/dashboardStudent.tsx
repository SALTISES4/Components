import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Subtitle } from "./styledComponents";

import { AssigmentStudent } from "./_localComponents/assigmentStudent";
import { AssigmentStudentCompleted } from "./_localComponents/assigmentStudentCompleted";
import { GroupStudent } from "./_localComponents/groupStudent";

import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export const App = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  return (
    <ThemeProvider theme={saltise}>
      <CacheProvider value={cache}>
        <Box width="calc(100% - 200px)" marginLeft="200px">
          <Typography variant="h1" align="center">
            Good Morning, {props.user.name}
          </Typography>
          <Container align="center" />
          <Container>
            <Subtitle>
              <Typography variant="h2"> Assigments due</Typography>
            </Subtitle>
            <Stack spacing="10px">
              {props.assigments.map((assigment) => (
                <AssigmentStudent
                  key={assigment.title}
                  assigment={assigment}
                />
              ))}
            </Stack>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Recently completed</Typography>
              <Link variant="h4"> See all my assigments</Link>
            </Subtitle>
            <Stack spacing="10px">
              {props.assigments.map((assigment) => (
                <AssigmentStudentCompleted
                  key={assigment.title}
                  assigment={assigment}
                />
              ))}
            </Stack>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Active groups </Typography>
            </Subtitle>
            <Grid container spacing="20px">
              {props.groups.map((group) => (
                <Grid key={group.title} item xs={6}>
                  <GroupStudent key={group.title} group={group} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
