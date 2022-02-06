import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useUserContext } from "../contexts/userContext";

function LoginHeader({ setLoginOpen }) {
  const { user,setToken } = useUserContext();

  console.log(user);
  if (user.name)
    return (
      <div onClick={() => setToken(undefined)}>
        <Typography variant="h6" sx={{ color: "black" }}>
          {user.name}
        </Typography>
      </div>
    );
  else
    return (
      <Button
        variant="contained"
        onClick={() => setLoginOpen(true)}
        sx={{ height: 40 }}
      >
        Logar
      </Button>
    );
}

export default LoginHeader;
