import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function MessagesController() {
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const prevPage = () => {
    if(page === 1) return;
    setPage((state) => state - 1)
  }

  const nextPage = () => {
    setPage((state) => state + 1)
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="previous"
        onClick={prevPage}
      >
        <SkipPreviousIcon />
      </IconButton>
      {/* <IconButton aria-label="play/pause">
        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      </IconButton> */}
      <Typography >
      {page}/{maxPages}
      </Typography>

      <IconButton
        aria-label="next"
        onClick={nextPage}
      >
        <SkipNextIcon />
      </IconButton>
    </Box>
  );
}

export default MessagesController;
