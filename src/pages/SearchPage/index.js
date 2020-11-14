import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import octocat from '@/assets/octocat.png';
import octocat2 from '@/assets/octocat2.png';
import Card from '@/components/Card';
import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import {
  INTERSECTION_OBSERVER_OPTIONS,
  RATE_LIMIT_DURATION,
  UPDATED_TIME_FORMAT,
  WAIT_DURATION,
} from '@/constants/config';
import {
  NOT_SPECIFY,
  ORDER_BY_ASC,
  ORDER_BY_DESC,
  ORDER_KEY,
  QUERY_KEY,
  SORT_BY_FORKS,
  SORT_BY_STARS,
  SORT_KEY,
} from '@/constants/variables';
import { removeError } from '@/redux/slices/error';
import { loadMoreRepositories, searchRepositories } from '@/redux/slices/search';
import { generateQueryParams } from '@/utils';
import styles from './styles';

const useStyles = makeStyles(styles);

const SearchPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [sortBy, setSortBy] = React.useState(NOT_SPECIFY);
  const [orderBy, setOrderBy] = React.useState(NOT_SPECIFY);

  const items = useSelector(state => state.search.items);
  const queryValueFromStore = useSelector(state => state.search.queryValue);
  const isLoadingFromLoadMore = useSelector(state => state.search.isLoadingFromLoadMore);
  const isLoadingFromSearch = useSelector(state => state.search.isLoadingFromSearch);
  const rateLimit = useSelector(state => state.error.rateLimit);

  const timerRef = useRef(void 0); // Set the timer to watch the gap of user input
  const executedMapRef = useRef(''); // Set the map to record the input value, avoid duplicated searching
  const footerRef = useRef(null); // Add footer element reference

  useEffect(() => {
    if (!isEmpty(items)) {
      initObserver();
    }
  }, [items]);

  useEffect(() => {
    const params = [];
    if (inputValue) {
      params.push({
        key: QUERY_KEY,
        value: inputValue,
      });
    }
    if (sortBy && sortBy !== NOT_SPECIFY) {
      params.push({
        key: SORT_KEY,
        value: sortBy,
      });
    }
    if (orderBy && orderBy !== NOT_SPECIFY) {
      params.push({
        key: ORDER_KEY,
        value: orderBy,
      });
    }

    const queryValue = generateQueryParams(params);

    // Reset the time out and then reset it at the below
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    // Set the time out to avoid triggering the event frequently
    timerRef.current = window.setTimeout(async () => {
      timerRef.current = void 0;
      // Break the function if the value is empty or had been searched before
      if (!queryValue || executedMapRef.current === queryValue) {
        return;
      }
      // Record the current input value in the map
      executedMapRef.current = queryValue;
      dispatch(searchRepositories({ queryValue }));
    }, WAIT_DURATION);
  }, [inputValue, sortBy, orderBy]);

  useEffect(() => {
    // If we get rate limit from API
    // We will wait ONE min and create observer with lazy load after waiting
    if (rateLimit) {
      setTimeout(() => {
        dispatch(removeError());
        initObserver();
      }, RATE_LIMIT_DURATION);
    }
  }, [rateLimit]);

  const initObserver = () => {
    // Initialize IntersectionObserver and attaching to the footer div
    const observer = new IntersectionObserver(handleObserver, INTERSECTION_OBSERVER_OPTIONS);
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
  };

  const handleChangeInputValue = event => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleObserver = (entries, observer) => {
    entries.forEach(entry => {
      // How much of the target element is currently visible within the root's intersection ratio
      // Setting this can avoid calling duplicated action when element move out the windows (intersectionRatio = 0)
      if (entry.intersectionRatio === 1) {
        observer.disconnect();
        dispatch(loadMoreRepositories());
      }
    });
  };

  const handleChangeSortBy = event => {
    setSortBy(event.target.value);
  };

  const handleChangeOrderBy = event => {
    setOrderBy(event.target.value);
  };

  return (
    <Page>
      <PageContent>
        <div>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <div>
                <TextField
                  id="inputValue"
                  label="輸入 Repository 關鍵字"
                  value={inputValue}
                  onChange={handleChangeInputValue}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div>
                <FormControl variant="outlined" margin="normal" className="mr-1">
                  <InputLabel id="sort-by-label">排序類型</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={sortBy}
                    onChange={handleChangeSortBy}
                    label="排序類型"
                  >
                    <MenuItem value={NOT_SPECIFY}>{NOT_SPECIFY}</MenuItem>
                    <MenuItem value={SORT_BY_STARS}>根據星星數量</MenuItem>
                    <MenuItem value={SORT_BY_FORKS}>根據 Forks 數量</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" margin="normal">
                  <InputLabel id="order-by-label">排序方式</InputLabel>
                  <Select
                    labelId="order-by-label"
                    id="order-by"
                    value={orderBy}
                    onChange={handleChangeOrderBy}
                    label="排序方式"
                  >
                    <MenuItem value={NOT_SPECIFY}>{NOT_SPECIFY}</MenuItem>
                    <MenuItem value={ORDER_BY_DESC}>由多到少</MenuItem>
                    <MenuItem value={ORDER_BY_ASC}>由少到多</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <div>
            <Grid container spacing={1} justify="center">
              {!isEmpty(items) &&
                items.map(item => (
                  <Card
                    key={shortid.generate()}
                    fullName={item.full_name}
                    description={item.description}
                    updatedAt={format(new Date(item.updated_at), UPDATED_TIME_FORMAT)}
                    htmlUrl={item.html_url}
                    homepage={item.homepage}
                    language={item.language}
                    forks={item.forks}
                    watchers={item.watchers}
                  />
                ))}
            </Grid>
          </div>
          {!queryValueFromStore && isEmpty(items) && (
            <div className="text-center mt-4">
              <img src={octocat} alt="octocat" height="200" />
              <Typography variant="h3" color="textSecondary" component="p">
                想搜尋哪個 Repository？
              </Typography>
            </div>
          )}
          {queryValueFromStore && isEmpty(items) && !isLoadingFromSearch && (
            <div className="text-center mt-4">
              <img src={octocat2} alt="octocat2" height="200" />
              <Typography variant="h3" color="textSecondary" component="p">
                抱歉找不到您要的結果
              </Typography>
            </div>
          )}
          {(isLoadingFromLoadMore || isLoadingFromSearch) && (
            <div className="my-2 justify-center d-flex">
              <CircularProgress size={80} />
            </div>
          )}
          <div className={classes.footer} ref={footerRef} />
        </div>
      </PageContent>
    </Page>
  );
};

export default SearchPage;
