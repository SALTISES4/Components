import { Fragment, h } from "preact";

import { Divider } from "@mui/material";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { LinkType } from "../types";

const typographyStyle = {
  sx: {
    fontSize: "12px",
    lineHeight: "16px",
    color: "secondary4.main",
  },
};

export const CustomMenu = ({
  anchorEl,
  menuItems,
  onClose,
  open,
}: {
  anchorEl: null | HTMLElement;
  menuItems: LinkType[][];
  onClose: (a: MouseEvent | TouchEvent) => void;
  open: boolean;
}) => {
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
            <MenuItem key={j}>
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
                primary={choice.title}
                primaryTypographyProps={typographyStyle}
              />
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
