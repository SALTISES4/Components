import { h } from "preact";
import { useState } from "preact/hooks";

//functions
import { emailValidator } from "../validators";

//styles
import { modal as style } from "./styles";

//material ui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//components
import { CancelButton, FormButtonBox } from "../styledComponents";
import { CustomTextField } from "../_reusableComponents/customTextField";

//types
import { ShareModalProps } from "./types";

export default function ShareModal({
  gettext,
  open,
  onClose,
}: ShareModalProps): JSX.Element {
  const [email, setEmail] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h1" sx={{ margin: "0px" }}>
          {gettext("Share with a colleague")}
        </Typography>
        <Typography sx={{ padding: "20px 0px", textAlign: "justify" }}>
          {gettext(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          )}
        </Typography>
        <CustomTextField
          gettext={gettext}
          autoFocus={true}
          id="email"
          title={gettext("Email address")}
          defaultValue=""
          maxLength={100}
          setValue={(email) => setEmail(email)}
          sx={{ width: "100%" }}
          validator={emailValidator}
          value={email}
        />
        <FormButtonBox sx={{ margin: "0px" }}>
          <CancelButton onClick={onClose}>
            <Typography>{gettext("Cancel")}</Typography>
          </CancelButton>
          <Button variant="contained" disabled={!emailValidator(email)}>
            <Typography>{gettext("Share")}</Typography>
          </Button>
        </FormButtonBox>
      </Box>
    </Modal>
  );
}
