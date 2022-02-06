import React from "react";

import { AppBar, Button, Grid, Typography } from "@mui/material";
function Header() {
  return (
    <AppBar position="static">
      <Grid container>
        <Typography>LogoApp</Typography>
        <Button onClick={console.log("teste")}>
          Logar
        </Button>
      </Grid>
    </AppBar>
  );
}

export default Header;
