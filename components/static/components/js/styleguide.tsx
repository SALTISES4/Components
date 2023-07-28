import { h, render } from "preact";
export { h, render };

import Typography from "@mui/material/Typography";

import { Main } from "./_reusableComponents/main";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export const styleguide = ({ nonce }: { nonce: string }) => {
  const cache = createCache({
    key: "nonced",
    nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  const css = (obj: object) => {
    return Object.entries(obj)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((e, i) => (
        <Typography key={i} sx={{ fontSize: 8 }}>
          {e[0]}: {e[1]}
        </Typography>
      ));
  };

  return (
    <ThemeProvider theme={saltise}>
      <CacheProvider value={cache}>
        <Main>
          <Typography variant="h1">Heading style 1</Typography>
          {css(saltise.typography.h1)}
          <Typography variant="h2">Heading style 2</Typography>
          {css(saltise.typography.h2)}
          <Typography variant="h3">Heading style 3</Typography>
          {css(saltise.typography.h3)}
          <Typography variant="h4">Heading style 4</Typography>
          {css(saltise.typography.h4)}
          <Typography variant="h5">Heading style 5</Typography>
          {css(saltise.typography.h5)}
          <Typography variant="h6">Heading style 6</Typography>
          {css(saltise.typography.h6)}
          <Typography variant="subtitle1">Subtitle style 1</Typography>
          {css(saltise.typography.subtitle1)}
          <Typography variant="subtitle2">Subtitle style 2</Typography>
          {css(saltise.typography.subtitle2)}
          <Typography variant="body1">Body style 1</Typography>
          {css(saltise.typography.body1)}
          <Typography variant="body2">Body style 2</Typography>
          {css(saltise.typography.body2)}
          <Typography variant="label">Label style</Typography>
          {css(saltise.typography.label)}
          <Typography tag="div" variant="caption">
            Caption style
          </Typography>
          {css(saltise.typography.caption)}
          <Typography tag="div" variant="button">
            Button style
          </Typography>
          {css(saltise.typography.button)}
          <Typography tag="div" variant="overline">
            Overline style
          </Typography>
          {css(saltise.typography.overline)}
        </Main>
      </CacheProvider>
    </ThemeProvider>
  );
};
