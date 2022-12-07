import { h } from "preact";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import SearchIcon from "@mui/icons-material/Search";

import saltise from "../theme";

export const SearchDropdown = (props) => {
  const Categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];
  const theme = saltise;
  return (
    <Box
      position="absolute"
      sx={{
        width: "220px",
        boxShadow: "0px 0px 4px rgb(0,0,0.1)",
        borderRadius: "4px",
        backgroundColor: theme.palette.background.paper,
        padding: "11px 10px 10px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          border: "solid 1px",
          borderColor: theme.palette.secondary2.main,
          color: theme.palette.secondaryGrey.main,
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          mb: "5px",
        }}
      >
        <SearchIcon sx={{ margin: "10px" }} />
        <Typography fontSize="14px"> Find {props.filter}...</Typography>
      </Box>
      <Typography
        fontSize="10px"
        fontWeight={600}
        textTransform="uppercase"
        color="secondary4.main"
      >
        {props.title}
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "32px" },
                padding: "0px",
                margin: "10px 6px 0px",
              }}
            />
          }
          label={Categories[0]}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              color: "secondary4.main",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "32px" },
                padding: "0px",
                margin: "6px",
              }}
            />
          }
          label={Categories[1]}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              color: "secondary4.main",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "32px" },
                padding: "0px",
                margin: "6px",
              }}
            />
          }
          label={Categories[3]}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              color: "secondary4.main",
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "32px" },
                padding: "0px",
                margin: "6px",
              }}
            />
          }
          label={Categories[4]}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              color: "secondary4.main",
            },
          }}
        />
      </FormGroup>
    </Box>
  );
};
