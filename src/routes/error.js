import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import NotFound from '@/pages/NotFound';

const ErrorRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={url} component={ErrorPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default ErrorRouter;
