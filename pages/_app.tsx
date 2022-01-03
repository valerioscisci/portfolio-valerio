import '../styles/global.css';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';

export const valerioTheme = {
  name: 'default',
  colors: {
    primary: '#CEE9CA',
    secondary: '#fbd46d',
    background: '#FCFCFC',
    backgroundDark: '#222831',
    backgroundLight: '#8090a7',
    textColorWhite: '#fff',
    textColorBlack: '#333333',
    textColorGrey: '#7c8088',
    error: '#FF3D3D',
    opacityBackgroundLight: 'rgba(166, 177, 193, 0.7)',
  },
};

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        debug: true,
      });
    }
  }, []);

  return (
    <ThemeProvider theme={valerioTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
