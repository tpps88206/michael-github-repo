import { combineEpics } from 'redux-observable';

import * as error from '@/redux/slices/error';
import * as notification from '@/redux/slices/notification';
import * as search from '@/redux/slices/search';
import { getEpicsFromSlices } from './utils';

export default combineEpics(...getEpicsFromSlices([error, notification, search]));
