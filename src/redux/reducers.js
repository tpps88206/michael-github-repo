import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import search from '@/redux/slices/search';

export default history =>
  combineReducers({
    router: connectRouter(history),
    search,
  });
