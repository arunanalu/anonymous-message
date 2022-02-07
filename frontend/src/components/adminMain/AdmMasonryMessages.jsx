import Masonry from "@mui/lab/Masonry";
import { Box, IconButton, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

import useMasonryStyles from "../../styles/Masonry.styles";
import axios from "axios";
import { useUserContext } from "../../contexts/userContext";

function AdmMasonryMessages({ messages }) {
  const classes = useMasonryStyles();
  const { user } = useUserContext();
  const handleApprove = async (message) => {
    try {
      const sendResponse = await axios({
        url: `${process.env.API}/messages/approve/${message._id}`,
        method: "delete",
        headers: {
          Authorization: user.token,
        },
      });
      console.log(sendResponse);
    } catch ({response}) {
      console.log(response);
    }
  };
  return (
    <Box className={classes.masonryBox} alignContent="center">
      <Masonry columns={3} spacing={3}>
        {messages.map((message, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{ border: 2 }}
            className={classes.messageCard}
          >
            {message.message}
            <Box className={classes.adminBox}>
              <IconButton
                disableRipple={true}
                className={`${classes.iconButton} ${classes.iconButtonCheck}`}
                onClick={() => handleApprove(message)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                disableRipple={true}
                className={`${classes.iconButton} ${classes.iconButtonClear}`}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}

export default AdmMasonryMessages;
