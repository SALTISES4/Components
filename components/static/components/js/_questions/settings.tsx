import { h } from "preact";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

function Settings({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  return (
    <Card>
      <CardHeader title={"Settings"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <FormGroup>
            {/* <FormControlLabel
              control={<Checkbox />}
              label={gettext("Add fake attribution")}
            /> */}
            <FormControlLabel
              control={<Checkbox />}
              label={gettext("Sequential rational review")}
            />
          </FormGroup>
          <Box>
            <FormLabel id="algorithm">
              <Typography>
                {gettext("Rationale section algorithm*")}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="algorithm-radio-group"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="popular"
                control={<Radio />}
                label={gettext("Prefer export and highly votes rationales")}
              />
              <FormControlLabel
                value="random"
                control={<Radio />}
                label={gettext("Simple random rationale selection")}
              />
            </RadioGroup>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Settings;
