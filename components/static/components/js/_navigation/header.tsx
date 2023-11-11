/* file deepcode ignore ReactIdentifierTypo: Preact accepts class */
import { Fragment, h } from "preact";

import { useState } from "preact/hooks";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { CustomMenu } from "./menu";
import { headerProps } from "./types";

export const Header = ({ menuAddItems, menuProfile, user }: headerProps) => {
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
      elevation={6}
      position="fixed"
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 3px 5px -1px, rgba(0, 0, 0, 0.07) 0px 6px 10px 0px, rgba(0, 0, 0, 0.06) 0px 1px 18px 0px",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }} />

        {menuAddItems.length > 0 ? (
          <Fragment>
            <IconButton onClick={handleClickMore}>
              <AddCircleIcon fontSize="large" />
            </IconButton>

            <CustomMenu
              anchorEl={anchorElMore}
              menuItems={menuAddItems}
              onClose={handleClickMore}
              open={Boolean(openMore)}
            />
          </Fragment>
        ) : null}

        {menuProfile.length > 0 ? (
          <Fragment>
            <IconButton onClick={handleClickAvatar}>
              <Avatar
                alt={user.username}
                src={user.avatar}
                fontSize="large"
                sx={{ color: "#fff" }}
              />
            </IconButton>

            <CustomMenu
              anchorEl={anchorElAvatar}
              menuItems={menuProfile}
              onClose={handleClickAvatar}
              open={Boolean(openAvatar)}
            />
          </Fragment>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
