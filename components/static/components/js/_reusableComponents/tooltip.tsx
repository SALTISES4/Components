import { h } from "preact";

//mui components
import { default as MuiTooltip } from "@mui/material/Tooltip";
import SvgIcon from "@mui/material/SvgIcon";
import Zoom from "@mui/material/Zoom";

//style
import { formTheme } from "../theme";

//types
import { TooltipProps } from "./types";

const Tooltip = ({ icon, title }: TooltipProps) => {
  return (
    <MuiTooltip
      arrow
      TransitionComponent={Zoom}
      placement="right"
      title={title}
    >
      <SvgIcon
        sx={{
          position: "relative",
          color: formTheme.palette.primary.main,
          fontSize: formTheme.typography.h5.fontSize,
        }}
        component={icon}
      />
    </MuiTooltip>
  );
};

export default Tooltip;
