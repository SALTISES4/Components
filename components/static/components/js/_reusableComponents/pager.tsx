import { h } from "preact";

//components
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//styles
import saltise from "../theme";

//types
import { PagerProps } from "./types";

const NumberButton = ({
  number,
  onClick,
  selected,
}: {
  number: number;
  onClick: (a: number) => void;
  selected: boolean;
}): JSX.Element => {
  return (
    <IconButton
      aria-label="select-page"
      onClick={() => onClick(number - 1)}
      sx={{
        backgroundColor: selected ? saltise.palette.primary.main : "unset",
        border: "solid",
        borderColor: saltise.palette.primary.main,
        borderWidth: "thin",
        color: selected
          ? saltise.palette.background.paper
          : saltise.palette.primary.main,
        pointerEvents: selected ? "none" : "auto",
      }}
    >
      <Box sx={{ fontSize: "16px", width: "20px", height: "20px" }}>
        <Typography
          tag={"p"}
          color={"inherit"}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {number}
        </Typography>
      </Box>
    </IconButton>
  );
};

export const Pager = ({
  back,
  forward,
  toPage,
  currentPage,
  pageSize,
  hits,
}: PagerProps) => {
  const MAX_DOTS = 15; // Off by one error somewhere
  const MAX_NODES = 10;
  const N = Math.ceil(hits / pageSize);

  const allNodes = () =>
    [...Array(N).keys()]
      .slice(2)
      .map((index) => (
        <NumberButton
          key={index}
          number={index}
          selected={currentPage == index - 1}
          onClick={toPage}
        />
      ));

  const someNodes = () => {
    // Show 5 max (first, last, current, next, previous)
    // Need to limit number of placeholder dots when we have large number of search results
    const dots = Math.min(MAX_DOTS, N - 5);
    const x = currentPage + 1;
    const leadingDots = Math.max(0, Math.floor((dots * (x - 3)) / (N - 5)));
    const trailingDots = Math.max(
      0,
      Math.floor((dots * (N - x - 2)) / (N - 5)),
    );
    let leadingDotCount = 0;
    let trailingDotCount = 0;

    return [...Array(N).keys()].slice(2).map((index) => {
      if (index < currentPage || index > currentPage + 2) {
        if (index < currentPage && leadingDotCount <= leadingDots) {
          leadingDotCount = leadingDotCount + 1;
          return (
            <Box
              key={index}
              width="5px"
              height="5px"
              sx={{
                backgroundColor: saltise.palette.primary.main,
                borderRadius: "50%",
              }}
            />
          );
        }
        if (index > currentPage + 2 && trailingDotCount <= trailingDots) {
          trailingDotCount = trailingDotCount + 1;
          return (
            <Box
              key={index}
              width="5px"
              height="5px"
              sx={{
                backgroundColor: saltise.palette.primary.main,
                borderRadius: "50%",
              }}
            />
          );
        }
        return null;
      }
      return (
        <NumberButton
          key={index}
          number={index}
          selected={currentPage == index - 1}
          onClick={toPage}
        />
      );
    });
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      mt="32px"
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <IconButton
        aria-label="previous"
        disabled={currentPage == 0}
        onClick={back}
        sx={{ border: "solid", borderWidth: "thin" }}
      >
        <ArrowLeftIcon />
      </IconButton>

      <NumberButton number={1} selected={currentPage == 0} onClick={toPage} />

      {N <= MAX_NODES ? allNodes() : someNodes()}

      {hits > pageSize ? (
        <NumberButton
          number={N}
          selected={currentPage == N - 1}
          onClick={toPage}
        />
      ) : null}

      <IconButton
        aria-label="next"
        disabled={currentPage == N - 1}
        onClick={forward}
        sx={{ border: "solid", borderWidth: "thin" }}
      >
        <ArrowRightIcon />
      </IconButton>
    </Stack>
  );
};
