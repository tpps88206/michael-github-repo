import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import Card from '@/components/Card';
import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import { searchRepositories } from '@/redux/slices/search';
import styles from './styles';
const useStyles = makeStyles(styles);

const SearchPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [keywords, setKeywords] = useState('');

  const searchData = useSelector(state => state.search.data);

  const handleChangeKeywords = event => {
    const keywords = event.target.value;
    setKeywords(keywords);
  };

  const handleClickSearchButton = () => {
    dispatch(searchRepositories({ keywords }));
  };

  return (
    <Page>
      <PageContent>
        <div className={classes.root}>
          <div>
            <form noValidate autoComplete="off">
              <TextField id="search-keywords" label="Keywords" value={keywords} onChange={handleChangeKeywords} />
            </form>
          </div>
          <div>
            {/*TODO: remove search button*/}
            <Button variant="contained" color="primary" onClick={handleClickSearchButton}>
              Search
            </Button>
          </div>
          <div>
            {searchData &&
              searchData.items.map(item => (
                <Card key={item.id} fullName={item.full_name} description={item.description} />
              ))}
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default SearchPage;
