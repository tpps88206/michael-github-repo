import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import AppFrame from '@/components/AppFrame';
import NotFound from '@/pages/NotFound';
import SearchPage from '@/pages/Search';

const ErrorRouter = () => {
  const { url } = useRouteMatch();
  return (
    <AppFrame>
      <Switch>
        <Route exact path={url} component={SearchPage} />
        <Route component={NotFound} />
      </Switch>
    </AppFrame>
  );
};

export default ErrorRouter;
