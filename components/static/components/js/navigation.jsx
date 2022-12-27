import { h, render } from "preact";
export { h, render };

//material ui components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//components
import { Header } from "./_navigation/header.jsx";
import { SideBar } from "./_navigation/drawer.jsx";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

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
        <Box sx={{ display: "flex" }}>
          <Header
            logo={props.logo}
            groups={props.groups}
            nonce={props.nonce}
            username={props.user.username}
            avatar={props.user.avatar}
          />
          <SideBar
            logo={props.logo}
            groups={props.groups}
            nonce={props.nonce}
          />
          <Box
            component="main"
            maxWidth="lg"
            sx={{
              flexGrow: 1,

              overflow: "auto",
              ml: "130px",
              mr: "130px",
            }}
          >
            <Toolbar />
          </Box>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
