/* file deepcode ignore ReactIdentifierTypo: Preact accepts class */
import { h } from "preact";

import { useState } from "preact/hooks";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { CustomMenu } from "./menu";
import { headerProps } from "./types";

export const Header = ({
  menuAddItems,
  menuHelpItems,
  menuProfile,
  user,
}: headerProps) => {
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

  const [{ openHelp, anchorElHelp }, setOpenHelp] = useState<{
    openHelp: boolean;
    anchorElHelp: null | HTMLElement;
  }>({ openHelp: false, anchorElHelp: null });

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

  const handleClickHelp = (event: MouseEvent | TouchEvent) => {
    setOpenHelp((prevState) => ({
      openHelp: !prevState.openHelp,
      anchorElHelp: !prevState.openHelp ? (event.target as HTMLElement) : null,
    }));
  };

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
    >
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleClickMore}>
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <CustomMenu
          anchorEl={anchorElMore}
          menuItems={menuAddItems}
          onClose={handleClickMore}
          open={Boolean(openMore)}
        />

        <IconButton onClick={handleClickHelp}>
          <HelpIcon fontSize="large" />
        </IconButton>

        <CustomMenu
          anchorEl={anchorElHelp}
          menuItems={menuHelpItems}
          onClose={handleClickHelp}
          open={Boolean(openHelp)}
        />

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
