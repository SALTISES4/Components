import { Box, SvgIcon, Typography } from "@mui/material";
import { h } from "preact";
import { CustomEditorFieldProps } from "./types";
import { formTheme } from "../theme";
import { CustomEditor } from "./customEditor";

export const CustomEditorField = ({
  title,
  EditorIcons,
  icon,
  setValue,
  value,
}: CustomEditorFieldProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
        <Typography sx={{ marginLeft: "14px" }}>{title}</Typography>
        {icon ? (
          <SvgIcon
            sx={{
              position: "relative",
              color: formTheme.palette.primary.main,
              fontSize: "14px",
            }}
            component={icon}
          />
        ) : null}
      </Box>
      <CustomEditor
        EditorIcons={EditorIcons}
        setValue={setValue}
        value={value}
      />
    </Box>
  );
};
