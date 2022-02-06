import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { Box, height } from "@mui/system";
import React from "react";
import CenteredModal from "./CenteredModal";

function NewMessageModal({ open, onClose }) {
  return (
    <CenteredModal open={open} onClose={onClose}>
      <TextField
        placeholder="Digite sua mensagem aqui"
        multiline
        rows={6}
        sx={{ width: 400 }}
      />

      <Button variant="contained" onClick={onClose}>
        Enviar
      </Button>
    </CenteredModal>
  );
}

export default NewMessageModal;
