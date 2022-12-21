import { h } from "preact";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import SearchIcon from "@mui/icons-material/Search";

import { BpIcon } from "../styledComponents";

export const SearchDropdown = (props) => {
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
      }}
    >
      {props.choices.length > 5 ? (
        <Box
          sx={{
            border: "solid 1px",
            borderColor: "secondary2.main",
            color: "secondaryGrey.main",
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          <SearchIcon sx={{ margin: "10px" }} />
          <Typography fontSize="14px"> Find {props.title}...</Typography>
        </Box>
      ) : null}
      <Typography
        fontSize="10px"
        fontWeight={600}
        textTransform="uppercase"
        color="secondary4.main"
        margin="5px 0px"
      >
        {props.subtitle}
      </Typography>
      <FormGroup>
        {props.choices.map((choice) => (
          <FormControlLabel
            key={choice.title}
            control={
              <Checkbox
                icon={<BpIcon />}
                checkedIcon={
                  <CheckBoxIcon sx={{ fontSize: "32px", margin: "-4px" }} />
                }
                sx={{ marginRight: "10px", padding: "0px" }}
              />
            }
            label={choice}
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
    </Box>
  );
};
