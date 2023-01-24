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
import Toolbar from "@mui/material/Toolbar";

import { drawerProps } from "./types";

export const SideBar = ({ groups }: drawerProps) => {
  const drawerWidth = 200;
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
      <Toolbar />
      <Box>
        {groups.map((group, i) => (
          <Fragment key={i}>
            <List>
              {group.map((entry) => (
                <ListItem key={entry.title} disablePadding>
                  <ListItemButton>
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
