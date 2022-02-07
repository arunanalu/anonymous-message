import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import axios from "axios";
import { Box, flexbox } from "@mui/system";
import MasonryMessages from "../MasonryMessages";
import MessagesController from "../MessagesController";
import MessageButton from "../MessageButton";
import NewMessageModal from "../NewMessageModal";
import AdmMasonryMessages from "./AdmMasonryMessages";

export default function BasicMasonry() {
  const [messages, setMessages] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: fetched } = await axios.get(
        "https://a347rl.deta.dev/messages/approve"
      );
      setMessages(fetched);
    };
    fetchMessages();
  }, []);

  const handleSend = () => {
    setMessageOpen(true);
  };

  return (
    <Box
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{ borderRadius: 10, border: 2, borderColor: "#E6E6E6" }}
      >
        <Typography align="center" variant="h6" fontWeight={600}>
          ADMINASTRO
        </Typography>
        <AdmMasonryMessages messages={messages} />
        <Box
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MessagesController />
          <MessageButton handleSend={handleSend} />
        </Box>
        <NewMessageModal
          open={messageOpen}
          onClose={() => setMessageOpen(false)}
        />
      </Paper>
    </Box>
  );
}
