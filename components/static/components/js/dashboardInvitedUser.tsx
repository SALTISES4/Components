import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";

import { Subtitle, SharedTag } from "./styledComponents";

import { InvitedUserBar } from "./_dashboard/invitedUserBar";

import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { QuestionType } from "./_localComponents/types";

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
            Welcome, {props.user.name}
          </Typography>
          <Container align="center">
            <InvitedUserBar />
          </Container>
          <Container>
            <Grid container spacing="20px">
              {props.collections.map((collection) => (
                <Grid key={collection.title} item xs={6}>
                  <SharedTag>
                    <Typography>Shared By {collection.autor}</Typography>
                  </SharedTag>
                  <Collection collection={collection} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2"> Featured Collection </Typography>
              <Link variant="h4"> Explore collections</Link>
            </Subtitle>
            <Grid container spacing="20px">
              {props.collections.map((collection) => (
                <Grid key={collection.title} item xs={6}>
                  <Collection collection={collection} />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2">
                You might be interested in...
              </Typography>
              <Link variant="h4">Explore Question</Link>
            </Subtitle>
            <Stack spacing="10px">
              {props.questions.map((question: QuestionType, i: number) => (
                <Question key={i} question={question} />
              ))}
            </Stack>
          </Container>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
