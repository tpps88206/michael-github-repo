import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import format from 'date-fns/format';
import shortid from 'shortid';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import Card from '@/components/Card';
import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import { INTERSECTION_OBSERVER_OPTIONS, UPDATED_TIME_FORMAT, WAIT_DURATION } from '@/constants/config';
import { loadMoreRepositories, searchRepositories } from '@/redux/slices/search';
import styles from './styles';

const useStyles = makeStyles(styles);

const SearchPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const data = useSelector(state => state.search.data);

  const timerRef = useRef(void 0); // Set the timer to watch the gap of user input
  const executedMapRef = useRef(''); // Set the map to record the input value, avoid duplicated searching
  const loader = useRef(null); // Add loader element reference

  useEffect(() => {
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, INTERSECTION_OBSERVER_OPTIONS);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  // TODO: fix too much event in same time
  // TODO: fix fire the event before search
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
    console.log(entries, observer);

    entries.forEach(entry => {
      // How much of the target element is currently visible within the root's intersection ratio
      // Setting this can avoid calling duplicated action when element move out the windows (intersectionRatio = 0)
      if (entry.intersectionRatio > 0) {
        dispatch(loadMoreRepositories());
      }
    });
  };

  return (
    <Page>
      <PageContent>
        <div className={classes.root}>
          <div>
            <form noValidate autoComplete="off">
              <TextField
                id="inputValue"
                label="搜尋"
                variant="outlined"
                value={inputValue}
                onChange={handleChangeInputValue}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
          <div>
            <Grid container spacing={1} justify="center">
              {!!data &&
                data.items.map(item => (
                  // TODO: duplicated key issue
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
          <div ref={loader}>
            <h2>Load More</h2>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default SearchPage;
