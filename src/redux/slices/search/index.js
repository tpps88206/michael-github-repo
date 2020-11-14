import { ofType } from 'redux-observable';

import concat from 'lodash/concat';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import api from '@/api';
import { PER_PAGE, SEARCH_DATA_PICKERS } from '@/constants/config';
import { addError } from '@/redux/slices/error';

const initialState = {
  queryValue: '', // input value for searching
  page: 1, // current page number
  totalCount: 0, // save number of the total result count
  items: [], // pick specified key of result and save it
  isLoadingFromSearch: false,
  isLoadingFromLoadMore: false,
  isMoreData: false,
  // code = 0 : no action is executing
  // code = 1 : action is executing now
  // code > 1 : duplicated actions are executing, need to reject some action
  lockingCode: 0,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchRepositories: (state, action) => {
      const { queryValue } = action.payload;
      state.queryValue = queryValue;
      state.page = 1;
      state.totalCount = 0;
      state.items = [];
      state.isLoadingFromSearch = true;
      state.isMoreData = false;
      state.lockingCode = 0;
    },
    searchRepositoriesFulfilled: (state, action) => {
      const { response } = action.payload;

      if (!isEmpty(response)) {
        const { total_count, items } = response;

        state.totalCount = total_count;
        state.items = items.map(item => {
          return pick(item, SEARCH_DATA_PICKERS);
        });

        state.isMoreData = total_count > PER_PAGE;
      }

      state.isLoadingFromSearch = false;
    },
    searchRepositoriesRejected: (state, action) => {
      state.isLoadingFromSearch = false;
    },
    searchRepositoriesCancelled: (state, action) => {
      state.isLoadingFromSearch = false;
    },
    loadMoreRepositories: (state, action) => {
      state.page = state.page + 1;
      state.lockingCode = state.lockingCode + 1;
      state.isLoadingFromLoadMore = true;
    },
    loadMoreRepositoriesFulfilled: (state, action) => {
      const { response } = action.payload;

      if (!isEmpty(response)) {
        const { items } = response;

        state.items = concat(
          state.items,
          items.map(item => {
            return pick(item, SEARCH_DATA_PICKERS);
          }),
        );

        state.isMoreData = state.totalCount > (state.page - 1) * PER_PAGE + items.length;
      } else {
        // The api status is ok but did not get the response successfully
        state.page = state.page - 1;
      }
      state.lockingCode = state.lockingCode - 1;
      state.isLoadingFromLoadMore = false;
    },
    loadMoreRepositoriesRejected: (state, action) => {
      state.page = state.page - 1;
      state.lockingCode = state.lockingCode - 1;
      state.isLoadingFromLoadMore = false;
    },
    loadMoreRepositoriesCancelled: (state, action) => {
      state.page = state.page - 1;
      state.lockingCode = state.lockingCode - 1;
      state.isLoadingFromLoadMore = false;
    },
  },
});

export const {
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
    const { queryValue, page } = action.payload;

    if (!queryValue) {
      return of(searchRepositoriesCancelled({ type: action.type }));
    }

    return api.searchRepositories({ queryValue, page }).pipe(
      map(res => searchRepositoriesFulfilled(res)),
      catchError(error => of(searchRepositoriesRejected({ type: action.type, error }))),
      takeUntil(action$.pipe(ofType(searchRepositoriesCancelled.type))),
    );
  },
  searchRepositoriesRejected: (action$, state$, action) => {
    const { error } = action.payload;
    return of(
      addError({
        status: get(error, 'xhr.status'),
        statusText: get(error, 'xhr.statusText'),
      }),
    );
  },
  loadMoreRepositories: (action$, state$, action) => {
    const queryValue = state$.value.search.queryValue;
    const page = state$.value.search.page;
    const isMoreData = state$.value.search.isMoreData;
    const lockingCode = state$.value.search.lockingCode;

    if (!queryValue || !isMoreData) {
      return of(loadMoreRepositoriesCancelled({ type: action.type }));
    }

    if (lockingCode > 1) {
      return of(loadMoreRepositoriesCancelled({ type: action.type }));
    }

    return api.searchRepositories({ queryValue, page }).pipe(
      map(res => loadMoreRepositoriesFulfilled(res)),
      catchError(error => of(loadMoreRepositoriesRejected({ type: action.type, error }))),
      takeUntil(action$.pipe(ofType(loadMoreRepositoriesCancelled.type))),
    );
  },
  loadMoreRepositoriesRejected: (action$, state$, action) => {
    const { error } = action.payload;
    return of(
      addError({
        status: get(error, 'xhr.status'),
        statusText: get(error, 'xhr.statusText'),
      }),
    );
  },
};

export default slice.reducer;
