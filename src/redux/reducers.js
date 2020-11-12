import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import error from '@/redux/slices/error';
import notification from '@/redux/slices/notification';
import search from '@/redux/slices/search';

export default history =>
  combineReducers({
    router: connectRouter(history),
    error,
    notification,
    search,
  });
