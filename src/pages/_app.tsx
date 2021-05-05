import React from 'react';
import AppLayout from '../components/AppLayout';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
