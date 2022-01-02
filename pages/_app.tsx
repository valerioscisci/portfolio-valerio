import '../styles/global.css';
import { AppProps } from 'next/app';
import React from 'react';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
