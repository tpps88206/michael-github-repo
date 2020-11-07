import React from 'react';

import { render } from '@/utils/test-utils';
import AppFrame from './index';

it('renders AppFrame without crashing', () => {
  const div = document.createElement('div');
  render(<AppFrame />, div);
});

it('renders AppFrame with snapshot', () => {
  const { asFragment } = render(<AppFrame />);
  expect(asFragment()).toMatchSnapshot();
});
