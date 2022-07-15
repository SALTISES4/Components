import { h } from "preact";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const Navigation = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [],
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#54c0db",
      },
    },
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: 12,
    },
  });

  return (
    <div id="navigation-component">
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <Drawer anchor="left" variant="permanent">
            <List>
              {props.links.map((entry) => (
                <ListItem key={entry.title} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={entry.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </CacheProvider>
      </ThemeProvider>
    </div>
  );
};
