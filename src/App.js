import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from '@/redux/configureStore';
import Router from '@/routes';

const store = configureStore();

const APP = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  );
};

export default APP;
