import { ajax } from 'rxjs/ajax';

import { common } from '@/config';
import { PER_PAGE } from '@/constants/config';
import { PAGE_KEY, PER_PAGE_KEY, QUERY_KEY } from '@/constants/variables';
import { getHeaders } from './utils';

export const searchRepositories = ({ inputValue, page }) => {
  // Set API path
  let path = '/search/repositories';

  // SeT the keywords for query
  path = `${path}?${QUERY_KEY}=${inputValue}`;

  // Set page number of the results to fetch.
  if (page) {
    path = `${path}&${PAGE_KEY}=${page}`;
  }

  // Set how many results per page
  path = `${path}&${PER_PAGE_KEY}=${PER_PAGE}`;

  // Fire API
  return ajax({
    method: 'GET',
    url: common.api_proxy_uri + `${path}`,
    headers: getHeaders(),
  });
};
