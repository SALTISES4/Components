import { h } from "preact";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

export function Content({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  return (
    <Card>
      <CardHeader title={"Content"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Box>
            <Typography sx={{ marginLeft: "14px" }}>
              {gettext("Title *")}
            </Typography>
            <TextField required id="title" defaultValue="" />
          </Box>
          <Box>
            <Typography sx={{ marginLeft: "14px" }}>
              {gettext("Text *")}
            </Typography>
            <TextField required id="text" multiline rows={6} defaultValue="" />
          </Box>
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
            <Button variant="outlined" component="label" color="secondary4">
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
