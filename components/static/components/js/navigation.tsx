import { Component, h, render } from "preact";
export { h, render };

//material ui components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//components
import { Header } from "./_navigation/header";
import { SideBar } from "./_navigation/drawer";

//types
import { NavigationAppProps, NavigationAppState } from "./types";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<NavigationAppProps, NavigationAppState> {
  constructor(props: NavigationAppProps) {
    super(props);
    this.state = {};
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
          <Box sx={{ display: "flex" }}>
            <Header
              menuAddItems={this.props.menuAddItems}
              menuProfile={this.props.menuProfile}
              user={this.props.user}
            />
            <SideBar
              groups={this.props.sidebarGroups}
              logo={this.props.logo}
            />
            <Box component="main">
              <Toolbar variant="dense" />
            </Box>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
