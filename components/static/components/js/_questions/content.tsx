import { createRef, Fragment, h } from "preact";
import { useState } from "preact/hooks";

import { questionTextValidator, questionTitleValidator } from "../validators";

//material ui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//components
import { CustomTextField } from "../_reusableComponents/customTextField";
import { CustomEditorField } from "../_reusableComponents/customEditorField";

//styles
import { useTheme } from "@mui/material/styles";

//types
import { EditorIconsType } from "../types";
import {
  AnswerStyles,
  QuestionImageTypes,
  QuestionTypes,
} from "../_localComponents/enum";

export function Content({
  gettext,
  EditorIcons,
  form,
  setAnswerStyle,
  setImage,
  setText,
  setTitle,
  setType,
}: {
  gettext: (a: string) => string;
  EditorIcons: EditorIconsType;
  form: {
    answer_style: string;
    image: File | undefined;
    text: string;
    title: string;
    type: QuestionTypes;
  };
  setAnswerStyle: (a: AnswerStyles) => void;
  setImage: (a: File | undefined) => void;
  setText: (a: string) => void;
  setTitle: (a: string) => void;
  setType: (a: QuestionTypes) => void;
}): JSX.Element {
  const theme = useTheme();
  const imageUpload = createRef();
  const reader = new FileReader();

  reader.addEventListener("load", () =>
    reader.result
      ? setImagePreview(reader.result as string)
      : setImagePreview(""),
  );

  const [imagePreview, setImagePreview] = useState("");

  const setImageAndPreview = (file: File | undefined) => {
    setImage(file);
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card>
      <CardHeader title={"Content"} />
      <Divider />
      <CardContent>
        <Stack spacing={"20px"}>
          <CustomTextField
            gettext={gettext}
            autoFocus={true}
            id="title"
            title="Title *"
            defaultValue=""
            minLength={1}
            maxLength={100}
            setValue={setTitle}
            validator={questionTitleValidator}
            value={form.title}
          />
          <CustomEditorField
            title="Text *"
            EditorIcons={EditorIcons}
            setValue={setText}
            validator={questionTextValidator}
            value={form.text}
          />

          <FormControl>
            <FormLabel id="type-radio-group">
              <Typography
                variant="h5"
                sx={{ lineHeight: "inherit", mb: "10px" }}
              >
                {gettext("Type *")}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="type-radio-group"
              name="type"
              onChange={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
                setType(
                  (event.target as HTMLInputElement).value as QuestionTypes,
                );
              }}
              row
              value={form.type}
            >
              <FormControlLabel
                value={QuestionTypes.PI}
                control={<Radio />}
                label={gettext("Peer instruction")}
              />
              <FormControlLabel
                value={QuestionTypes.RO}
                control={<Radio />}
                label={gettext("Rationale only")}
              />
            </RadioGroup>
          </FormControl>

          <Box>
            <FormLabel id="style-radio-group">
              <Typography variant="h5" sx={{ mb: "8px" }}>
                {gettext("Answer style *")}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="style-radio-group"
              name="answer_style"
              onChange={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
                setAnswerStyle(
                  parseInt(
                    (event.target as HTMLInputElement).value,
                  ) as AnswerStyles,
                );
              }}
              row
              value={form.answer_style}
            >
              <FormControlLabel
                value={AnswerStyles.alphabetic}
                control={<Radio />}
                label={gettext("Alphabetic")}
              />
              <FormControlLabel
                value={AnswerStyles.numeric}
                control={<Radio />}
                label={gettext("Numeric")}
              />
            </RadioGroup>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: "8px" }}>
              {gettext("Image")}
            </Typography>
            {form.image === undefined ? (
              <Fragment>
                <Button
                  onClick={() => imageUpload.current.click()}
                  variant="outlined"
                >
                  <Typography color="primary">
                    {gettext("Choose file")}
                  </Typography>
                </Button>
                <Box>
                  <Typography variant="caption">
                    {gettext("Accepted formats: ") +
                      Object.values(QuestionImageTypes).join(", .")}
                  </Typography>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Stack alignItems={"flex-start"} direction={"row"} ml={"-6px"}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => setImageAndPreview(undefined)}
                    sx={{ mr: "10px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      style={{
                        border: "solid 1px",
                        borderColor: theme.palette.primary.main,
                        borderRadius: "6px",
                        maxWidth: "300px",
                        maxHeight: "300px",
                      }}
                    />
                  ) : null}
                </Stack>
                <Typography variant="caption" sx={{ ml: "42px" }}>
                  {form.image?.name}
                </Typography>
              </Fragment>
            )}
            <Input
              inputProps={{
                accept: "image/png, image/jpg, image/gif, image/jpeg",
                type: "file",
              }}
              inputRef={imageUpload}
              onChange={() => setImageAndPreview(imageUpload.current.files[0])}
              sx={{ display: "none" }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
