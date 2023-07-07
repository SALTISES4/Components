import { Fragment, h } from "preact";

import { useState } from "preact/hooks";

//material ui components
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

//components
import { HTMLTextBox, TextBox } from "./htmlTextBox";

//types
import { GeneralProps } from "./types";

export function GeneralDescription({
  gettext,
  identifier,
  owner,
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

  return (
    <Box display="flex" sx={{ gap: "20px" }}>
      <Box display="flex" flexDirection={"column"} flex={2}>
        <TextBox title={gettext("Identifier")} text={identifier} />
        <TextBox
          title={owner.length < 2 ? gettext("Author") : gettext("Authors")}
          text={owner.join(", ")}
        />
      </Box>
      <Box display="flex" flexDirection={"column"} flex={5}>
        <HTMLTextBox
          title={gettext("Description")}
          text={description || gettext("N/A")}
        />
        {instructions || notes ? (
          <Fragment>
            <Collapse in={showMore} timeout={500} unmountOnExit>
              <HTMLTextBox
                title={gettext("Special instructions")}
                text={instructions}
              />
              <HTMLTextBox
                title={gettext("Post assignment notes")}
                text={notes}
              />
            </Collapse>
            {show()}
          </Fragment>
        ) : null}
      </Box>
    </Box>
  );
}
