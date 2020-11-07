import { ofType } from 'redux-observable';

import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';
import isEmpty from 'lodash/isEmpty';
import { mergeMap } from 'rxjs/operators';

// there are two type of handler, different in key name:
// - `actionName`: map handler to `actionName`
// - `actionNameEpic`: get full control of epic function
const sliceToEpics = slice => {
  if (!slice || !slice.epics) {
    return [];
  }
  const actionTypes = fromPairs(
    Object.entries(slice)
      .filter(([k]) => k !== 'default' && k !== 'epics')
      .filter(([, v]) => v && v.type)
      .map(([k, v]) => [k, v.type]),
  );
  const epics = Object.entries(slice.epics).map(([k, handler]) => {
    if (k.endsWith('Epic')) {
      return handler;
    }

    return (action$, state$) => {
      return action$.pipe(
        ofType(actionTypes[k]),
        mergeMap(action => handler(action$, state$, action)),
      );
    };
  });

  return epics;
};

export const getEpicsFromSlices = slices => {
  if (isEmpty(slices)) {
    return [];
  }
  return flatten(slices.map(sliceToEpics));
};
