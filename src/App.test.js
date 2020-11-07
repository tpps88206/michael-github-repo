import React from 'react';

import { render, screen } from '@testing-library/react';

import App from '@/App';

it('renders APP with progress first', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});

it('renders APP without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
