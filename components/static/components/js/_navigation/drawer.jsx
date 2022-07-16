import { Fragment, h } from "preact";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import HelpIcon from "@mui/icons-material/Help";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { prefixer } from "stylis";

import saltise from "../theme.js";

export const Navigation = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  const drawerWidth = 200;

  const drawerTheme = createTheme({
    ...saltise,
    palette: {
      background: {
        paper: "#0D2666",
      },
      text: {
        primary: "#fff",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#000B26",
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
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgb(255, 255, 255, 0.1)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            padding: "20px 10px",
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
    },
  });

  return (
    <div id="navigation-component">
      <ThemeProvider theme={drawerTheme}>
        <CacheProvider value={cache}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <img class="logo" src={props.logo} />
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <span class="cardo">my</span>
                <span class="montserrat">DALITE</span>
              </Typography>

              <IconButton sx={{ color: "white" }}>
                <HelpIcon fontSize="large" />
              </IconButton>
              <IconButton>
                <Avatar alt={props.username} src={props.avatar} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              {props.groups.map((group, i) => (
                <Fragment key={i}>
                  <List>
                    {group.map((entry) => (
                      <ListItem key={entry.title} disablePadding>
                        <ListItemButton>
                          <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                            <Icon>{entry.icon}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={entry.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Fragment>
              ))}
            </Box>
          </Drawer>
        </CacheProvider>
      </ThemeProvider>
    </div>
  );
};
