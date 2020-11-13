import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { NOTIFICATION_AUTO_HIDE_DURATION } from '@/constants/config';
import { closeNotification, processNotification } from '@/redux/slices/notification';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = () => {
  const dispatch = useDispatch();

  const open = useSelector(state => state.notification.open);
  const queue = useSelector(state => state.notification.queue);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotification());
  };

  const handleExited = () => {
    dispatch(processNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={NOTIFICATION_AUTO_HIDE_DURATION}
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={handleClose} severity={queue.length && queue[0].severity}>
        {queue.length && queue[0].message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
