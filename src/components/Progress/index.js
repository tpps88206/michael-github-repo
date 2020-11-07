import React from 'react';

import classNames from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';

const Progress = ({ message, className, style }) => (
  <div className={classNames('d-flex flex-column justify-center align-center vh-100', className)} style={style}>
    <CircularProgress />
    {message && (
      <>
        <br />
        <p>{message}</p>
      </>
    )}
  </div>
);

export default Progress;
