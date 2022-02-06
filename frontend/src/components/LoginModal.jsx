import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import CenteredModal from "./CenteredModal";
import LoginMessage from "./LoginMessage";

function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useUserContext();
  const [message, setMessage] = useState("");

  const emailRegex = /\S+@\S+\.\S+/;
  console.log(process.env.API);

  const createAccount = async () => {
    try {
      const createResponse = await axios({
        method: "post",
        url: `${process.env.API}/users`,
        data: {
          name: email,
          password,
          type: "user",
        },
      });
      setMessage(response.message);
      setTimeout(onClose,1000)
    } catch({response}) {
      console.log(response.data.message);
      setMessage(response.data.message);
    }
    // setMessage(createResponse.)
  };

  const logIn = async () => {
    try {
      const loginResponse = await axios({
        method: "post",
        url: `${process.env.API}/login`,
        data: {
          name: email,
          password,
        },
      });
      setToken(loginResponse.data.token);
      onClose();
    } catch ({response}) {
      setMessage(response.message);
    }
  };

  return (
    <CenteredModal open={open} onClose={onClose}>
      <Typography variant="h2">LogoApp</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          error={!emailRegex.test(email) && email !== ""}
          label="Email"
          variant="outlined"
          sx={{ width: 300 }}
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          sx={{ width: 300 }}
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{ width: 130 }} onClick={logIn}>
            ENTRAR
          </Button>
          <Button
            variant="contained"
            sx={{ width: 130 }}
            onClick={createAccount}
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>
      <LoginMessage message={message} />
    </CenteredModal>
  );
}

export default LoginModal;
