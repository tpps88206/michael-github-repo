import React from 'react';

import { render } from '@/utils/test-utils';
import ErrorPage from './index';

describe('test Error Page', () => {
  it('renders ErrorPage without crashing', () => {
    const div = document.createElement('main');
    render(<ErrorPage />, div);
  });

  it('renders ErrorPage with snapshot', () => {
    const { asFragment } = render(<ErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
