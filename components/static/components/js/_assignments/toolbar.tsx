import { h } from "preact";

import { useState } from "preact/hooks";

import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Box from "@mui/system/Box";

import { ToolbarProps } from "./types";
import { IconButton } from "@mui/material";
import ShareModal from "./shareModal";

export function Toolbar({ gettext }: ToolbarProps): JSX.Element {
  const [openShareModal, setOpenShareModal] = useState(false);
  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  return (
    <Box
      py="16px"
      display="flex"
      alignItem="center"
      style={{
        gap: "35px",
      }}
    >
      <IconButton>
        <SendIcon />
      </IconButton>
      <IconButton onClick={handleOpenShareModal}>
        <ShareIcon />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
      <MoreHorizIcon />
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
