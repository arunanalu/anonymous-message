import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../src/theme";

import createEmotionCache from "../src/createEmotionCache";
import { UserWrapper } from "../src/contexts/userContext";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserWrapper>
          <Component {...pageProps} />
        </UserWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
