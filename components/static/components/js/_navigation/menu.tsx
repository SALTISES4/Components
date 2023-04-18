import { Fragment, h } from "preact";

import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { CustomMenuProps } from "./types";

const typographyStyle = {
  sx: {
    fontSize: "0.9rem",
    lineHeight: "1.2rem",
    color: "secondary4.main",
  },
};

export const CustomMenu = ({
  anchorEl,
  menuItems,
  onClose,
  open,
}: CustomMenuProps) => {
  const handleClick = (url: string, target: string | undefined) => {
    if (target) {
      window.open(url, target);
    } else {
      window.location.href = url;
    }
  };

  const text = (title: string) => {
    return (
      <ListItemText primary={title} primaryTypographyProps={typographyStyle} />
    );
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={onClose}
      open={open}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {menuItems.map((group, i) => (
        <Fragment key={i}>
          {group.map((choice, j) => (
            <MenuItem
              key={j}
              disabled={!!choice?.disabled}
              onClick={() => handleClick(choice.url, choice?.target)}
            >
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
              {text(choice.title)}
            </MenuItem>
          ))}
          <Divider
            sx={{
              backgroundColor: "secondary2.main",
              display: i < menuItems.length - 1 ? "block" : "none",
            }}
          />
        </Fragment>
      ))}
    </Menu>
  );
};
