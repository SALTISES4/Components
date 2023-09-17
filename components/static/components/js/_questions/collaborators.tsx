import { h } from "preact";
import { useState } from "preact/hooks";

//functions
import { get } from "../ajax";

//mui components
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

//types
import { UsernameType } from "../_localComponents/types";

function Collaborators({
  gettext,
  setUserValues,
  userValues,
  url,
}: {
  gettext: (a: string) => string;
  setUserValues: (a: string[]) => void;
  userValues: string[];
  url: string;
}): JSX.Element {
  const [userOptions, setUserOptions] = useState<UsernameType[]>([]);

  const handleChange = async (evt: InputEvent) => {
    // List of users is dependent on search term
    if (evt.target) {
      const searchTerm = (evt.target as HTMLInputElement).value;
      if (searchTerm != "" && searchTerm != undefined) {
        const _url = new URL(
          url,
          window.location.origin + window.location.pathname,
        );

        const queryString = new URLSearchParams(
          searchTerm
            .split(/\s+/)
            .map((term) => ["username__wildcard", `*${term}*`]),
        );

        try {
          const usernames = await get(`${_url}?${queryString.toString()}`);
          setUserOptions(usernames as UsernameType[]);
        } catch (error: any) {
          console.info(error);
        }
      } else {
        setUserOptions([]);
      }
    }
  };

  return (
    <Card>
      <CardHeader title={gettext("Collaborators")} />
      <Divider />
      <CardContent>
        <Autocomplete
          disablePortal
          filterOptions={(x) => x}
          filterSelectedOptions={true}
          multiple
          onChange={(event: any, newValue: string[]) => {
            setUserValues(newValue);
          }}
          onInputChange={handleChange}
          options={userOptions.map((u) => u.username)}
          renderInput={(params) => (
            // @ts-ignore
            <TextField
              {...params}
              label={gettext("Users")}
              variant="outlined"
            />
          )}
          value={userValues}
        />
      </CardContent>
    </Card>
  );
}

export default Collaborators;
