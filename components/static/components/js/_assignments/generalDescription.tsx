import { h } from "preact";

import { useState } from "preact/hooks";

//material ui components
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

//components
import { TextBox } from "./textBox";

//types
import { GeneralProps } from "./types";

export function GeneralDescription({
  gettext,
  author,
  title,
  description,
  instructions,
  notes,
}: GeneralProps): JSX.Element {
  const [{ showMore }, setShowMore] = useState<{
    showMore: boolean;
  }>({ showMore: false });

  const handleClick = () => {
    setShowMore((prevState) => ({
      showMore: !prevState.showMore,
    }));
  };

  return (
    <Box display="flex" sx={{ gap: "20px" }}>
      <Box display="flex" flexDirection={"column"} flex={2}>
        <TextBox title={gettext("Identifier")} text={author} />
        <TextBox title={gettext("Title")} text={title} />
      </Box>
      <Box display="flex" flexDirection={"column"} flex={5}>
        <TextBox title={gettext("Description")} text={description} />
        <Collapse in={showMore} timeout={500} unmountOnExit>
          <TextBox
            title={gettext("Special instructions")}
            text={instructions}
          />
          <TextBox title={gettext("Post assignment notes")} text={notes} />
        </Collapse>
        {showMore ? (
          <Link onClick={handleClick} sx={{ cursor: "pointer", mt: "12px" }}>
            <Typography color="primary">{gettext("Show less")}</Typography>
          </Link>
        ) : (
          <Link onClick={handleClick} sx={{ cursor: "pointer", mt: "12px" }}>
            <Typography color="primary">{gettext("Show more")}</Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
}
