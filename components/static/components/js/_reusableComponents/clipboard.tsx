import { Component, createRef, Fragment, h } from "preact";
import { createPortal } from "preact/compat";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { Snackbar } from "./snackbar";

type CopyBoxProps = {
  children: JSX.Element | JSX.Element[];
  gettext: (a: string) => string;
  text?: string;
};

type CopyBoxState = {
  snackbarIsOpen: boolean;
  snackbarMessage: string;
};

export class CopyBox extends Component<CopyBoxProps, CopyBoxState> {
  state = {
    snackbarIsOpen: false,
    snackbarMessage: "",
  };

  ref = createRef();

  handleCopy = () => {
    console.debug("Copy to clipboard");
    try {
      if (this.props.text) {
        window.navigator.clipboard.writeText(this.props.text);
      } else {
        window.navigator.clipboard.writeText(this.ref.current.innerText);
      }

      this.setState({
        snackbarIsOpen: true,
        snackbarMessage: this.props.gettext("Copied to clipboard."),
      });
    } catch (error) {
      this.setState({
        snackbarIsOpen: true,
        snackbarMessage: this.props.gettext("An error occurred."),
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Button
          onClick={() => this.handleCopy()}
          startIcon={<ContentCopyIcon fontSize="small" />}
          sx={{
            borderRadius: "4px",
            color: "primary",
            padding: "4px 8px",
            width: "fit-content",
            "&:hover": {
              backgroundColor: "primary1",
            },
            "& .MuiTypography-root": {
              fontSize: "0.857143rem!important",
              lineHeight: "1.5!important",
            },
          }}
          title={this.props.gettext("Copy to clipboard.")}
        >
          <Box ref={this.ref}>{this.props.children}</Box>
        </Button>
        {createPortal(
          <Snackbar
            open={this.state.snackbarIsOpen}
            onClose={() => this.setState({ snackbarIsOpen: false })}
            message={this.state.snackbarMessage}
          />,
          document.body,
        )}
      </Fragment>
    );
  }
}
