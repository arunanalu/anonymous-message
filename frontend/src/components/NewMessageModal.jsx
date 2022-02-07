import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CenteredModal from "./CenteredModal";
import RequestMessage from "./RequestMessage";

function NewMessageModal({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "post",
        url: `${process.env.API}/messages`,
        data: {
          message,
          approved: "false",
        },
      });
      setIsLoading(false);
      setMessage("");
      return onClose();
    } catch ({ response }) {
      setIsLoading(false);
      setRequestMessage(response.data.message);
    }
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
      <RequestMessage loading={isLoading} message={requestMessage} />
    </CenteredModal>
  );
}

export default NewMessageModal;
