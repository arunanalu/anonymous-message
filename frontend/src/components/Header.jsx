import React, { useState } from "react";

import { AppBar, Box, Button, Grid, Typography } from "@mui/material";
import LoginModal from "./LoginModal";
import { useUserContext } from "../contexts/userContext";
import LoginHeader from "./LoginHeader";
function Header() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <AppBar position="static" elevation={0} sx={{backgroundColor:'white'}}>
      <Box container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          container
          sx={{
            backgroundColor: "white",
            width: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "black" }} variant="h3">
            LogoApp
          </Typography>
          <LoginHeader setLoginOpen={setLoginOpen} />
        </Box>
      </Box>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </AppBar>
  );
}

export default Header;
