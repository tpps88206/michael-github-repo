import React from 'react';

import { render } from '@/utils/test-utils';
import Card from './index';

describe('test Card', () => {
  it('renders Card without crashing', () => {
    const div = document.createElement('div');
    render(<Card />, div);
  });

  it('renders Card with snapshot', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});
