import saltise from "./theme.js";
import styled from "@mui/system/styled";

export const CircularBox = styled("div")({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  margin: "10px",
});

export const DashboardBar = styled("div")({
  color: saltise.palette.neutral.main,
  backgroundColor: "#fff",
  borderRadius: "20px",
  width: "68%px",
  minWidth: "250px",
  maxWidth: "750px",
  height: "45px",
  marginTop: "30px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
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

export const Subtitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "20px",
});

export const Tag = styled("div")({
  color: saltise.palette.secondary4.main,
  backgroundColor: saltise.palette.secondary1.main,
  borderRadius: "5px",
  display: "flex",
  padding: "5px",
  alignItems: "center",
});

export const Filter = styled("Button")({
  color: saltise.palette.secondary4.main,
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
    backgroundColor: saltise.palette.secondary4.main,
    color: "#fff",
  },
  "&:hover": {
    boxShadow: "none",
    backgroundColor: saltise.palette.secondary4.main,
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
