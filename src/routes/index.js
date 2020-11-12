import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Notification from '@/components/Notification';
import Progress from '@/components/Progress';

const SearchRouter = lazy(() => import('./search'));
const ErrorRouter = lazy(() => import('./error'));

const Router = () => {
  return (
    <Suspense fallback={<Progress message="Loading..." />}>
      <Notification />
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}`} component={SearchRouter} />
        <Route path={`${process.env.PUBLIC_URL}/error`} component={ErrorRouter} />
      </Switch>
    </Suspense>
  );
};

export default Router;
