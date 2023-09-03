import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

//functions
import { get } from "../ajax";

//mui components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//types
import { DisciplineType } from "../_localComponents/types";
function Indexing({
  gettext,
  setValue,
  url,
  value,
}: {
  gettext: (a: string) => string;
  setValue: (a: number) => void;
  url: string;
  value: number | undefined;
}): JSX.Element {
  const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);

  useEffect(() => {
    // Get list of disciplines to display
    try {
      (async function () {
        const disciplines = await get(url);
        setDisciplines(disciplines as DisciplineType[]);
      })();
    } catch (error: any) {
      console.info(error);
    }
  }, [url]);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target) {
      setValue(parseInt((event.target as HTMLInputElement).value));
    }
  };

  return (
    <Card>
      <CardHeader title={"Indexing"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Box>
            <Typography variant="h5" sx={{ mb: "2px" }}>
              {gettext("Discipline")}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="discipline-select-input" />
              <Select
                labelId="discipline-select-label"
                id="discipline-select"
                value={value?.toString()}
                label=""
                onChange={handleChange}
              >
                {disciplines.map((d) => (
                  <MenuItem key={d.pk} value={d.pk}>
                    {d.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Indexing;
