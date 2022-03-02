import { FC } from "react";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import createEmotionCache from "@utils/createEmotionCache";
import darkThemeOptions from "styles/theme/darkThemeOptions";

const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme(darkThemeOptions);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SessionProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default MyApp;
