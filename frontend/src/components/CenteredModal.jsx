import { Modal, Paper } from "@mui/material";
import React from "react";

function CenteredModal({ children, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}

export default CenteredModal;
