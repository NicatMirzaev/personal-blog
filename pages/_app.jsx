/* eslint-disable */
import React from 'react';
import { withTranslation } from 'react-i18next';
import { AuthProvider } from '../components/AuthProvider';
import WaitForAuth from '../components/WaitForAuth';
import '../styles/globals.css';
import InitI18n from '../lib/i18n';
import CenterLoading from '../components/ui/CenterLoading';

if (typeof window !== 'undefined') {
  InitI18n();
}

function MyApp({ tReady, Component, pageProps }) {
  if (!tReady) return <CenterLoading />;
  return (
    <AuthProvider>
      <WaitForAuth>
        <Component {...pageProps} />
      </WaitForAuth>
    </AuthProvider>
  );
}

export default withTranslation()(MyApp);
