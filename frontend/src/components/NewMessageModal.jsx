import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CenteredModal from "./CenteredModal";

function NewMessageModal({ open, onClose }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const messageResponse = await axios({
        method: "post",
        url: `${process.env.API}/messages`,
        data: {
          message,
          approved: "false",
        },
      });
      console.log(messageResponse);
    } catch (err) {
      console.log(err);
    }
    setMessage("");
    return onClose();
  };

  return (
    <CenteredModal open={open} onClose={onClose}>
      <TextField
        error={message.length < 5 && message !== ""}
        value={message}
        placeholder="Digite sua mensagem aqui"
        multiline
        rows={6}
        sx={{ width: 400 }}
        onChange={(evt) => setMessage(evt.target.value)}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Enviar
      </Button>
    </CenteredModal>
  );
}

export default NewMessageModal;
