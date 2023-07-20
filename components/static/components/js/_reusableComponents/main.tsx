import { h } from "preact";

import Container from "@mui/material/Container";

export const Main = ({ ...props }) => {
  return (
    <Container maxWidth="md" width="100%">
      {props.children}
    </Container>
  );
};
