import { h, render } from "preact";
export { h, render };

//material ui components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//components
import { Dashboard } from "./_navigation/dashboard.jsx";
import { Header } from "./_navigation/header.jsx";
import { SideBar } from "./_navigation/drawer.jsx";

//style
import { prefixer } from "stylis";
//import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme.js";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

//data
import {
  navbar,
  assigments,
  groups,
  collections,
  questions,
  user,
} from "./data.js";

export const App = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  /*const mainTheme = createTheme({
    ...saltise,
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#000B26",
            color: "#fff",
            paddingLeft: 2,
            " img.logo": {
              height: 40,
              marginRight: 10,
            },
            " .MuiAvatar-root": {
              height: 30,
              width: 30,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "none",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgb(255, 255, 255, 0.1)",
          },
          vertical: {
            borderWidth: "0px",
            backgroundColor: "#EDF5FC",
            width: "3px",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            padding: "20px 10px",
            backgroundColor: "#0D2666",
            color: "#fff",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "4px 16px",
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255, 0.1)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          sizeSmall: {
            padding: "5px",
            height: "26px",
            borderRadius: "5px",
          },
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            paddingRight: "6px",
            paddingLeft: "1px",
          },
          fontSizeMedium: {
            fontSize: "12px",
          },
          fontSizeLarge: {
            fontSize: "16px",
          },
        },
      },
    },
  }); */

  return (
    <ThemeProvider theme={saltise}>
      <CacheProvider value={cache}>
        <Box sx={{ display: "flex" }}>
          <Header
            logo={navbar.logo}
            groups={navbar.groups}
            nonce={navbar.nonce}
            username={user.username}
            avatar={user.avatar}
          />
          <SideBar
            logo={navbar.logo}
            groups={navbar.groups}
            nonce={navbar.nonce}
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
            <Dashboard
              name={user.name}
              assigments={assigments}
              groups={groups}
              collections={collections}
              questions={questions}
              nonce={navbar.nonce}
            />
          </Box>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
