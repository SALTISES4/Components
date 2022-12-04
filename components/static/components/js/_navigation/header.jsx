import { h } from "preact";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <img class="logo" src={props.logo} />
        <Typography
          variant="h4"
          noWrap
          component="div"
          fontSize="16px"
          sx={{ flexGrow: 1 }}
        >
          <span class="cardo">my</span>
          <span class="montserrat">DALITE</span>
        </Typography>
        <IconButton sx={{ color: "#fff", mr: "30px", ml: "30px" }}>
          <HelpIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <Avatar alt={props.username} src={props.avatar} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
