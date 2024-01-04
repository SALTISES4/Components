import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

// MUI components
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Types
import { InstitutionType, DisciplineType } from "../_localComponents/types";

export function Profile({
  gettext,
  disciplineOptions,
  disciplines,
  institutionOptions,
  institutions,
}: {
  gettext: (a: string) => string;
  disciplineOptions: DisciplineType[];
  disciplines: number[];
  institutionOptions: InstitutionType[];
  institutions: number[];
}): JSX.Element {
  const [disciplineInputValue, setDisciplineInputValue] = useState("");
  const [disciplineValues, setDisciplineValues] =
    useState<number[]>(disciplines);
  const [institutionInputValue, setInstitutionInputValue] = useState("");
  const [institutionValues, setInstitutionValues] =
    useState<number[]>(institutions);

  return (
    <Fragment>
      <Card>
        <CardHeader title={gettext("Settings")} />
        <Divider />
        <CardContent>
          <Stack spacing={"20px"}>
            <Typography>
              {gettext(
                "Select content disciplines and the institutions where you teach.  You can select multiple choices.",
              )}
            </Typography>
            <Autocomplete
              disablePortal
              getOptionLabel={(pk) => {
                if (disciplineOptions.length > 0) {
                  return disciplineOptions.filter((e) => e.pk == pk)[0].title;
                }
                return "";
              }}
              inputValue={disciplineInputValue}
              multiple
              onChange={(event: any, newValue: number[]) => {
                setDisciplineValues(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setDisciplineInputValue(newInputValue);
              }}
              options={disciplineOptions.map((d) => d.pk)}
              renderInput={(params) => (
                // @ts-ignore
                <TextField
                  {...params}
                  label={gettext("Disciplines")}
                  variant="outlined"
                />
              )}
              value={disciplineValues}
            />
            <select multiple hidden name="disciplines">
              {disciplineOptions.map((d, i) => (
                // Render hidden html select elements
                <option
                  key={i}
                  value={d.pk}
                  selected={disciplineValues.includes(d.pk)}
                >
                  {d.title}
                </option>
              ))}
            </select>
            <Autocomplete
              disablePortal
              getOptionLabel={(pk) => {
                if (institutionOptions.length > 0) {
                  return institutionOptions.filter((e) => e.pk == pk)[0].name;
                }
                return "";
              }}
              inputValue={institutionInputValue}
              multiple
              onChange={(event: any, newValue: number[]) => {
                setInstitutionValues(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInstitutionInputValue(newInputValue);
              }}
              options={institutionOptions.map((i) => i.pk)}
              renderInput={(params) => (
                // @ts-ignore
                <TextField
                  {...params}
                  label={gettext("Institutions")}
                  variant="outlined"
                />
              )}
              value={institutionValues}
            />
            <select multiple hidden name="institutions">
              {institutionOptions.map((i, j) => (
                // Render hidden html select elements
                <option
                  key={j}
                  value={i.pk}
                  selected={institutionValues.includes(i.pk)}
                >
                  {i.name}
                </option>
              ))}
            </select>
          </Stack>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          margin: "50px 0px 0px 0px",
        }}
      >
        <Button type="submit" variant="contained">
          <Typography>{gettext("Save")}</Typography>
        </Button>
      </Box>
    </Fragment>
  );
}
