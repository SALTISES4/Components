import { h } from "preact";

import { useState } from "preact/hooks";

import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import { ToolbarProps } from "./types";

import ShareModal from "./shareModal";

export function Toolbar({ gettext }: ToolbarProps): JSX.Element {
  const [openShareModal, setOpenShareModal] = useState(false);
  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  return (
    <Box
      py="6px"
      display="flex"
      alignItem="center"
      style={{
        gap: "35px",
      }}
    >
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
      <IconButton color="primary" onClick={handleOpenShareModal}>
        <ShareIcon />
      </IconButton>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      <IconButton color="primary">
        <MoreHorizIcon />
      </IconButton>
      <ShareModal
        open={openShareModal}
        onClose={handleCloseShareModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        gettext={gettext}
      />
    </Box>
  );
}
