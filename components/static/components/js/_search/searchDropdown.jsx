import { h } from "preact";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import SearchIcon from "@mui/icons-material/Search";

import saltise from "../theme";

export const SearchDropdown = (props) => {
  const theme = saltise;
  return (
    <Box
      position="absolute"
      sx={{
        width: "220px",
        boxShadow: "0px 0px 4px rgb(0,0,0.1)",
        borderRadius: "4px",
        backgroundColor: theme.palette.background.paper,
        padding: "10px 10px 5px 10px",
        boxSizing: "border-box",
      }}
    >
      {props.choices.length > 5 ? (
        <Box
          sx={{
            border: "solid 1px",
            borderColor: theme.palette.secondary2.main,
            color: theme.palette.secondaryGrey.main,
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
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: "32px" },
                  padding: "0px",
                  margin: "1px 6px 1px",
                }}
              />
            }
            label={choice}
            sx={{
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
