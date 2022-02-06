import React, { useState } from "react";
import { Grid } from "@mui/material";
import MessagesContainer from '../src/components/MessagesContainer';

import useStyles from "../src/styles/HomePage.styles";
import Header from "../src/components/Header";


const Index = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Header />
      <MessagesContainer />
    </Grid>
  );
};

export default Index;
