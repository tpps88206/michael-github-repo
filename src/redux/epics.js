import { combineEpics } from 'redux-observable';

import * as general from '@/redux/slices/general';
import * as search from '@/redux/slices/search';
import { getEpicsFromSlices } from './utils';

export default combineEpics(...getEpicsFromSlices([general, search]));
