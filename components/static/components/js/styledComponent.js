import saltise from "./theme.js";
import styled from "@mui/system/styled";

export const CircularBox = styled("div")({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  backgroundColor: saltise.palette.paleOrange.main,
  background: saltise.palette.paleOrange.main,
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

export const SubtitleBar = styled("div")({
  // width: "100%px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "15px",
});

export const Tag = styled("div")({
  color: saltise.palette.secondary4.main,
  backgroundColor: saltise.palette.secondary1.main,
  borderRadius: "5px",
  display: "flex",
  padding: "5px",
  alignItems: "center",
});
