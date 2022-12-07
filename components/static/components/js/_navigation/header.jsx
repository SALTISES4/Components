import { h } from "preact";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";

import { HeaderDropdown } from "./headerDropdown";

export const Header = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <img class="logo" src={props.logo} />
        <Typography
          noWrap
          component="div"
          fontSize="16px"
          color="#fff"
          sx={{ flexGrow: 1 }}
        >
          <span class="cardo">my</span>
          <span class="montserrat">DALITE</span>
        </Typography>
        <Box display="flex" justifyContent="center">
          <IconButton>
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <HeaderDropdown />
        </Box>
        <IconButton>
          <HelpIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ ml: "0px" }}>
          <Avatar alt={props.username} src={props.avatar} fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
