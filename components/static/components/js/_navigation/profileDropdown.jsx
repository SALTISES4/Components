import { h } from "preact";

import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  width: "156px",
  boxShadow: "0px 0px 4px rgb(0,0,0.05)",
  borderRadius: "10px",
  backgroundColor: "background.paper",
  boxSizing: "border-box",
  top: "55px",
  right: "6px",
};

const typographyStyle = {
  sx: {
    fontSize: "12px",
    lineHeight: "16px",
    color: "secondary4.main",
  },
};

export const ProfileDropdown = () => {
  return (
    <Box sx={style}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={typographyStyle}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Password"
              primaryTypographyProps={typographyStyle}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Notifications Settings"
              primaryTypographyProps={typographyStyle}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: "secondary2.main" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Go To Courseflow"
              primaryTypographyProps={typographyStyle}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Sign out"
              primaryTypographyProps={typographyStyle}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
