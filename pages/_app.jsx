/* eslint-disable */
import React from 'react';
import { withTranslation } from 'react-i18next';
import '../styles/globals.css';
import InitI18n from '../lib/i18n';
import CenterLoading from '../components/ui/CenterLoading';

if (typeof window !== 'undefined') {
  InitI18n();
}

function MyApp({ tReady, Component, pageProps }) {
  if (!tReady) return <CenterLoading />;
  return <Component {...pageProps} />;
}

export default withTranslation()(MyApp);
