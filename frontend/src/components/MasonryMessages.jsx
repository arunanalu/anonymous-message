import Masonry from "@mui/lab/Masonry";
import { Box, Paper } from "@mui/material";
import React from "react";

function MasonryMessages({ messages }) {
  return (
    <Box sx={{ width: 1000, minHeight: 393 }} >
      <Masonry columns={3} spacing={1}>
        {messages.map((message, index) => (
          <Paper key={message} elevation={2}>{message}</Paper>
        ))}
      </Masonry>
    </Box>
  );
}

export default MasonryMessages;
