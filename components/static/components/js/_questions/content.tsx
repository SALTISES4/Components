import { createRef, Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  questionImageValidator,
  questionImageAltTextValidator,
  questionTextValidator,
  questionTitleValidator,
  questionVideoURLValidator,
} from "../validators";

// MUI components
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ClearIcon from "@mui/icons-material/Clear";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Local components
import { CustomTextField } from "../_reusableComponents/customTextField";
import { CustomEditorField } from "../_reusableComponents/customEditorField";
import Errors from "../_reusableComponents/errors";
import Tooltip from "../_reusableComponents/tooltip";

// Types
import { EditorIconsType } from "../types";
import {
  AllowedEmbedHosts,
  AnswerStyles,
  QuestionImageTypes,
  QuestionTypes,
  RationaleSelectionAlgorithms,
} from "../_localComponents/enum";

function Content({
  gettext,
  EditorIcons,
  form,
  formErrors,
  setAnswerStyle,
  setImage,
  setImageAltText,
  setRationaleSectionAlgorithm,
  setText,
  setTitle,
  setType,
  setVideo,
}: {
  gettext: (a: string) => string;
  EditorIcons: EditorIconsType;
  form: {
    answer_style: AnswerStyles;
    image: File;
    image_alt_text: string;
    pk?: number;
    rationale_selection_algorithm: keyof typeof RationaleSelectionAlgorithms;
    text: string;
    title: string;
    type: keyof typeof QuestionTypes;
    video_url: string;
  };
  formErrors: { title: string[] };
  setAnswerStyle: (a: AnswerStyles) => void;
  setImage: (a: File, cb: () => void) => void;
  setImageAltText: (a: string) => void;
  setRationaleSectionAlgorithm: (
    a: keyof typeof RationaleSelectionAlgorithms,
  ) => void;
  // setSequentialReview: (a: boolean) => void;
  setText: (a: string) => void;
  setTitle: (a: string) => void;
  setType: (a: keyof typeof QuestionTypes) => void;
  setVideo: (a: string) => void;
}): JSX.Element {
  const inputFileRef = createRef();
  const reader = new FileReader();

  reader.addEventListener("load", () =>
    reader.result
      ? setImagePreview(reader.result as string)
      : setImagePreview(""),
  );

  const [imagePreview, setImagePreview] = useState("");

  const setImageAndPreview = (file: File) => {
    setImage(file, () => (file.size == 0 ? setImageAltText("") : null));
    if (file.size > 0) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImageAndPreview(form.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.image]);

  return (
    <Card>
      <CardHeader title={"Content"} />
      <Divider />
      <CardContent>
        <Stack spacing={"25px"}>
          <Errors errors={[formErrors.title]} />
          <CustomTextField
            gettext={gettext}
            autoFocus={true}
            id="title"
            title={gettext("Title")}
            defaultValue=""
            minLength={1}
            maxLength={100}
            required={true}
            setValue={setTitle}
            validator={questionTitleValidator}
            value={form.title}
          />
          <CustomEditorField
            title={gettext("Text *")}
            EditorIcons={EditorIcons}
            setValue={setText}
            id={form.pk}
            validator={questionTextValidator}
            value={form.text}
          />
          <FormControl>
            <FormLabel id="type-radio-group">
              <Typography
                variant="h5"
                sx={{ lineHeight: "inherit", mb: "2px" }}
              >
                {gettext("Type *")}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="type-radio-group"
              name="type"
              onChange={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
                const value = (event.target as HTMLInputElement).value;
                if (Object.keys(QuestionTypes).includes(value)) {
                  setType(value as keyof typeof QuestionTypes);
                }
              }}
              row
              value={form.type}
            >
              {Object.entries(QuestionTypes).map(([value, label], i) => (
                <FormControlLabel
                  key={i}
                  control={<Radio />}
                  value={value}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {form.type == Object.keys(QuestionTypes)[0] ? (
            <Fragment>
              <Box>
                <FormLabel id="style-radio-group">
                  <Typography variant="h5" sx={{ mb: "2px" }}>
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
                  {Object.entries(AnswerStyles)
                    .filter((e) => {
                      // We want the "0" and "1" to be keys
                      return !isNaN(parseInt(e[0]));
                    })
                    .map(([value, label], i) => (
                      <FormControlLabel
                        key={i}
                        control={<Radio />}
                        label={label}
                        value={value}
                      />
                    ))}
                </RadioGroup>
              </Box>

              <Box>
                <FormLabel id="algorithm">
                  <Typography variant="h5" sx={{ mb: "2px" }}>
                    {gettext("Rationale section algorithm *")}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="algorithm-radio-group"
                  name="rationale_selection_algorithm"
                  onChange={(event: h.JSX.TargetedEvent<HTMLInputElement>) => {
                    const value = (event.target as HTMLInputElement).value;
                    if (
                      Object.keys(RationaleSelectionAlgorithms).includes(value)
                    ) {
                      setRationaleSectionAlgorithm(
                        value as keyof typeof RationaleSelectionAlgorithms,
                      );
                    }
                  }}
                  value={form.rationale_selection_algorithm}
                >
                  {Object.entries(RationaleSelectionAlgorithms).map(
                    ([value, label], i) => (
                      <FormControlLabel
                        key={i}
                        control={<Radio />}
                        label={label}
                        value={value}
                      />
                    ),
                  )}
                </RadioGroup>
              </Box>
            </Fragment>
          ) : null}

          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Typography variant="h5" sx={{ mb: "2px" }}>
                {gettext("Image")}
              </Typography>
              <Tooltip
                icon={HelpOutlineIcon}
                title={
                  gettext("Max file size: 1MB.  Accepted file formats: ") +
                  Object.values(QuestionImageTypes).join(", .")
                }
              />
            </Box>
            {form.image.size == 0 ? (
              <Button
                onClick={() => inputFileRef.current.click()}
                variant="outlined"
                sx={{ m: 0 }}
              >
                <Typography color="primary">
                  {gettext("Choose file")}
                </Typography>
              </Button>
            ) : (
              <Container sx={{ width: "fit-content" }}>
                {imagePreview ? (
                  <Stack>
                    <Box sx={{ position: "relative" }}>
                      <img src={imagePreview} style={{ maxWidth: "640px" }} />
                      {!questionImageValidator(form.image) ? (
                        <Alert
                          severity="error"
                          action={
                            <IconButton
                              aria-label="close"
                              color="error"
                              onClick={() => {
                                setImageAndPreview(new File([], ""));
                                inputFileRef.current.value = null;
                              }}
                            >
                              <ClearIcon />
                            </IconButton>
                          }
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          {gettext("File too large.")}
                        </Alert>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => {
                            setImageAndPreview(new File([], ""));
                            inputFileRef.current.value = null;
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            m: "10px",
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Typography variant="caption">
                      {form.image?.name} ({(form.image?.size / 1e6).toFixed(1)}{" "}
                      MB)
                    </Typography>
                  </Stack>
                ) : null}
              </Container>
            )}
          </Box>
          <Input
            inputProps={{
              accept: Object.values(QuestionImageTypes)
                .map((it) => `image/${it}`)
                .join(", "),
              type: "file",
            }}
            inputRef={inputFileRef}
            onChange={() => setImageAndPreview(inputFileRef.current.files[0])}
            sx={{ display: "none" }}
          />
          {form.image.size > 0 && questionImageValidator(form.image) ? (
            <Box>
              <CustomTextField
                gettext={gettext}
                id="image_alt_text"
                title={gettext("Image description for screen readers")}
                defaultValue=""
                minLength={1}
                maxLength={1024}
                required={true}
                setValue={setImageAltText}
                validator={questionImageAltTextValidator}
                value={form.image_alt_text}
              />
            </Box>
          ) : null}
          <Box>
            <CustomTextField
              gettext={gettext}
              id="video_url"
              title={gettext("Video/app embed URL")}
              defaultValue=""
              helperText={`${
                gettext(
                  "Must start with https://.  Must be from a trusted domain:  ",
                ) + Object.values(AllowedEmbedHosts).join(", ")
              }.  `}
              icon={HelpOutlineIcon}
              minLength={1}
              maxLength={200}
              required={false}
              setValue={setVideo}
              tooltip={`${gettext(
                "The appropriate link for each service is usually found under Share > Embed.  Copy the URL in the src attribute of the iframe here, e.g.:",
              )}\nhttps://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_en.html \
              \nhttps://player.vimeo.com/video/468345065/ \
              \nhttps://www.geogebra.org/material/iframe/id/shrqs9nc/ \
              \nhttps://www.youtube.com/embed/FkKPsLxgpuY/`}
              validator={questionVideoURLValidator}
              value={form.video_url}
            />
            {form.video_url && questionVideoURLValidator(form.video_url) ? (
              <Container sx={{ mt: "24px", width: "fit-content" }}>
                <object width="640" height="390" data={form.video_url} />
              </Container>
            ) : null}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Content;
