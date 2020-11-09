import { ofType } from 'redux-observable';

import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import api from '@/api';
import { PER_PAGE, SEARCH_DATA_PICKERS } from '@/constants/config';

const initialState = {
  inputValue: '', // input value for searching
  page: 1, // current page number
  data: {
    totalCount: 0, // save number of the total result count
    items: [], // pick specified key of result and save it
  },
  isLoading: false,
  isMoreData: false,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    initialize: () => {
      return initialState;
    },
    searchRepositories: (state, action) => {
      const { inputValue } = action.payload;
      state.inputValue = inputValue;
      state.page = 1;
      state.isLoading = true;
    },
    searchRepositoriesFulfilled: (state, action) => {
      const { response } = action.payload;

      if (!isEmpty(response)) {
        const { total_count, items } = response;

        state.data.totalCount = total_count;
        state.data.items = items.map(item => {
          return pick(item, SEARCH_DATA_PICKERS);
        });

        state.isMoreData = total_count > PER_PAGE;
      } else {
        state.data.totalCount = 0;
        state.data.items = [];
        state.isMoreData = false;
      }

      state.isLoading = false;
    },
    searchRepositoriesRejected: (state, action) => {
      state.isLoading = false;
    },
    searchRepositoriesCancelled: (state, action) => {
      state.isLoading = false;
    },
    loadMoreRepositories: (state, action) => {
      state.page = state.page + 1;
      state.isLoading = true;
    },
    loadMoreRepositoriesFulfilled: (state, action) => {
      const { response } = action.payload;

      if (!isEmpty(response)) {
        const { items } = response;

        state.data.items = concat(
          state.data.items,
          items.map(item => {
            return pick(item, SEARCH_DATA_PICKERS);
          }),
        );

        state.isMoreData = state.data.totalCount > (state.page - 1) * PER_PAGE + items.length;
      } else {
        // The api status is ok but did not get the response successfully
        state.page = state.page - 1;
      }
      state.isLoading = false;
    },
    loadMoreRepositoriesRejected: (state, action) => {
      state.page = state.page - 1;
      state.isLoading = false;
    },
    loadMoreRepositoriesCancelled: (state, action) => {
      state.page = state.page - 1;
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
  loadMoreRepositories,
  loadMoreRepositoriesFulfilled,
  loadMoreRepositoriesRejected,
  loadMoreRepositoriesCancelled,
} = slice.actions;

export const epics = {
  searchRepositories: (action$, state$, action) => {
    const { inputValue, page } = action.payload;
    if (!inputValue) {
      return of(searchRepositoriesRejected({ type: action.type }));
    }

    return api.searchRepositories({ inputValue, page }).pipe(
      map(res => searchRepositoriesFulfilled(res)),
      catchError(error => of(searchRepositoriesRejected({ type: action.type, error }))),
      takeUntil(action$.pipe(ofType(searchRepositoriesCancelled.type))),
    );
  },
  loadMoreRepositories: (action$, state$, action) => {
    const inputValue = state$.value.search.inputValue;
    const page = state$.value.search.page;
    const isMoreData = state$.value.search.isMoreData;
    if (!inputValue || !isMoreData) {
      return of(loadMoreRepositoriesRejected({ type: action.type }));
    }

    return api.searchRepositories({ inputValue, page }).pipe(
      map(res => loadMoreRepositoriesFulfilled(res)),
      catchError(error => of(loadMoreRepositoriesRejected({ type: action.type, error }))),
      takeUntil(action$.pipe(ofType(loadMoreRepositoriesCancelled.type))),
    );
  },
};

export default slice.reducer;
