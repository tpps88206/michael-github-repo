import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import general from '@/redux/slices/general';
import search from '@/redux/slices/search';

export default history =>
  combineReducers({
    router: connectRouter(history),
    general,
    search,
  });
