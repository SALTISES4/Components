import saltise from "./theme";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const theme = saltise;

export const BpIcon = styled(Box)({
  borderRadius: "3px",
  width: "24px",
  height: "24px",
  backgroundColor: "white",
  borderColor: "darkGrey.main",
  borderStyle: "solid",
  borderWidth: "1px",
  boxSizing: "border-box",
});

export const CircularBox = styled(Box)({
  position: "relative",
  display: "inline-flex",
  borderRadius: "100%",
  width: "20px",
  height: "20px",
  margin: "10px",
});

export const Subtitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "20px",
});

export const Tag = styled(Box)({
  color: theme.palette.secondary4.main,
  cursor: "default",
  backgroundColor: theme.palette.secondary1.main,
  borderRadius: "5px",
  borderWidth: "1px",
  display: "flex",
  padding: "5px",
  alignItems: "center",
  " .MuiTypography-root": {
    fontSize: "12px",
    lineHeight: "16px",
  },
  " .MuiSvgIcon-root": {
    paddingRight: "6px",
  },
  contained: {
    backgroundColor: "#fff",
  },
});

export const Filter = styled(Button)({
  color: theme.palette.secondary4.main,
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 10px",
  margin: "5px 5px",
  alignItems: "center",
  borderStyle: "solid",
  borderWidth: "1px",
  backgroundColor: "inherit",
  " .MuiTypography-root": {
    fontSize: "12px",
  },
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

export const Notification = styled(Box)({
  backgroundColor: "#D70000",
  height: "13px",
  width: "13px",
  position: "relative",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  " .MuiTypography-root": {
    fontSize: "8px",
    lineHeight: "8px",
    color: "#fff",
  },
});

export const SharedTag = styled(Box)({
  backgroundColor: theme.palette.new.main,
  marginLeft: "12px",
  padding: "4px 20px",
  borderRadius: "4px 4px 0px 0px",
  width: "fit-content",
  " .MuiTypography-root": {
    fontSize: "12px",
    lineHeight: "22px",
    color: theme.palette.newTint.main,
  },
});

export const CustomAddBox = styled(Box)({
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

export const StepBar = styled(Box)({
  marginTop: "20px",
  marginBottom: "30px",
  height: "12px",
  borderRadius: "4px",
});

export const Action = styled(Typography)({
  color: theme.palette.primary.main,
  cursor: "pointer",
  fontSize: "0.9rem",
  textDecoration: "underline",
});

export const CancelButton = styled(Button)({
  color: theme.palette.secondary4.main,
  border: "solid 1px",
  borderColor: theme.palette.secondary4.main,
});

export const FormButtonBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  margin: "50px 0px",
});
