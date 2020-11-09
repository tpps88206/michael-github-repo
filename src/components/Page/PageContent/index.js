import React from 'react';

import { makeStyles } from '@material-ui/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const PageContent = ({ children, className = '' }) => {
  const classes = useStyles();
  return <section className={`${classes.root} ${className}`}>{children}</section>;
};

export default PageContent;
