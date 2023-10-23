import { Fragment, h } from "preact";

import { v1 as uuid } from "uuid";

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
        <Fragment key={form.formId}>
          <Card>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <CardHeader
                title={gettext("Answer choice")}
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
                    checked={form.correct}
                    onChange={() => {
                      if (form.correct) {
                        /* eslint-disable @typescript-eslint/no-unused-vars */
                        const { expert_answers, ..._answer_choice_form } = {
                          ...form,
                        };
                        setForm(i, {
                          ..._answer_choice_form,
                          correct: false,
                        });
                        return;
                      }
                      setForm(i, {
                        ...form,
                        correct: !form.correct,
                        expert_answers: [{ formId: uuid(), rationale: "" }],
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
                      text: value,
                    })
                  }
                  title={gettext("Text *")}
                  value={form.text}
                />

                {form.correct
                  ? form.expert_answers?.map((e, j) => (
                      <Fragment key={e.formId}>
                        <CustomEditorField
                          defaultValue=""
                          EditorIcons={EditorIcons}
                          setValue={(value) => {
                            const _expert_answers = [
                              ...(form.expert_answers || []),
                            ];
                            _expert_answers[j].rationale = value;
                            setForm(i, {
                              ...form,
                              expert_answers: [..._expert_answers],
                            });
                          }}
                          title={
                            gettext("Expert rationale") + (j == 0 ? " *" : "")
                          }
                          value={e.rationale || ""}
                        />
                        {form.expert_answers &&
                        form.expert_answers.length > 1 ? (
                          <IconButton
                            color={"primary"}
                            sx={{ mb: "1px" }}
                            onClick={() => {
                              const _expert_answers = [
                                ...(form.expert_answers || []),
                              ];
                              _expert_answers.splice(j, 1);
                              setForm(i, {
                                ...form,
                                expert_answers: [..._expert_answers],
                              });
                            }}
                          >
                            <RemoveCircleIcon fontSize="large" />
                          </IconButton>
                        ) : null}
                      </Fragment>
                    ))
                  : null}

                {form.sample_answers.map((s, j) => (
                  <Fragment key={s.formId}>
                    <CustomEditorField
                      defaultValue=""
                      EditorIcons={EditorIcons}
                      setValue={(value) => {
                        const _sample_answers = [...form.sample_answers];
                        _sample_answers[j].rationale = value;
                        setForm(i, {
                          ...form,
                          sample_answers: [..._sample_answers],
                        });
                      }}
                      title={gettext("Sample answer") + (j == 0 ? " *" : "")}
                      value={s.rationale || ""}
                    />
                    {form.sample_answers.length > 1 ? (
                      <IconButton
                        color={"primary"}
                        sx={{ mb: "1px" }}
                        onClick={() => {
                          const _sample_answers = [...form.sample_answers];
                          _sample_answers.splice(j, 1);
                          setForm(i, {
                            ...form,
                            sample_answers: [..._sample_answers],
                          });
                        }}
                      >
                        <RemoveCircleIcon fontSize="large" />
                      </IconButton>
                    ) : null}
                  </Fragment>
                ))}
                <IconButton
                  color={"primary"}
                  sx={{ mb: "1px" }}
                  onClick={() => {
                    const _sample_answers = [...form.sample_answers];
                    _sample_answers.push({ formId: uuid(), rationale: "" });
                    setForm(i, {
                      ...form,
                      sample_answers: [..._sample_answers],
                    });
                  }}
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
          {i == forms.length - 1 ? (
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
          ) : null}
        </Fragment>
      ))}
    </Stack>
  );
}

export default Answer;
