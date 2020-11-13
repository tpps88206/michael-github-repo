import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
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
import { removeError } from '@/redux/slices/error';
import { loadMoreRepositories, searchRepositories } from '@/redux/slices/search';
import styles from './styles';

const useStyles = makeStyles(styles);

const SearchPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const items = useSelector(state => state.search.items);
  const inputValueFromStore = useSelector(state => state.search.inputValue);
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
    // Initialize IntersectionObserver and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, INTERSECTION_OBSERVER_OPTIONS);
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
  };

  const handleChangeInputValue = event => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Start lazy input
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(async () => {
      timerRef.current = void 0;
      if (!inputValue || executedMapRef.current === inputValue) {
        return;
      }
      executedMapRef.current = inputValue; // Record the current input value in the map
      dispatch(searchRepositories({ inputValue }));
    }, WAIT_DURATION);
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

  return (
    <Page>
      <PageContent>
        <div className={classes.root}>
          <div>
            <TextField
              id="inputValue"
              label="搜尋"
              value={inputValue}
              onChange={handleChangeInputValue}
              fullWidth
              margin="normal"
            />
          </div>
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
          {!inputValueFromStore && isEmpty(items) && (
            <div className="text-center mt-4">
              <img src={octocat} alt="octocat" height="200" />
              <Typography variant="h3" color="textSecondary" component="p">
                想搜尋哪個 Repository？
              </Typography>
            </div>
          )}
          {inputValueFromStore && isEmpty(items) && !isLoadingFromSearch && (
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
