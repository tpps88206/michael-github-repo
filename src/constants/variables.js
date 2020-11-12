// The query contains one or more search keywords and qualifiers.
// Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as GitHub.com.
export const QUERY_KEY = 'q';
// Sorts the results of your query by number of stars, forks, or help-wanted-issues or how recently the items were updated.
export const SORT_KEY = 'sort';
// Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc).
// This parameter is ignored unless you provide sort.
export const ORDER_KEY = 'order';
export const PER_PAGE_KEY = 'per_page'; // Results per page (max 100)
export const PAGE_KEY = 'page'; // Page number of the results to fetch.
export const ERROR_TYPE = 'error';
export const WARNING_TYPE = 'warning';
export const INFO_TYPE = 'info';
export const SUCCESS_TYPE = 'success';
