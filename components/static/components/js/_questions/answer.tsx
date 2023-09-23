import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

//material ui components
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CustomAddBox } from "../styledComponents";
import { CustomEditorField } from "../_reusableComponents/customEditorField";

//types
import { EditorIconsType } from "../types";
import { AnswerChoiceType, AnswerType } from "../_localComponents/types";
type AnswerChoiceForm = {
  answer: AnswerType | null;
  answer_choice: AnswerChoiceType | null;
};

function Answer({
  gettext,
  EditorIcons,
  forms,
}: {
  gettext: (a: string) => string;
  EditorIcons: EditorIconsType;
  forms: AnswerChoiceForm[];
}): JSX.Element {
  return (
    <Fragment>
      {forms.map((form, i) => (
        <Fragment key={i}>
          <Card>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <CardHeader
                title={"Answer choice"}
                avatar={
                  <Avatar>
                    <Typography fontSize="16px" color="secondary4">
                      {i + 1}
                    </Typography>
                  </Avatar>
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label={gettext("Correct answer?")}
                onChange={() => {}}
                value={false}
              />
            </Stack>
            <Divider />
            <CardContent>
              <Stack spacing={"20px"}>
                <CustomEditorField
                  defaultValue=""
                  EditorIcons={EditorIcons}
                  setValue={() => {}}
                  title="Text *"
                  value=""
                />
                <CustomEditorField
                  defaultValue=""
                  EditorIcons={EditorIcons}
                  setValue={() => {}}
                  title="Rationale *"
                  value=""
                />
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
        </Fragment>
      ))}
    </Fragment>
  );
}

export default Answer;
