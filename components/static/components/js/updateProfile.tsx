import { h, render } from "preact";
export { h, render };

// components
import { Main } from "./_reusableComponents/main";
import { Profile } from "./_profile/profile";

// mui components
import Typography from "@mui/material/Typography";

// style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import { formTheme } from "./theme";

// cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// types
import { InstitutionType, DisciplineType } from "./_localComponents/types";

export const App = ({
  gettext,
  nonce,
  disciplineOptions,
  disciplines,
  institutionOptions,
  institutions,
}: {
  gettext: (a: string) => string;
  nonce: string;
  disciplines: number[];
  disciplineOptions: DisciplineType[];
  institutions: number[];
  institutionOptions: InstitutionType[];
}) => {
  /*
  Only renders the inner part of profile form
  Must be wrapped in <form> tags with csrf_token
  */
  const cache = createCache({
    key: "nonced",
    nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  return (
    <ThemeProvider theme={formTheme}>
      <CacheProvider value={cache}>
        <Main>
          <Typography variant="h1" align="left">
            {gettext("Profile")}
          </Typography>
          <Profile
            gettext={gettext}
            disciplineOptions={disciplineOptions}
            disciplines={disciplines}
            institutionOptions={institutionOptions}
            institutions={institutions}
          />
        </Main>
      </CacheProvider>
    </ThemeProvider>
  );
};
