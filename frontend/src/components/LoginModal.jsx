import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import CenteredModal from "./CenteredModal";
import RequestMessage from "./RequestMessage";

function LoginModal({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const [message, setMessage] = useState("");

  // const usernameRegex = /\S+@\S+\.\S+/;

  const createAccount = async () => {
    try {
      setIsLoading(true);
      const createResponse = await axios({
        method: "post",
        url: `${process.env.API}/users`,
        data: {
          name: username,
          password,
          type: "user",
        },
      });
      setIsLoading(false);
      setTimeout(onClose, 1000);
    } catch ({ response }) {
      setIsLoading(false);
      setMessage(response.data.message);
    }
  };

  const logIn = async () => {
    try {
      setIsLoading(true);
      const loginResponse = await axios({
        method: "post",
        url: `${process.env.API}/login`,
        data: {
          name: username,
          password,
        },
      });
      const { token, type } = loginResponse.data;
      const userData = { token, type, name: username };
      setUser(userData);
      sessionStorage. setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      onClose();
    } catch ({ response }) {
      setIsLoading(false);
      setMessage(response.data.message);
    }
  };

  return (
    <CenteredModal open={open} onClose={onClose}>
      <Typography variant="h2">LogoApp</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Nome"
          variant="outlined"
          sx={{ width: 300 }}
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
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
      <RequestMessage message={message} loading={isLoading} />
    </CenteredModal>
  );
}

export default LoginModal;
