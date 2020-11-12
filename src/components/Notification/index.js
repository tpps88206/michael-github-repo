import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { closeNotification, processNotification } from '@/redux/slices/notification';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = () => {
  const dispatch = useDispatch();

  const open = useSelector(state => state.notification.open);
  const queue = useSelector(state => state.notification.queue);

  const handleClose = () => {
    dispatch(closeNotification());
  };

  const handleExited = () => {
    dispatch(processNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={handleClose} severity="success">
        {queue.length && queue[0].message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
