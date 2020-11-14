import React from 'react';

import { render } from '@/utils/test-utils';
import SearchPage from './index';

describe('test Search Page', () => {
  it('renders SearchPage without crashing', () => {
    const div = document.createElement('main');
    render(<SearchPage />, div);
  });

  it('renders SearchPage with snapshot', () => {
    const { asFragment } = render(<SearchPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
