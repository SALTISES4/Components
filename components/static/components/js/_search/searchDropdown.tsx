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

import { BpIcon } from "../styledComponents";

export const SearchDropdown = ({
  gettext,
  callback,
  choices,
  labels,
  minimum,
  subtitle,
  selected,
  title,
}: SearchDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 5;

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
        width: "220px",
        boxShadow: "0px 0px 4px rgb(0,0,0.1)",
        borderRadius: "4px",
        backgroundColor: "background.paper",
        padding: "10px 10px 5px 10px",
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      {choices.length > limit ? (
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
      <Typography
        fontSize="10px"
        fontWeight={600}
        textTransform="uppercase"
        margin="5px 0px"
      >
        {subtitle}
      </Typography>
      <FormGroup>
        {choices
          .filter((cat) =>
            searchTerm.length > 0
              ? cat.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
              : true,
          )
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
          .slice(0, limit)
          .map((choice: string) => (
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
              label={labels ? labels[choice] : choice}
              onChange={() => handleChange(choice)}
              sx={{
                margin: "5px 0px",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                  color: "secondary4.main",
                },
              }}
            />
          ))}
      </FormGroup>
      {choices.length > limit && searchTerm.length == 0 ? (
        <Typography
          tag="div"
          sx={{ minHeight: "24px", ml: "34px", mt: "5px" }}
        >{`+${choices.length - limit} ${gettext("more")}`}</Typography>
      ) : null}
    </Box>
  );
};
