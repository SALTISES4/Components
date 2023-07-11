import { h } from "preact";

import { useState } from "preact/hooks";

import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import { ToolbarProps } from "./types";

import DistributeModal from "./distributeModal";
import ShareModal from "./shareModal";

export function Toolbar({
  gettext,
  enableEditMode = false,
  groups,
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
        <SendIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleOpenShareModal}>
        <ShareIcon />
      </IconButton>
      {enableEditMode ? (
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
      ) : null}
      <IconButton color="primary">
        <MoreHorizIcon />
      </IconButton>
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
          open={openDistributeModal}
          onClose={handleCloseDistributeModal}
          aria-labelledby="distribute"
          aria-describedby="distribute to students"
        />
      ) : null}
    </Box>
  );
}