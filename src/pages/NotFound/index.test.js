import React from 'react';

import { render } from '@/utils/test-utils';
import NotFound from './index';

it('renders NotFound without crashing', () => {
  const div = document.createElement('main');
  render(<NotFound />, div);
});

it('renders NotFound with snapshot', () => {
  const { asFragment } = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot();
});
