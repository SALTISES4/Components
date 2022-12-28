/* file deepcode ignore ReactIdentifierTypo: Preact accepts class */
import { h } from "preact";

import { useState } from "preact/hooks";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { URLType, UserType } from "../types";

const typographyStyle = {
  sx: {
    fontSize: "12px",
    lineHeight: "16px",
    color: "secondary4.main",
  },
};

export const Header = ({
  logo,
  menuAddItems,
  menuProfile,
  user,
}: {
  logo: string;
  menuAddItems: URLType[];
  menuProfile: URLType[];
  user: UserType;
}) => {
  const [{ openMore, anchorElMore }, setOpenMore] = useState<{
    openMore: boolean;
    anchorElMore: null | HTMLElement;
  }>({
    openMore: false,
    anchorElMore: null,
  });

  const [{ openAvatar, anchorElAvatar }, setOpenAvatar] = useState<{
    openAvatar: boolean;
    anchorElAvatar: null | HTMLElement;
  }>({ openAvatar: false, anchorElAvatar: null });

  const handleClickMore = (event: MouseEvent | TouchEvent) => {
    setOpenMore((prevState) => ({
      openMore: !prevState.openMore,
      anchorElMore: !prevState.openMore ? (event.target as HTMLElement) : null,
    }));
  };

  const handleClickAvatar = (event: MouseEvent | TouchEvent) => {
    setOpenAvatar((prevState) => ({
      openAvatar: !prevState.openAvatar,
      anchorElAvatar: !prevState.openAvatar
        ? (event.target as HTMLElement)
        : null,
    }));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <img class="logo" src={logo} />
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

        <IconButton onClick={handleClickMore}>
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <Menu
          anchorEl={anchorElMore}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          onClose={handleClickMore}
          open={Boolean(openMore)}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {menuAddItems.map((choice, i) => (
            <MenuItem key={i}>
              <ListItemIcon>
                <Icon
                  sx={{
                    color: "secondary4.main",
                    fontSize: "16px!important",
                  }}
                >
                  {choice.icon}
                </Icon>
              </ListItemIcon>
              <ListItemText
                primary={choice?.title}
                primaryTypographyProps={typographyStyle}
              />
            </MenuItem>
          ))}
        </Menu>

        <IconButton>
          <HelpIcon fontSize="large" />
        </IconButton>

        <IconButton sx={{ ml: "0px" }} onClick={handleClickAvatar}>
          <Avatar alt={user.username} src={user.avatar} fontSize="large" />
        </IconButton>

        <Menu
          anchorEl={anchorElAvatar}
          onClose={handleClickAvatar}
          open={Boolean(openAvatar)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
