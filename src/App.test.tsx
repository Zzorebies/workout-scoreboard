import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const closeButton = screen.getByText(/close/i);
  const submitButton = screen.getByText(/submit/i);
  expect(closeButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
