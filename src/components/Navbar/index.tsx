import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FiSun, FiMenu, FiMoon, FiUser } from 'react-icons/fi'

interface DarkModeProps {
  dark: boolean;
  toogleDarkMode: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({ dark, toogleDarkMode }: DarkModeProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <FiMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            e-cordel
          </Typography>
          <Button color="inherit" onClick={toogleDarkMode}>
            {dark ? <FiSun /> : <FiMoon />}
          </Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}