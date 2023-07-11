import { h } from "preact";

//components
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//types
import { PagerProps } from "./types";

export const Pager = ({
  gettext,
  back,
  forward,
  currentPage,
  pageSize,
  hits,
}: PagerProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      mt="12px"
      sx={{ justifyContent: "center" }}
    >
      <Link
        color={currentPage == 0 ? "disabled" : "primary"}
        variant="h4"
        onClick={back}
        sx={{
          cursor: currentPage == 0 ? "not-allowed" : "pointer",
        }}
        underline={currentPage == 0 ? "none" : "always"}
      >
        {gettext("Previous")}
      </Link>

      <Typography>
        {currentPage + 1}/{Math.ceil(hits / pageSize)}
      </Typography>

      <Link
        color={hits > (currentPage + 1) * pageSize ? "primary" : "disabled"}
        variant="h4"
        onClick={forward}
        sx={{
          cursor:
            hits > (currentPage + 1) * pageSize ? "pointer" : "not-allowed",
        }}
        underline={hits > (currentPage + 1) * pageSize ? "always" : "none"}
      >
        {gettext("Next")}
      </Link>
    </Stack>
  );
};
