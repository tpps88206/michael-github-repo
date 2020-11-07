import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import rootEpic from './epics';
import createRootReducer from './reducers';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
  const flavor = process.env.REACT_APP_FLAVOR;

  const store = createStore(
    createRootReducer(history),
    composeWithDevTools({
      trace: flavor === 'dev',
    })(applyMiddleware(routerMiddleware(history), epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
