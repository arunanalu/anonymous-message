import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import MasonryMessages from "./MasonryMessages";
import MessagesController from "./MessagesController";
import MessageButton from "./MessageButton";
import NewMessageModal from "./NewMessageModal";
import axios from "axios";
import { Box, flexbox } from "@mui/system";

const defaultMessages = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  "Lorem Ipsum has been the industries standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cen",
  "500s, when an unknown printer took a galley of type and scrambled it to mak",
  "packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or random words which don't look even slightly believable. If you ar",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hu",
  "passage, and going through the cites of the word in classical literal",
];

export default function BasicMasonry() {
  const [messages, setMessages] = useState(defaultMessages);
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: fetched } = await axios.get(
        "https://a347rl.deta.dev/messages/approve"
      );
      const fetchedMessages = fetched.map((mes) => mes.message);
      setMessages(fetchedMessages);
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
          EXPLORAR
        </Typography>
        <MasonryMessages messages={messages} />
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
