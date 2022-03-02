import { SidebarAuth } from "@components/Sidebar/SidebarAuth";
import { Backdrop, Box, Modal, Paper } from "@mui/material";
import React from "react";

interface AuthModalProps {
  open: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClick }) => {
  return (
    <Modal
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClose={onClick}
    >
      <Paper
        variant="outlined"
        sx={{
          // maxWidth: 600,
          p: 4,
          borderRadius: 4,
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <SidebarAuth />
      </Paper>
    </Modal>
  );
};
