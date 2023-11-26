import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import { titlecase } from "../functions";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import { ErrorsProps } from "./types";

export default function Errors({ errors }: ErrorsProps): JSX.Element | null {
  const [errorsOpen, setErrorsOpen] = useState<boolean[]>([]);

  useEffect(() => {
    setErrorsOpen(errors.map(() => true));
  }, [errors]);

  const closeError = (index: number) => {
    const _errorsOpen = [...errorsOpen];
    _errorsOpen[index] = false;
    setErrorsOpen(_errorsOpen);
  };

  console.info(errors);

  if (errors.some((el) => el && el.length > 0)) {
    return (
      <Box>
        {errors.map((e, i) => (
          <Collapse key={i} in={errorsOpen[i]}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="error"
                  onClick={() => closeError(i)}
                >
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: "2px" }}
            >
              {titlecase(e[0])}
            </Alert>
          </Collapse>
        ))}
      </Box>
    );
  }
  return null;
}
