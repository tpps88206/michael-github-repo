import React from 'react';

import { render } from '@/utils/test-utils';
import Search from './index';

it('renders Search without crashing', () => {
  const div = document.createElement('div');
  render(<Search />, div);
});

it('renders Search with snapshot', () => {
  const { asFragment } = render(<Search />);
  expect(asFragment()).toMatchSnapshot();
});
