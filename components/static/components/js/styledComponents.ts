import saltise from "./theme";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const theme = saltise;

export const BpIcon = styled("span")({
  borderRadius: "3px",
  width: "24px",
  height: "24px",
  backgroundColor: "white",
  borderColor: "darkGrey.main",
  borderStyle: "solid",
  borderWidth: "1px",
  boxSizing: "border-box",
});

export const CircularBox = styled("div")({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  margin: "10px",
});

export const SearchBar = styled("div")({
  backgroundColor: "#fff",
  borderRadius: "4px",
  padding: "15px",
  margin: "1px 0px 5px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Subtitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "20px",
});

export const Tag = styled(Box)({
  color: theme.palette.secondary4.main,
  backgroundColor: theme.palette.secondary1.main,
  borderRadius: "5px",
  display: "flex",
  padding: "5px",
  alignItems: "center",
});

export const Filter = styled("Button")({
  color: theme.palette.secondary4.main,
  borderRadius: "10px",
  display: "flex",
  padding: "0px 10px",
  margin: "5px 5px",
  alignItems: "center",
  borderStyle: "solid",
  borderWidth: "1px",
  backgroundColor: "inherit",
  "&:active": {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary4.main,
    color: "#fff",
  },
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary4.main,
    color: "#fff",
  },
});

export const Notification = styled("div")({
  backgroundColor: "#D70000",
  height: "13px",
  width: "13px",
  position: "relative",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "7px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SharedTag = styled("div")({
  backgroundColor: theme.palette.purple.main,
  marginLeft: "12px",
  padding: "4px 20px",
  borderRadius: "4px 4px 0px 0px",
  width: "fit-content",
  " .MuiTypography-root": {
    fontSize: "12px",
    lineHeight: "22px",
    color: theme.palette.palePurple.main,
  },
});

export const CustomAddBox = styled("div")({
  backgroundColor: theme.palette.secondary1.main,
  padding: "6px 0px",
  borderRadius: "0px 4px 4px 0px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  bottom: "99px",
  width: "fit-content",
  left: "100%",
});

export const StepBar = styled("div")({
  marginTop: "20px",
  marginBottom: "30px",
  height: "12px",
  borderRadius: "4px",
});
