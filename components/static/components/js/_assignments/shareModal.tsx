import { h } from "preact";
import { useState } from "preact/hooks";

//functions
import { emailValidator } from "../validators";

//material ui components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//components
import {
  CancelButton,
  FormButtonBox,
  ValidateButton,
} from "../styledComponents";
import { CustomTextField } from "../_reusableComponents/customTextField";

//types
import { ShareModalProps } from "./types";

const style = {
  boxSizing: "border-box",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "780px",
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
          {gettext("Share with a colleague")}
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
          title={gettext("Email address")}
          defaultValue=""
          maxLength={100}
          error={!emailValidation()}
          value={email}
          setValue={(email) => {
            setEmail(email);
            setError("");
          }}
          sx={{ width: "100%" }}
        />
        <FormButtonBox sx={{ margin: "0px" }}>
          <CancelButton onClick={onClose}>
            <Typography>{gettext("Cancel")}</Typography>
          </CancelButton>
          <ValidateButton variant="contained" disabled={!emailValidation()}>
            <Typography>{gettext("Share")}</Typography>
          </ValidateButton>
        </FormButtonBox>
      </Box>
    </Modal>
  );
}
