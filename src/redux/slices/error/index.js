import { of } from 'rxjs';

import { createSlice } from '@reduxjs/toolkit';

import { ERRORS } from '@/constants/errors';
import { ERROR_TYPE } from '@/constants/variables';
import { addNotification } from '@/redux/slices/notification';

const initialState = {
  type: '',
  message: '',
  rateLimit: false,
};

const slice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action) => {
      const { status, statusText } = action.payload;

      if (statusText === ERRORS.UNPROCESSABLE_ENTITY && status === ERRORS.mapCustomErrorCode.UNPROCESSABLE_ENTITY) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage[ERRORS.messageToEnum[statusText]],
        };
      }
      if (statusText === ERRORS.RATE_LIMIT_EXCEEDED && status === ERRORS.mapCustomErrorCode.RATE_LIMIT_EXCEEDED) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage[ERRORS.messageToEnum[statusText]],
          rateLimit: true,
        };
      }
      if (statusText === ERRORS.NOT_MODIFIED && status === ERRORS.mapCustomErrorCode.NOT_MODIFIED) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage.SERVER_ERROR,
        };
      }
      if (statusText === ERRORS.FORBIDDEN && status === ERRORS.mapCustomErrorCode.FORBIDDEN) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage.SERVER_ERROR,
        };
      }
      if (statusText === ERRORS.SERVICE_UNAVAILABLE && status === ERRORS.mapCustomErrorCode.SERVICE_UNAVAILABLE) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage.SERVER_ERROR,
        };
      }
      if (statusText === ERRORS.NOT_FOUND && status === ERRORS.mapCustomErrorCode.NOT_FOUND) {
        return {
          type: ERROR_TYPE,
          message: ERRORS.customErrorMessage.SERVER_ERROR,
        };
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
