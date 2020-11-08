import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from '@/redux/configureStore';
import Router from '@/routes';

const store = configureStore();

const APP = () => {
  console.warn('PUBLIC_URL:' + process.env.PUBLIC_URL);
  console.warn('REACT_APP_FLAVOR:' + process.env.REACT_APP_FLAVOR);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  );
};

export default APP;
