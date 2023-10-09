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

    // Get default list of categories to display on mount
    search("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.disciplines]);

  const search = async (searchTerm: string) => {
    const url = new URL(
      urls.categories,
      window.location.origin + window.location.pathname,
    );

    let queryString;

    if (searchTerm == "" || searchTerm == undefined) {
      searchTerm = "a";
      queryString = new URLSearchParams(
        searchTerm.split(/\s+/).map((term) => ["title__wildcard", `${term}*`]),
      );
    } else {
      queryString = new URLSearchParams(
        searchTerm
          .split(/\s+/)
          .map((term) => ["title__wildcard", `*${term}*`]),
      );
    }

    try {
      const categories = await get(`${url}?${queryString.toString()}`);
      setCategoryOptions(categories as CategoryType[]);
    } catch (error: any) {
      console.info(error);
    }
  };

  const handleChange = async (evt: InputEvent) => {
    // List of categories is dependent on search term
    if (evt.target) {
      const searchTerm = (evt.target as HTMLInputElement).value;
      search(searchTerm);
    }
  };

  return (
    <Card>
      <CardHeader title={gettext("Indexing")} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <Autocomplete
            disablePortal
            getOptionLabel={(pk) => {
              if (disciplineOptions.length > 0) {
                return disciplineOptions.filter((e) => e.pk == pk)[0].title;
              }
              return "";
            }}
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
            filterSelectedOptions={true}
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
