import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

const NotFound = ({ redirect }) => {
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      history.replace(redirect);
    }
  }, []);

  return (
    <div className="mt-2">
      <Typography variant="h5">Page Not Found</Typography>
      {redirect && <Typography variant="body1">Redirecting...</Typography>}
    </div>
  );
};

export default NotFound;
