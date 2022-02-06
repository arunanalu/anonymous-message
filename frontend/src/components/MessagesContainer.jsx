import { useEffect, useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import MasonryMessages from "./MasonryMessages";
import MessagesController from "./MessagesController";
import MessageButton from "./MessageButton";
import NewMessageModal from "./NewMessageModal";
import axios from "axios";
import LoginModal from "./LoginModal";
import { Box } from "@mui/system";

const defaultMessages = [
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cen",
  "500s, when an unknown printer took a galley of type and scrambled it to mak",
  "ckages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you ar",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hu",
  "assage, and going through the cites of the word in classical litera",
];

export default function BasicMasonry() {
  const [messages, setMessages] = useState(defaultMessages);
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: fetched } = await axios.get(
        "https://a347rl.deta.dev/messages"
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
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:'100%' }}
    >
      <Paper elevation={0} sx={{borderRadius:10, border:2, borderColor: '#E6E6E6'}}>
        <Typography align='center'>Explorar</Typography>
        <MasonryMessages messages={messages} />
        <MessagesController />
        <MessageButton handleSend={handleSend} />
        <NewMessageModal
          open={messageOpen}
          onClose={() => setMessageOpen(false)}
        />
      </Paper>
    </Box>
  );
}
