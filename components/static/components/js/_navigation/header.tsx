/* file deepcode ignore ReactIdentifierTypo: Preact accepts class */
import { h } from "preact";

import { useState } from "preact/hooks";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { CustomMenu } from "./menu";
import { LinkType, UserType } from "../types";

export const Header = ({
  logo,
  menuAddItems,
  menuProfile,
  user,
}: {
  logo: string;
  menuAddItems: LinkType[][];
  menuProfile: LinkType[][];
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

        <CustomMenu
          anchorEl={anchorElMore}
          menuItems={menuAddItems}
          onClose={handleClickMore}
          open={Boolean(openMore)}
        />

        <IconButton>
          <HelpIcon fontSize="large" />
        </IconButton>

        <IconButton onClick={handleClickAvatar}>
          <Avatar alt={user.username} src={user.avatar} fontSize="large" />
        </IconButton>

        <CustomMenu
          anchorEl={anchorElAvatar}
          menuItems={menuProfile}
          onClose={handleClickAvatar}
          open={Boolean(openAvatar)}
        />
      </Toolbar>
    </AppBar>
  );
};
