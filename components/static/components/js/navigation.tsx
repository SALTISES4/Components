import { h, render } from "preact";
export { h, render };

//material ui components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//components
import { Header } from "./_navigation/header";
import { SideBar } from "./_navigation/drawer";

//types
import { NavigationAppProps } from "./types";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export const App = ({
  groups,
  logo,
  menuAddItems,
  menuProfile,
  nonce,
  user,
}: NavigationAppProps) => {
  const cache = createCache({
    key: "nonced",
    nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  return (
    <ThemeProvider theme={saltise}>
      <CacheProvider value={cache}>
        <Box sx={{ display: "flex" }}>
          <Header
            logo={logo}
            menuAddItems={menuAddItems}
            menuProfile={menuProfile}
            user={user}
          />
          <SideBar groups={groups} />
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
