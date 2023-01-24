import { h } from "preact";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  margin: "72px -8px -8px",
  padding: "5px 217px",
  backgroundColor: "white",
  position: "relative",
  zIndex: "2000",
  display: "flex",
  justifyContent: "flex-end",
};

export function SaveBar({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  return (
    <Box sx={style}>
      <Button variant="outlined" color="secondary4" sx={{ margin: "15px" }}>
        <Typography>{gettext("Cancel")}</Typography>
      </Button>
      <Button variant="contained" color="primary" sx={{ margin: "15px" }}>
        <Typography>{gettext("Save and continue")}</Typography>
      </Button>
    </Box>
  );
}
