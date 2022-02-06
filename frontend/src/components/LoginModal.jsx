import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CenteredModal from "./CenteredModal";

function LoginModal({ open, onClose }) {
  return (
    <CenteredModal open={open} onClose={onClose}>
      <Typography variant="h2">LogoApp</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField label="Email" variant="outlined" sx={{width:300}}/>
        <TextField label="Senha" variant="outlined" sx={{width:300}}/>
        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
          <Button variant="contained" sx={{width:130}}>
            ENTRAR
          </Button>
          <Button variant="contained" sx={{width:130}}>
            CADASTRAR
          </Button>
        </Box>
      </Box>
    </CenteredModal>
  );
}

export default LoginModal;
