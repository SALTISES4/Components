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

import { DrawerProps } from "./types";

export const SideBar = ({ groups, logo }: DrawerProps) => {
  const drawerWidth = 200;

  const handleClick = (url: string) => {
    window.location.href = url;
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

      <Box>
        {groups.map((group, i) => (
          <Fragment key={i}>
            <List>
              {group.map((entry) => (
                <ListItem
                  key={entry.title}
                  disablePadding
                  onClick={() =>
                    !entry.selected ? handleClick(entry.url) : null
                  }
                  sx={{ pointerEvents: entry.selected ? "none" : "auto" }}
                >
                  <ListItemButton
                    disabled={entry.disabled}
                    selected={entry.selected}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
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
  );
};
