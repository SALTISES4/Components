import { h } from "preact";

import { useState } from "preact/hooks";

import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import { ToolbarProps } from "./types";

import DistributeModal from "./distributeModal";
import ShareModal from "./shareModal";

export function Toolbar({
  gettext,
  enableEditMode = false,
  groups,
  handleDistribute,
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
      <IconButton
        color="primary"
        disabled={groups === undefined || groups.length == 0}
        onClick={handleOpenDistributeModal}
      >
        <ShareIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleOpenShareModal}>
        <SendIcon />
      </IconButton>
      {enableEditMode ? (
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
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
          groups={groups}
          handleSubmit={handleDistribute}
          open={openDistributeModal}
          onClose={handleCloseDistributeModal}
          aria-labelledby="distribute"
          aria-describedby="distribute to students"
        />
      ) : null}
    </Box>
  );
}
