import { h } from "preact";

import { useState } from "preact/hooks";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { NavigationDropdown } from "./navigationDropdown";
import { ProfileDropdown } from "./profileDropdown";

export const Header = (props) => {
  const [openMore, setOpenMore] = useState(false);
  const [openAv, setOpenAv] = useState(false);

  const handleClickMore = () => {
    setOpenMore((prev) => !prev);
  };

  const handleClickMoreAway = () => {
    setOpenMore(false);
  };

  const handleClickAv = () => {
    setOpenAv((prev) => !prev);
  };

  const handleClickAvAway = () => {
    setOpenAv(false);
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

        <ClickAwayListener onClickAway={handleClickMoreAway}>
          <Box display="flex" justifyContent="center">
            <IconButton onClick={handleClickMore}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
            {openMore ? <NavigationDropdown /> : null}
          </Box>
        </ClickAwayListener>

        <IconButton>
          <HelpIcon fontSize="large" />
        </IconButton>

        <ClickAwayListener onClickAway={handleClickAvAway}>
          <Box display="flex" justifyContent="center">
            <IconButton sx={{ ml: "0px" }} onClick={handleClickAv}>
              <Avatar
                alt={props.username}
                src={props.avatar}
                fontSize="large"
              />
            </IconButton>
            {openAv ? <ProfileDropdown /> : null}
          </Box>
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
};
