import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getTheme } from '../theme';
import Navbar from '../components/Navbar';
import { AppProvider } from '../hooks';

export default function MyApp(props) {

  const { Component, pageProps } = props;
  const [darkMode, setDarkMode] = useState(false)

  const handleDarkMode = useCallback(() => {
    localStorage.setItem('@ecordel-theme', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  }, [darkMode])

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const darkState = JSON.parse(localStorage.getItem('@ecordel-theme'));
    if (darkState !== null) {
      setDarkMode(darkState);
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
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
        <CssBaseline />
        <AppProvider>
          <>
            <Navbar dark={darkMode} toggleDarkMode={handleDarkMode} />
            <Component {...pageProps} />
          </>
        </AppProvider>
      </ThemeProvider>

    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
