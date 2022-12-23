import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";

import { Subtitle } from "./styledComponents";

import { SuperUserBar } from "./_dashboard/superUserBar";

import { Assigment } from "./_localComponents/assigment";
import { Collection } from "./_localComponents/collection";
import { Group } from "./_localComponents/group";
import { Question } from "./_localComponents/question";
import { QuestionType } from "./_localComponents/types";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme.js";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export const App = ({ gettext, ...props }) => {
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
            {gettext("Good Morning,")} {props.user.name}
          </Typography>
          <Container align="center">
            <SuperUserBar />
          </Container>
          <Container>
            <Subtitle>
              <Typography variant="h2">
                {gettext("Active Assigments")}
              </Typography>
              <Link variant="h4">{gettext("See my assigments")}</Link>
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
              <Typography variant="h2">
                {gettext("Featured Collection")}
              </Typography>
              <Link variant="h4">{gettext("Explore collections")}</Link>
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
                {gettext("Newly Added Questions")}
              </Typography>
              <Link variant="h4">{gettext("Explore questions")}</Link>
            </Subtitle>
            <Stack spacing="10px">
              {props.questions.map((question: QuestionType, i: number) => (
                <Question key={i} gettext={gettext} question={question} />
              ))}
            </Stack>
          </Container>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
