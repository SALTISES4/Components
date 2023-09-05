import { h } from "preact";
import { useState } from "preact/hooks";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

function Collaborators({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  const [{ discipline }, setDiscipline] = useState<{
    discipline: string;
  }>({
    discipline: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target) {
      setDiscipline((event.target as HTMLInputElement).value);
    }
  };

  return (
    <Card>
      <CardHeader title={gettext("Collaborators")} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Box>
            <Typography>{gettext("Users")}</Typography>
            <FormControl fullWidth>
              <InputLabel id="discipline-select-input" />
              <Select
                labelId="discipline-select-label"
                id="discipline-select"
                value={discipline}
                label=""
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Collaborators;
