import { Fragment, h } from "preact";
import { useState } from "preact/hooks";

//material ui components
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/system/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ShareIcon from "@mui/icons-material/Share";

//components
import { CustomMenu } from "../_navigation/menu";
import DistributeModal from "./distributeModal";
import ShareModal from "./shareModal";

//types
import { ToolbarProps } from "./types";

export function Toolbar({
  gettext,
  assignment,
  distributeErrors,
  distributeWaiting,
  editing = false,
  enableDistribute = false,
  enableEdit = false,
  enableSave,
  groups,
  handleDistribute,
  handleEdit,
  handleSave,
  lti,
}: ToolbarProps): JSX.Element {
  const [distributeMenuAnchorElement, setDistributeMenuAnchorElement] =
    useState<null | HTMLElement>(null);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [distributeMode, setDistributeMode] = useState<
    "myDalite" | "LMS" | undefined
  >();

  const handleClick = (distributeMode: "myDalite" | "LMS") => {
    setDistributeMode(distributeMode);
    setDistributeMenuAnchorElement(null);
  };

  return (
    <Box
      py="6px"
      display="flex"
      alignItem="center"
      style={{
        gap: "35px",
      }}
    >
      {!editing ? (
        <Fragment>
          <IconButton
            color="primary"
            disabled={
              groups === undefined || groups.length == 0 || !enableDistribute
            }
            onClick={(event: MouseEvent | TouchEvent) =>
              setDistributeMenuAnchorElement(event.target as HTMLElement)
            }
            title={gettext("Distribute")}
          >
            <ShareIcon />
          </IconButton>

          <CustomMenu
            anchorEl={distributeMenuAnchorElement}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            menuItems={[
              [
                {
                  handleClick: () => handleClick("myDalite"),
                  icon: "email",
                  title: gettext("Distribute via myDalite"),
                },
                {
                  handleClick: () => handleClick("LMS"),
                  icon: "web",
                  title: gettext("Distribute via LMS"),
                },
              ],
            ]}
            onClose={() => setDistributeMenuAnchorElement(null)}
            open={Boolean(distributeMenuAnchorElement)}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          />

          {/* <IconButton
            color="primary"
            disabled={editing}
            onClick={() => setOpenShareModal(true)}
            title={gettext("Share with a colleague")}
          >
            <SendRoundedIcon />
          </IconButton> */}
        </Fragment>
      ) : null}
      {enableEdit ? (
        editing ? (
          <Fragment>
            <IconButton
              color="primary"
              onClick={() => handleEdit(!editing)}
              title={gettext("Go back")}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              color="primary"
              disabled={!enableSave}
              onClick={handleSave}
              title={gettext("Save changes")}
            >
              <SaveIcon />
            </IconButton>
          </Fragment>
        ) : (
          <IconButton
            color="primary"
            onClick={() => handleEdit(!editing)}
            title={gettext("Edit")}
          >
            <EditIcon />
          </IconButton>
        )
      ) : null}
      <ShareModal
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        aria-labelledby="share"
        aria-describedby="share with colleagues"
        gettext={gettext}
      />
      {groups ? (
        <DistributeModal
          gettext={gettext}
          assignment={assignment}
          errors={distributeErrors}
          groups={groups}
          handleSubmit={handleDistribute}
          lti={lti}
          method={distributeMode}
          onClose={() => setDistributeMode(undefined)}
          waiting={distributeWaiting}
          aria-labelledby="distribute"
          aria-describedby="distribute to students"
        />
      ) : null}
    </Box>
  );
}
