import { Fragment, h } from "preact";

import { useTheme } from "@mui/material/styles";

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
import { AnswerChoiceForm, EditorIconsType } from "../types";

function Answer({
  gettext,
  EditorIcons,
  forms,
  addForm,
  deleteForm,
  setForm,
}: {
  gettext: (a: string) => string;
  EditorIcons: EditorIconsType;
  forms: AnswerChoiceForm[];
  addForm: (a: number) => void;
  deleteForm: (a: number) => void;
  setForm: (a: number, form: AnswerChoiceForm) => void;
}): JSX.Element {
  const theme = useTheme();

  return (
    <Stack>
      {forms.map((form, i) => (
        <Fragment key={form.id}>
          <Card>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <CardHeader
                title={"Answer choice"}
                avatar={
                  <Avatar sx={{ bgcolor: theme.palette.secondary1.main }}>
                    <Typography fontSize="16px" color="secondary4">
                      {i + 1}
                    </Typography>
                  </Avatar>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.answer_choice.correct}
                    onChange={() => {
                      if (form.answer_choice.correct) {
                        /* eslint-disable @typescript-eslint/no-unused-vars */
                        const { expert_answers, ..._answer_choice_form } = {
                          ...form.answer_choice,
                        };
                        setForm(i, {
                          ...form,
                          answer_choice: {
                            ..._answer_choice_form,
                            correct: false,
                          },
                        });
                        return;
                      }
                      setForm(i, {
                        ...form,
                        answer_choice: {
                          ...form.answer_choice,
                          correct: !form.answer_choice.correct,
                          expert_answers: [{ rationale: "" }],
                        },
                      });
                    }}
                  />
                }
                label={gettext("Correct answer?")}
              />
            </Stack>
            <Divider />
            <CardContent>
              <Stack spacing={"20px"}>
                <CustomEditorField
                  defaultValue=""
                  EditorIcons={EditorIcons}
                  setValue={(value) =>
                    setForm(i, {
                      ...form,
                      answer_choice: {
                        ...form.answer_choice,
                        text: value,
                      },
                    })
                  }
                  title={gettext("Text *")}
                  value={form.answer_choice.text}
                />

                {form.answer_choice.correct
                  ? form.answer_choice.expert_answers?.map((e, j) => (
                      <CustomEditorField
                        defaultValue=""
                        key={j}
                        EditorIcons={EditorIcons}
                        setValue={(value) => {
                          const _expert_answers = [
                            ...(form.answer_choice.expert_answers || []),
                          ];
                          _expert_answers[j] = { rationale: value };
                          setForm(i, {
                            ...form,
                            answer_choice: {
                              ...form.answer_choice,
                              expert_answers: [..._expert_answers],
                            },
                          });
                        }}
                        title={gettext("Expert rationale *")}
                        value={e.rationale || ""}
                      />
                    ))
                  : null}

                {form.answer_choice.sample_answers.map((s, j) => (
                  <CustomEditorField
                    defaultValue=""
                    key={j}
                    EditorIcons={EditorIcons}
                    setValue={(value) => {
                      const _sample_answers = [
                        ...form.answer_choice.sample_answers,
                      ];
                      _sample_answers[j] = { rationale: value };
                      setForm(i, {
                        ...form,
                        answer_choice: {
                          ...form.answer_choice,
                          sample_answers: [..._sample_answers],
                        },
                      });
                    }}
                    title={gettext("Sample answer *")}
                    value={s.rationale || ""}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
          <CustomAddBox>
            {forms.length > 2 ? (
              <IconButton
                color={"primary"}
                sx={{ mb: "1px" }}
                onClick={() => deleteForm(i)}
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
            ) : null}

            <IconButton
              color={"primary"}
              sx={{ mt: "1px" }}
              onClick={() => addForm(i)}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </CustomAddBox>
        </Fragment>
      ))}
    </Stack>
  );
}

export default Answer;
