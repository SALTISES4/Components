import { h } from "preact";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Filter, Notification } from "../styledComponents";
import SvgIcon from "@mui/material/SvgIcon";
import { SearchDropdown } from "./searchDropdown";
import { useState } from "preact/hooks";

import ClickAwayListener from "@mui/material/ClickAwayListener";

export const SearchFilter = (props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const displayChoice = props.choices.slice(0, 5);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Filter onClick={handleClick}>
          {props.notification > 0 ? (
            <Notification sx={{ top: "-8px", left: "-13px" }}>
              <Typography fontSize="inherit" sx={{ color: "#fff" }}>
                {props.notification}
              </Typography>
            </Notification>
          ) : (
            <Notification
              sx={{
                top: "-8px",
                left: "-13px",
                backgroundColor: "transparent",
              }}
            />
          )}
          <SvgIcon
            sx={{ position: "absolute", fontSize: "14px" }}
            component={props.icon}
          />
          <Typography color="inherit" sx={{ pl: "6px" }}>
            {props.title}
          </Typography>
        </Filter>
        {open ? (
          <SearchDropdown
            ropdown
            title={props.title}
            subtitle={props.subtitle}
            choices={displayChoice}
          />
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};
