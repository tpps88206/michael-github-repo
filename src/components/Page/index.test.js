import React from 'react';

import { render } from '@/utils/test-utils';
import Page from './index';

describe('test Page', () => {
  it('renders Page without crashing', () => {
    const div = document.createElement('div');
    render(<Page />, div);
  });

  it('renders Page with snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
});
