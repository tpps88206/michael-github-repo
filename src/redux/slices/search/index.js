import { ofType } from 'redux-observable';

import isEmpty from 'lodash/isEmpty';
import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  data: {
    total_count: 0,
    items: [],
  },
  isLoading: false,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initialize: () => {
      return initialState;
    },
    searchRepositories: (state, action) => {
      state.isLoading = true;
    },
    searchRepositoriesFulfilled: (state, action) => {
      const { response } = action.payload;

      if (!isEmpty(response)) {
        const { total_count, items } = response;
        state.data.total_count = total_count;
        state.data.items = items;
      } else {
        state.data.total_count = 0;
        state.data.items = [];
      }
      state.isLoading = false;
    },
    searchRepositoriesRejected: (state, action) => {
      state.isLoading = false;
    },
    searchRepositoriesCancelled: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  initialize,
  searchRepositories,
  searchRepositoriesFulfilled,
  searchRepositoriesRejected,
  searchRepositoriesCancelled,
} = slice.actions;

export const epics = {
  searchRepositories: (action$, state$, action) => {
    const { keywords, page } = action.payload;
    return api.searchRepositories({ keywords, page }).pipe(
      map(res => searchRepositoriesFulfilled(res)),
      catchError(error => of(searchRepositoriesRejected({ type: action.type, error }))),
      takeUntil(action$.pipe(ofType(searchRepositoriesCancelled.type))),
    );
  },
};

export default slice.reducer;
