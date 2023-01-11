import { h } from "preact";
import { useState } from "preact/hooks";

import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { CustomAddBox } from "../js/styledComponents";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export function Answer({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  const [check, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box>
      <Card>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardHeader
            title={"Answer choice"}
            avatar={
              <Avatar>
                <Typography fontSize="16px" color="secondary4">
                  1
                </Typography>
              </Avatar>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            onChange={handleChange}
            label={gettext("Correct Answer")}
          />
        </Box>
        <Divider />
        <CardContent>
          <Stack spacing={"20px"}>
            <Box>
              <Typography sx={{ marginLeft: "14px" }}>
                {gettext("Text *")}
              </Typography>
              <TextField
                required
                id="text"
                multiline
                rows={6}
                defaultValue=""
              />
            </Box>
            {check ? (
              <Box>
                <Typography sx={{ marginLeft: "14px" }}>
                  {gettext("Rationale *")}
                </Typography>
                <TextField
                  required
                  id="text"
                  multiline
                  rows={6}
                  defaultValue=""
                />
              </Box>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
      <CustomAddBox>
        <IconButton sx={{ mb: "1px" }}>
          <RemoveCircleIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ mt: "1px" }}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </CustomAddBox>
    </Box>
  );
}
