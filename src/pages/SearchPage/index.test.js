import React from 'react';

import { render } from '@/utils/test-utils';
import SearchPage from './index';

it('renders SearchPage without crashing', () => {
  const div = document.createElement('div');
  render(<SearchPage />, div);
});

it('renders SearchPage with snapshot', () => {
  const { asFragment } = render(<SearchPage />);
  expect(asFragment()).toMatchSnapshot();
});