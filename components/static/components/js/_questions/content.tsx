import { h } from "preact";

import { questionTextValidator, questionTitleValidator } from "../validators";

//material ui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CustomTextField } from "../_reusableComponents/customTextField";
import { CustomEditorField } from "../_reusableComponents/customEditorField";

//types
import { EditorIconsType } from "../types";

export function Content({
  gettext,
  EditorIcons,
  text,
  title,
  setText,
  setTitle,
}: {
  gettext: (a: string) => string;
  EditorIcons: EditorIconsType;
  text: string;
  title: string;
  setText: (a: string) => void;
  setTitle: (a: string) => void;
}): JSX.Element {
  return (
    <Card>
      <CardHeader title={"Content"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <CustomTextField
            gettext={gettext}
            autoFocus={true}
            id="title"
            title="Title *"
            defaultValue=""
            minLength={1}
            maxLength={100}
            setValue={setTitle}
            validator={questionTitleValidator}
            value={title}
          />
          <CustomEditorField
            title="Text *"
            EditorIcons={EditorIcons}
            setValue={setText}
            validator={questionTextValidator}
            value={text}
          />

          <Box>
            <FormLabel id="type">
              <Typography sx={{ marginBottom: "12px" }}>
                {gettext("Type *")}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="type-radio-group"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="peerInstruction"
                control={<Radio />}
                label="Peer instruction"
              />
              <FormControlLabel
                value="rationalOnly"
                control={<Radio />}
                label="Rationale only"
              />
            </RadioGroup>
          </Box>
          <Box>
            <Typography>{gettext("Question image")}</Typography>
            <Button variant="outlined" color="secondary4">
              <Typography>{gettext("Choose File")}</Typography>
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <Typography>
              {gettext(" Accepted formats: .jpg .jpeg .png .gif")}
            </Typography>
          </Box>
          <Box>
            <FormLabel id="answer-style">
              <Typography>{gettext("Answer style *")}</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="style-radio-group"
              name="style-buttons-group"
            >
              <FormControlLabel
                value="alphabetic"
                control={<Radio />}
                label="Alphabetic"
              />
              <FormControlLabel
                value="numeric"
                control={<Radio />}
                label="Numeric"
              />
            </RadioGroup>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
