import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";

import { DashboardBar, Subtitle } from "./styledComponent";
import { Assigment } from "./_localComponents/assigment";
import { Collection } from "./_localComponents/collection";
import { Group } from "./_localComponents/group";
import { Question } from "./_localComponents/question";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme.js";

//cache
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
          <Container align="center">
            <DashboardBar>
              <Typography variant="h4" width="100%" align="center">
                x active assigments
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h4" width="100%" align="center">
                x groups
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h4" width="100%" align="center">
                x questions
              </Typography>
            </DashboardBar>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Active Assigments </Typography>
              <Link variant="h4"> See my assigments</Link>
            </Subtitle>
            <Stack spacing="10px">
              {props.assigments.map((assigment) => (
                <Assigment key={assigment.title} assigment={assigment} />
              ))}

              {props.groups.map((group) => (
                <Group key={group.title} group={group} />
              ))}
            </Stack>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Featured Collection </Typography>
              <Link variant="h4"> Explore collections</Link>
            </Subtitle>
            <Grid container spacing="20px">
              {props.collections.map((collection) => (
                <Collection key={collection.title} collection={collection} />
              ))}
            </Grid>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Newly Added Questions </Typography>
              <Link variant="h4">Explore Question</Link>
            </Subtitle>
            <Stack spacing="10px">
              {props.questions.map((question) => (
                <Question key={question.title} question={question} />
              ))}
            </Stack>
          </Container>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
