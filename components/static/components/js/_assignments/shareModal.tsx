import { h } from "preact";

import { useState } from "preact/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ShareModalProps } from "./types";
import {
  CancelButton,
  FormButtonBox,
  ValidateButton,
} from "../styledComponents";
import { emailValidator } from "../validators";
import { CustomTextField } from "../_reusableComponents/customTextField";
import { Alert, Modal } from "@mui/material";

const style = {
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "780px",
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px",
  padding: "50px",
  borderRadius: "10px",
};

export default function ShareModal({
  gettext,
  open,
  onClose,
}: ShareModalProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const emailValidation = () => {
    return emailValidator(email);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h1" sx={{ margin: "0px" }}>
          Share with a colleague
        </Typography>
        <Typography
          fontSize={"16"}
          sx={{ padding: "20px 0px", textAlign: "justify" }}
        >
          {gettext(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          )}
        </Typography>
        {error != "" ? <Alert severity="error">{error}</Alert> : null}

        <CustomTextField
          gettext={gettext}
          autoFocus={true}
          id="email"
          title="Email adress"
          defaultValue=""
          maxLength={100}
          error={!emailValidation()}
          value={email}
          setValue={(email) => {
            setEmail(email);
            setError("");
          }}
        />
        <FormButtonBox sx={{ margin: "0px" }}>
          <CancelButton onClick={onClose}>
            <Typography>{gettext("Cancel")}</Typography>
          </CancelButton>
          <ValidateButton variant="contained" disabled={!emailValidation()}>
            <Typography>{gettext("Create assignment")}</Typography>
          </ValidateButton>
        </FormButtonBox>
      </Box>
    </Modal>
  );
}
