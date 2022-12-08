import { h } from "preact";

import { useState } from "preact/hooks";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { HeaderDropdown } from "./headerDropdown";

export const Header = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

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

        <ClickAwayListener onClickAway={handleClickAway}>
          <Box display="flex" justifyContent="center">
            <IconButton onClick={handleClick}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
            {open ? <HeaderDropdown /> : null}
          </Box>
        </ClickAwayListener>

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
