import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme, { getTheme } from '../theme';
import Navbar from '../components/Navbar';

export default function MyApp(props) {

  const { Component, pageProps } = props;
  const [darkMode, setDarkMode] = useState(false)

  const handleDarkMode = useCallback(() => setDarkMode(!darkMode), [darkMode])

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, []);

  return (
    <>
      <Head>
        <title>e-cordel</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navbar dark={darkMode} toogleDarkMode={handleDarkMode} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
