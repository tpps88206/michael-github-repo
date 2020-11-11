import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import configureStore, { history } from '@/redux/configureStore';
import Router from '@/routes';

library.add(fab);

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
