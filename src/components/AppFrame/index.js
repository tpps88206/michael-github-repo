import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import logo from '@/assets/logo.svg';
import styles from './styles';
const useStyles = makeStyles(styles);

const AppFrame = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="justify-space-between">
          <Link to="/">
            <img src={logo} width="48" height="48" alt="logo" />
          </Link>
          <Typography variant="h6">Github Repositories Searching</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default AppFrame;
