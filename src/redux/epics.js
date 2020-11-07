import { combineEpics } from 'redux-observable';

import * as general from '@/redux/slices/general';
import { getEpicsFromSlices } from './utils';

export default combineEpics(...getEpicsFromSlices([general]));
