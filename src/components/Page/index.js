import React from 'react';

import classnames from 'classnames';

import { makeStyles } from '@material-ui/styles';

import styles from './styles';
const useStyles = makeStyles(styles);

const Page = ({ children, disableGutter = false, noHeader = false }) => {
  const classes = useStyles();
  return <main className={classnames(classes.root, { 'px-3': !disableGutter, 'mt-9': !noHeader })}>{children}</main>;
};

export default Page;
