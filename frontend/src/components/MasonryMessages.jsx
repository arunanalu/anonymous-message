import Masonry from "@mui/lab/Masonry";
import { Box, Paper } from "@mui/material";
import React from "react";

function MasonryMessages({ messages }) {
  return (
    <Box sx={{ width: 1000, minHeight: 500, display:'flex', justifyContent:'center', padding: 2 }} alignContent="center">
      <Masonry columns={3} spacing={3}>
        {messages.map((message, index) => (
          <Paper
            key={message}
            elevation={0}
            sx={{ padding: 2, border: 2, borderColor: "#A4A4A4" }}
          >
            {message}
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}

export default MasonryMessages;
