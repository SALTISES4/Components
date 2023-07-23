import { Fragment, h } from "preact";

import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { LinkType } from "../types";
import { CustomMenuProps } from "./types";

export const CustomMenu = ({ menuItems, ...props }: CustomMenuProps) => {
  const handleItemClick = (choice: LinkType) => {
    if (choice.url && choice.target) {
      window.open(choice.url, choice.target);
    } else if (choice.url) {
      window.location.href = choice.url;
    } else if (choice.handleClick) {
      choice.handleClick();
    }
    return;
  };

  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    >
      {menuItems.map((group, i) => (
        <Fragment key={i}>
          {group.map((choice, j) => (
            <MenuItem
              key={j}
              disabled={!!choice?.disabled}
              onClick={() => handleItemClick(choice)}
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
              {<ListItemText disableTypography primary={choice.title} />}
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
