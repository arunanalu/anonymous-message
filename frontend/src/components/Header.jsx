import React, { useState } from "react";

import { AppBar, Box, Button, Grid, Typography } from "@mui/material";
import LoginModal from "./LoginModal";
function Header() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <AppBar position="static" elevation={0}>
      <Box
        container
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "black" }} variant="h3">
          LogoApp
        </Typography>
        <Button
          variant="contained"
          onClick={()=>setLoginOpen(true)}
          sx={{ height: 40 }}
        >
          Logar
        </Button>
      </Box>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </AppBar>
  );
}

export default Header;
