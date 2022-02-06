import Masonry from "@mui/lab/Masonry";
import { Box, Paper } from "@mui/material";
import React from "react";

function MasonryMessages({ messages }) {
  return (
    <Box sx={{ width: 1000, minHeight: 500 }} alignContent='center' >
      <Masonry columns={3} spacing={3} sx={{margin:0, padding:4}}>
        {messages.map((message, index) => (
          <Paper key={message} elevation={0} sx={{padding:2, border:2, borderColor:'#A4A4A4'}}>{message}</Paper>
        ))}
      </Masonry>
    </Box>
  );
}

export default MasonryMessages;
