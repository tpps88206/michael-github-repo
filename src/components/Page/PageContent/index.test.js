import React from 'react';

import { render } from '@/utils/test-utils';
import PageContent from './index';

describe('test Page Content', () => {
  it('renders PageContent without crashing', () => {
    const div = document.createElement('div');
    render(<PageContent />, div);
  });

  it('renders PageContent with snapshot', () => {
    const { asFragment } = render(<PageContent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
