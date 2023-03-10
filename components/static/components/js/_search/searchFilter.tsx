import { h } from "preact";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Filter, Notification } from "../styledComponents";
import SvgIcon from "@mui/material/SvgIcon";
import { SearchDropdown } from "./searchDropdown";
import { useState } from "preact/hooks";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import { SearchFilterProps } from "./types";

export const SearchFilter = ({
  gettext,
  callback,
  filter,
  selected,
}: SearchFilterProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Filter onClick={handleClick}>
          {filter.notification > 0 ? (
            <Notification sx={{ top: "-8px", left: "-13px" }}>
              <Typography>{filter.notification}</Typography>
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
            component={filter.icon}
          />
          <Typography color="inherit" sx={{ pl: "6px" }}>
            {filter.title}
          </Typography>
        </Filter>
        {open ? (
          <SearchDropdown
            callback={callback}
            title={filter.title}
            subtitle={filter.subtitle}
            choices={filter.choices}
            gettext={gettext}
            selected={selected}
          />
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};
