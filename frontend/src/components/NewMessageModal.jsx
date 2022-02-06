import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { Box, height } from "@mui/system";
import React from "react";

function NewMessageModal({ open, onClose }) {
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
        <TextField
          placeholder="Digite sua mensagem aqui"
          multiline
          rows={6}
          sx={{ width: 400 }}
        />

        <Button variant="contained" onClick={onClose}>Enviar</Button>
      </Paper>
    </Modal>
  );
}

export default NewMessageModal;
