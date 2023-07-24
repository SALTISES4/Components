import he from "he";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

import { purifyHTML, purifyText } from "../functions";
import { assignmentTitleValidator } from "../validators";

//material ui components
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

//components
import { TextBox } from "./textBox";
import { CustomEditorField } from "../_reusableComponents/customEditorField";
import { CustomTextField } from "../_reusableComponents/customTextField";

//types
import { GeneralProps } from "./types";

export function GeneralDescription({
  gettext,
  editing = false,
  EditorIcons,
  identifier,
  owner,
  description,
  intro_page,
  conclusion_page,
  title,
  form,
  setters,
}: GeneralProps): JSX.Element {
  const [{ showMore }, setShowMore] = useState<{
    showMore: boolean;
  }>({ showMore: false });

  const handleClick = () => {
    setShowMore((prevState) => ({
      showMore: !prevState.showMore,
    }));
  };

  const show = () => {
    if (showMore) {
      return (
        <Link onClick={handleClick} sx={{ cursor: "pointer", mt: "12px" }}>
          <Typography color="primary">{gettext("Show less")}</Typography>
        </Link>
      );
    }
    return (
      <Link onClick={handleClick} sx={{ cursor: "pointer", mt: "12px" }}>
        <Typography color="primary">{gettext("Show more")}</Typography>
      </Link>
    );
  };

  const titleSection = () => {
    if (editing) {
      return (
        <CustomTextField
          gettext={gettext}
          id="title"
          defaultValue=""
          helperText={gettext("HTML tags not allowed.")}
          icon={HelpOutlineIcon}
          minLength={1}
          maxLength={200}
          setValue={setters.title}
          validator={assignmentTitleValidator}
          value={he.decode(purifyText(form.title))}
          sx={{
            mb: "7px",
            mt: "27px",
            ml: "-14px",
            width: "calc(100% + 14px)",
            " .MuiInputBase-root": { fontSize: "36px" }, // Why TS error?,
            " .MuiInputBase-input": { padding: "2px 14px" }, // Why TS error?
          }}
        />
      );
    }
    return (
      <Typography
        variant="h1"
        align="left"
        dangerouslySetInnerHTML={{ __html: purifyText(title) }}
      />
    );
  };

  const descriptionSection = () => {
    if (editing) {
      return (
        <TextBox>
          <CustomEditorField
            title="Description"
            icon={HelpOutlineIcon}
            EditorIcons={EditorIcons}
            value={form.description || ""}
            setValue={setters.description}
            tooltip={gettext(
              "Notes you would like keep for yourself (or other teachers) regarding this assignment.",
            )}
          />
        </TextBox>
      );
    }
    return (
      <TextBox title={gettext("Description")}>
        <Typography
          dangerouslySetInnerHTML={{ __html: purifyHTML(description) }}
          sx={{
            "p:first-of-type": { marginTop: "0px" },
            "p:last-of-type": { marginBottom: "0px" },
          }}
        />
      </TextBox>
    );
  };

  const instructionsSection = () => {
    if (editing) {
      return (
        <TextBox>
          <CustomEditorField
            title="Special instructions"
            icon={HelpOutlineIcon}
            EditorIcons={EditorIcons}
            value={form.intro_page || ""}
            setValue={setters.intro_page}
            tooltip={
              "Any special instructions you would like students to read before they start the assignment."
            }
          />
        </TextBox>
      );
    }
    return (
      <TextBox title={gettext("Special instructions")}>
        <Typography
          dangerouslySetInnerHTML={{ __html: purifyHTML(intro_page) }}
          sx={{
            "p:first-of-type": { marginTop: "0px" },
            "p:last-of-type": { marginBottom: "0px" },
          }}
        />
      </TextBox>
    );
  };

  const notesSection = () => {
    if (editing) {
      return (
        <TextBox>
          <CustomEditorField
            title="Post assignment notes"
            icon={HelpOutlineIcon}
            EditorIcons={EditorIcons}
            value={form.conclusion_page || ""}
            setValue={setters.conclusion_page}
            tooltip={
              "Any notes you would like to leave for students to read that will be shown after the last question of the assignment."
            }
          />
        </TextBox>
      );
    }
    return (
      <TextBox title={gettext("Post assignment notes")}>
        <Typography
          dangerouslySetInnerHTML={{ __html: purifyHTML(conclusion_page) }}
          sx={{
            "p:first-of-type": { marginTop: "0px" },
            "p:last-of-type": { marginBottom: "0px" },
          }}
        />
      </TextBox>
    );
  };

  return (
    <Box>
      {titleSection()}
      <Typography variant="h2" sx={{ marginTop: "0px" }}>
        {gettext("General")}
      </Typography>
      <Box display="flex" sx={{ gap: "20px" }}>
        <Box display="flex" flexDirection={"column"} flex={2}>
          <TextBox title={gettext("Identifier")}>
            <Typography>{identifier}</Typography>
          </TextBox>
          <TextBox
            title={owner.length < 2 ? gettext("Author") : gettext("Authors")}
          >
            <Typography>{owner.join(", ")}</Typography>
          </TextBox>
        </Box>
        <Box display="flex" flexDirection={"column"} flex={5}>
          {descriptionSection()}
          {editing ? (
            <Fragment>
              {instructionsSection()}
              {notesSection()}
            </Fragment>
          ) : intro_page || conclusion_page ? (
            <Fragment>
              <Collapse in={showMore} timeout={500} unmountOnExit>
                {instructionsSection()}
                {notesSection()}
              </Collapse>
              {show()}
            </Fragment>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
