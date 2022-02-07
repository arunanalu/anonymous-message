import React from "react";
import { Grid } from "@mui/material";
import MessagesContainer from "../src/components/MessagesContainer";

import Header from "../src/components/Header";
import { useUserContext } from "../src/contexts/userContext";
import AdmMessagesContainer from "../src/components/adminMain/AdmMessagesContainer";

const Index = () => {
  const { user } = useUserContext();

  if (user.type === 'admin')
    return (
      <Grid container>
        <Header />
        <AdmMessagesContainer />
      </Grid>
    );

  return (
    <Grid container>
      <Header />
      <MessagesContainer />
    </Grid>
  );
};

export default Index;
