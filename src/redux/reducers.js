import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import general from '@/redux/slices/general';

export default history =>
  combineReducers({
    router: connectRouter(history),
    general,
  });
