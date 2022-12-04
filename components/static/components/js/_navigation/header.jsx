import { h } from "preact";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//import useTheme from "@mui/material/styles/useTheme";

export const Header = (props) => {
  //const theme = useTheme();

  return (
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
          sx={{ flexGrow: 1, color: "#fff" }}
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
  );
};
