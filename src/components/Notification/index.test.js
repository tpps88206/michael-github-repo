import React from 'react';

import { render } from '@/utils/test-utils';
import Notification from './index';

describe('test Notification', () => {
  it('renders Notification without crashing', () => {
    const div = document.createElement('div');
    render(<Notification />, div);
  });

  it('renders Notification with snapshot', () => {
    const { asFragment } = render(<Notification />);
    expect(asFragment()).toMatchSnapshot();
  });
});
