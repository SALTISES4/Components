import { h } from "preact";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useState } from "preact/hooks";
import { SearchDropdownProps } from "./types";

import { Action, BpIcon } from "../styledComponents";

export const SearchDropdown = ({
  gettext,
  callback,
  choices,
  choiceIcons,
  labels,
  minimum,
  subtitle,
  selected,
  title,
}: SearchDropdownProps) => {
  const limit = 20;

  const _choices: [string, JSX.Element | null][] = [...choices].map((c, i) => [
    c,
    choiceIcons ? choiceIcons[i] : null,
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = async (choice: string) => {
    // Update state
    const index = selected.indexOf(choice);
    const newSelected = [...selected];
    if (index >= 0) {
      newSelected.splice(index, 1);
    } else {
      newSelected.unshift(choice);
    }
    setSearchTerm("");
    callback(newSelected);
  };

  return (
    <Box
      position="absolute"
      sx={{
        width: "320px",
        boxShadow: "0px 0px 4px rgb(0,0,0.1)",
        borderRadius: "4px",
        backgroundColor: "background.paper",
        padding: "10px 10px 5px 10px",
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {_choices.length > limit ? (
        <TextField
          fullWidth
          onInput={(evt: InputEvent) => {
            setSearchTerm((evt.target as HTMLInputElement).value);
          }}
          placeholder={`${gettext("Find")} ${title.toLowerCase()}...`}
          type="search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      ) : null}
      <Box alignItems="baseline" display="flex" sx={{ gridGap: "10px" }}>
        <Typography
          flexGrow={1}
          fontSize="12px"
          fontWeight={600}
          textTransform="uppercase"
          margin="5px 0px"
        >
          {subtitle}
        </Typography>
        <Action onClick={() => callback(choices)} sx={{ fontSize: "12px" }}>
          {gettext("All")}
        </Action>
        <Action onClick={() => callback([])} sx={{ fontSize: "12px" }}>
          {gettext("None")}
        </Action>
      </Box>
      <FormGroup
        sx={{ flexFlow: "row wrap", maxHeight: "50vh", overflowY: "scroll" }}
      >
        {_choices
          .filter(([cat]) =>
            searchTerm.length > 0
              ? cat.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
              : true,
          )
          .sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()))
          .map(([choice, icon]) => (
            <FormControlLabel
              key={choice}
              checked={selected.indexOf(choice) >= 0}
              control={
                <Checkbox
                  icon={<BpIcon />}
                  checkedIcon={
                    <CheckBoxIcon sx={{ fontSize: "32px", margin: "-4px" }} />
                  }
                  sx={{ marginRight: "10px", padding: "0px" }}
                />
              }
              disabled={
                (minimum &&
                  selected.length == minimum &&
                  selected.indexOf(choice) >= 0) ||
                false
              }
              label={
                <Typography>
                  {labels ? labels[choice] : choice}
                  {icon}
                </Typography>
              }
              onChange={() => handleChange(choice)}
              sx={{
                flexBasis: "100%",
                margin: "5px 0px",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  color: "secondary4.main",
                },
              }}
            />
          ))}
      </FormGroup>
    </Box>
  );
};
