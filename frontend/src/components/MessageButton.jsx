import { Button } from "@mui/material";
import React from "react";

function MessageButton({ handleSend }) {
  return (
    <Button variant="contained" onClick={handleSend}>
      Escrever Mensagem
    </Button>
  );
}

export default MessageButton;
