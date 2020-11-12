import { of } from 'rxjs';

import { createSlice } from '@reduxjs/toolkit';

import { ERRORS } from '@/constants/errors';
import { ERROR_TYPE } from '@/constants/variables';
import { addNotification } from '@/redux/slices/notification';

const initialState = {
  type: '',
  message: '',
};

const slice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action) => {
      const { status, statusText } = action.payload;
      switch (status) {
        case ERRORS.mapCustomErrorCode.RATE_LIMIT_EXCEEDED:
          if (statusText === ERRORS.RATE_LIMIT_EXCEEDED) {
            return {
              type: ERROR_TYPE,
              message: ERRORS.customErrorMessage[ERRORS.messageToEnum[statusText]],
            };
          }
          break;
        case ERRORS.mapCustomErrorCode.UNPROCESSABLE_ENTITY:
          if (statusText === ERRORS.UNPROCESSABLE_ENTITY) {
            return {
              type: ERROR_TYPE,
              message: ERRORS.customErrorMessage[ERRORS.messageToEnum[statusText]],
            };
          }
          break;
        default:
          break;
      }
    },
    removeError: () => {
      return initialState;
    },
  },
});

export const { addError, removeError } = slice.actions;

export const epics = {
  addError: (action$, state$, action) => {
    const type = state$.value.error.type;
    const message = state$.value.error.message;
    return of(
      addNotification({
        notification: {
          severity: type,
          message,
        },
      }),
    );
  },
};

export default slice.reducer;
