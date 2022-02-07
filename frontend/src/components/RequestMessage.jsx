import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

function RequestMessage({ message, loading }) {
  if (loading) return <Box>Loading</Box>;
  if (message)
    return (
      <Box
        sx={{
          width: 300,
          backgroundColor: "#ffddde",
          borderRadius: 1,
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorIcon sx={{ color: "#CC4749" }} />
        <Typography variant="subtitle2">{message}</Typography>
      </Box>
    );
  return <div></div>;
}

export default RequestMessage;
