import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

//functions
import { get } from "../ajax";

//mui components
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

//types
import { DisciplineType } from "../_localComponents/types";
function Indexing({
  gettext,
  setValue,
  url,
  value,
}: {
  gettext: (a: string) => string;
  setValue: (a: number | null) => void;
  url: string;
  value: number | null;
}): JSX.Element {
  const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);
  const [inputValue, setInputValue] = useState("");

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

  return (
    <Card>
      <CardHeader title={"Indexing"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Box>
            <Autocomplete
              disablePortal
              getOptionLabel={(pk) =>
                disciplines.filter((e) => e.pk == pk)[0].title
              }
              options={disciplines.map((d) => d.pk)}
              renderInput={(params) => (
                // @ts-ignore
                <TextField
                  {...params}
                  label={gettext("Discipline")}
                  variant="outlined"
                />
              )}
              onChange={(event: any, newValue: number | null) => {
                setValue(newValue);
              }}
              value={value}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Indexing;
