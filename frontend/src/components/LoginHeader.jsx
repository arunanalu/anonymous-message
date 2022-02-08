import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useUserContext } from "../contexts/userContext";

function LoginHeader({ setLoginOpen }) {
  const { user, setUser } = useUserContext();

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setUser({});
  };

  if (user.name)
    return (
      <div onClick={handleLogOut}>
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
