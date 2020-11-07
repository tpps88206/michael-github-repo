import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Progress from '@/components/Progress';

const SearchRouter = lazy(() => import('./search'));

const Router = () => {
  return (
    <Suspense fallback={<Progress message="Loading..." />}>
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/'} component={SearchRouter} />
      </Switch>
    </Suspense>
  );
};

export default Router;
