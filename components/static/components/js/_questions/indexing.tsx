import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

//functions
import { get } from "../ajax";

//mui components
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

//types
import { CategoryType, DisciplineType } from "../_localComponents/types";
function Indexing({
  gettext,
  categoryValues,
  disciplineValue,
  setCategoryValues,
  setDisciplineValue,
  urls,
}: {
  gettext: (a: string) => string;
  categoryValues: string[];
  disciplineValue: number | null;
  setCategoryValues: (a: string[]) => void;
  setDisciplineValue: (a: number | null) => void;
  urls: { categories: string; disciplines: string };
}): JSX.Element {
  const [categoryOptions, setCategoryOptions] = useState<CategoryType[]>([]);
  const [disciplineOptions, setDisciplineOptions] = useState<DisciplineType[]>(
    [],
  );
  const [disciplineInputValue, setDisciplineInputValue] = useState("");

  useEffect(() => {
    // Get list of disciplines to display on mount
    try {
      (async function () {
        const disciplines = await get(urls.disciplines);
        setDisciplineOptions(disciplines as DisciplineType[]);
      })();
    } catch (error: any) {
      console.info(error);
    }
  }, [urls.disciplines]);

  const handleChange = async (evt: InputEvent) => {
    // List of categories is dependent on search term
    if (evt.target) {
      const searchTerm = (evt.target as HTMLInputElement).value;
      if (searchTerm != "") {
        const url = new URL(
          urls.categories,
          window.location.origin + window.location.pathname,
        );
        const queryString = new URLSearchParams(
          searchTerm
            .split(/\s+/)
            .map((term) => ["title__wildcard", `*${term}*`]),
        );
        try {
          const categories = await get(`${url}?${queryString.toString()}`);
          setCategoryOptions(categories as CategoryType[]);
        } catch (error: any) {
          console.info(error);
        }
      } else {
        setCategoryOptions([]);
      }
    }
  };

  return (
    <Card>
      <CardHeader title={"Indexing"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Autocomplete
            disablePortal
            getOptionLabel={(pk) =>
              disciplineOptions.filter((e) => e.pk == pk)[0].title
            }
            inputValue={disciplineInputValue}
            onChange={(event: any, newValue: number | null) => {
              setDisciplineValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setDisciplineInputValue(newInputValue);
            }}
            options={disciplineOptions.map((d) => d.pk)}
            renderInput={(params) => (
              // @ts-ignore
              <TextField
                {...params}
                label={gettext("Discipline")}
                variant="outlined"
              />
            )}
            value={disciplineValue}
          />
          <Autocomplete
            disablePortal
            filterOptions={(x) => x}
            multiple
            onChange={(event: any, newValue: string[]) => {
              setCategoryValues(newValue);
            }}
            onInputChange={handleChange}
            options={categoryOptions.map((c) => c.title)}
            renderInput={(params) => (
              // @ts-ignore
              <TextField
                {...params}
                label={gettext("Categories")}
                variant="outlined"
              />
            )}
            value={categoryValues}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Indexing;
