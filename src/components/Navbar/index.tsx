import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { FiSun, FiMenu, FiMoon, FiUser, FiUserX } from 'react-icons/fi'

interface DarkModeProps {
  dark: boolean;
  toggleDarkMode: () => void;
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

export default function Navbar({ dark, toggleDarkMode }: DarkModeProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClose = () => setAnchorEl(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <FiMenu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            e-cordel
          </Typography>
          <IconButton size="medium" color="inherit" onClick={toggleDarkMode}>
            {dark ? <FiSun /> : <FiMoon />}
          </IconButton>
          <IconButton size="medium" color="inherit" onClick={handleClick}><FiUser /></IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}