import { createTheme } from "@mui/material/styles";

const saltise = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    primary: {
      main: "#54c0db",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 12,
  },
});

export default saltise;
