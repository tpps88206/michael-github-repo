import { combineEpics } from 'redux-observable';

import * as search from '@/redux/slices/search';
import { getEpicsFromSlices } from './utils';

export default combineEpics(...getEpicsFromSlices([search]));
