import { Fragment, h } from "preact";

import { useState } from "preact/hooks";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import { ToolbarProps } from "./types";

import DistributeModal from "./distributeModal";
import ShareModal from "./shareModal";

export function Toolbar({
  gettext,
  distributeErrors,
  distributeWaiting,
  editing = false,
  enableDistribute = false,
  enableEdit = false,
  groups,
  handleDistribute,
  handleEdit,
  handleSave,
}: ToolbarProps): JSX.Element {
  const [openShareModal, setOpenShareModal] = useState(false);
  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  const [openDistributeModal, setOpenDistributeModal] = useState(false);
  const handleOpenDistributeModal = () => setOpenDistributeModal(true);
  const handleCloseDistributeModal = () => setOpenDistributeModal(false);

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
            onClick={handleOpenDistributeModal}
            title={gettext("Distribute")}
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={editing}
            onClick={handleOpenShareModal}
            title={gettext("Share with a colleague")}
          >
            <SendIcon />
          </IconButton>
        </Fragment>
      ) : null}
      {enableEdit ? (
        editing ? (
          <Fragment>
            <IconButton
              color="primary"
              onClick={() => handleEdit(!editing)}
              title={gettext("Cancel changes")}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              color="primary"
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
        onClose={handleCloseShareModal}
        aria-labelledby="share"
        aria-describedby="share with colleagues"
        gettext={gettext}
      />
      {groups ? (
        <DistributeModal
          gettext={gettext}
          errors={distributeErrors}
          groups={groups}
          handleSubmit={handleDistribute}
          open={openDistributeModal}
          onClose={handleCloseDistributeModal}
          waiting={distributeWaiting}
          aria-labelledby="distribute"
          aria-describedby="distribute to students"
        />
      ) : null}
    </Box>
  );
}
