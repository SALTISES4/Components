import { h } from "preact";
import { useState } from "preact/hooks";

import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { CustomAddBox } from "../js/styledComponents";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { TextInputBox } from "../js/_reusableComponents/textInputBox";

export function Answer({
  gettext,
}: {
  gettext: (a: string) => string;
}): JSX.Element {
  const [{ check, anchorElChange }, setChecked] = useState<{
    check: boolean;
    anchorElChange: null | HTMLElement;
  }>({
    check: false,
    anchorElChange: null,
  });

  const handleChange = (event: MouseEvent | TouchEvent) => {
    setChecked((prevState) => ({
      check: !prevState.check,
      anchorElChange: !prevState.check ? (event.target as HTMLElement) : null,
    }));
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
            anchorEl={anchorElChange}
          />
        </Box>
        <Divider />
        <CardContent>
          <Stack spacing={"20px"}>
            <TextInputBox
              id="answer-text"
              title="Text *"
              rows={6}
              defaultValue=""
            />

            {check ? (
              <TextInputBox
                id="rationale"
                title="Rationale *"
                rows={6}
                defaultValue=""
              />
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
