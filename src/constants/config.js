export const PER_PAGE = 15; // Results per page (max 100)
// Creates an object composed of the picked object properties.
export const SEARCH_DATA_PICKERS = [
  'id',
  'full_name',
  'description',
  'updated_at',
  'html_url',
  'homepage',
  'language',
  'forks',
  'watchers',
];
export const UPDATED_TIME_FORMAT = 'yyyy年M月d日 HH:mm:ss';
export const WAIT_DURATION = 500;
export const INTERSECTION_OBSERVER_OPTIONS = {
  root: null, // Viewer
  rootMargin: '0px', // Move the entire lens
  threshold: 1.0, // Refers to how much part of the element itself appears in your lens
};
