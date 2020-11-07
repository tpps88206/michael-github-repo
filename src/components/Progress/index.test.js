import React from 'react';

import { render } from '@/utils/test-utils';
import Progress from './index';

it('renders Progress without crashing', () => {
  const div = document.createElement('div');
  render(<Progress />, div);
});

it('renders Progress with snapshot', () => {
  const { asFragment } = render(<Progress />);
  expect(asFragment()).toMatchSnapshot();
});
