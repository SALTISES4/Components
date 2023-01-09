import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//style
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import { formTheme } from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StepBar } from "./styledComponents";
import { Content } from "../questions/content";
import { Settings } from "../questions/settings";

type User = {
  name: string;
};

type AppProps = {
  gettext: (a: string) => string;
  nonce: string;
  urls?: {
    assignments: string;
    collections: string;
    questions: string;
  };
  user: User;
};

// type AppState = {
//   assignments: AssignmentType[];
//   collections: CollectionType[];
//   questions: QuestionType[];
// };

export const App = ({ gettext, nonce, urls, user, ...props }: AppProps) => {
  const cache = createCache({
    key: "nonced",
    nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  return (
    <ThemeProvider theme={formTheme}>
      <CacheProvider value={cache}>
        <Box width="calc(100% - 200px)" marginLeft="200px">
          <Container sx={{ width: "80%" }}>
            <Typography variant="h1" align="left">
              {gettext("Create Question")}
            </Typography>
            <Typography variant="h2" sx={{ marginTop: "30px" }}>
              {gettext("Step 1/2")}
            </Typography>
            <Typography fontSize="16px" lineHeight="22px">
              {gettext("Question parameters")}
            </Typography>
            <StepBar
              sx={{
                background:
                  "linear-gradient(to right, #1743B3 50%, #AEAEBF 50%)",
              }}
            />
            <Stack spacing={"30px"}>
              <Content gettext={gettext} />
              <Settings gettext={gettext} />
            </Stack>
          </Container>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
