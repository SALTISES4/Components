import { Fragment, h } from "preact";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Action } from "../styledComponents";
import { DrawerProps } from "./types";

export const SideBar = ({ groups, logo }: DrawerProps) => {
  const drawerWidth = 200;

  const handleClick = (url: string, target: string | undefined) => {
    if (target) {
      window.open(url, target);
    } else {
      window.location.href = url;
    }
  };

  return (
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
      <Box sx={{ mb: "48px" }}>
        <Box display="flex" alignItems="center">
          <img class="logo" src={logo} />
          <Box noWrap component="span" fontSize="16px" color="#fff">
            <span class="cardo">my</span>
            <span class="montserrat">DALITE</span>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {groups.map((group, i) => (
          <Fragment key={i}>
            <List sx={{ flexGrow: i == groups.length - 2 ? 2 : 0 }}>
              {group.map((entry) => (
                <ListItem
                  key={entry.title}
                  disablePadding
                  onClick={() =>
                    !entry.selected && entry.url
                      ? handleClick(entry.url, entry.target)
                      : null
                  }
                  sx={{
                    pointerEvents: entry.selected ? "none" : "auto",
                  }}
                >
                  {entry.aside ? (
                    <Action
                      sx={{
                        fontSize: "x-small!important",
                        padding: "0px 16px",
                      }}
                    >
                      {entry.title}
                    </Action>
                  ) : (
                    <ListItemButton
                      disabled={entry.disabled}
                      selected={entry.selected}
                      sx={{ alignItems: "flex-end" }}
                    >
                      <ListItemIcon
                        sx={{
                          display: entry.icon ? "block" : "none",
                          minWidth: 36,
                        }}
                      >
                        <Icon fontSize="medium">{entry.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={entry.title}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
            <Divider
              sx={{ display: i == groups.length - 1 ? "none" : "block" }}
            />
          </Fragment>
        ))}
      </Box>
    </Drawer>
  );
};
