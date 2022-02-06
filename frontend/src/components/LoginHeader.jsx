import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useUserContext } from "../contexts/userContext";

function LoginHeader({ setLoginOpen }) {
  const { user } = useUserContext();

  console.log(user);
  if (user.name)
    return (
      <Box>
        <Typography variant="h6" sx={{ color: "black" }}>
          {user.name}
        </Typography>
      </Box>
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
