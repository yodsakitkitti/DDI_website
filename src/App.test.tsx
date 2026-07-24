import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the DDI Sandbox page heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /where ideas become innovation/i })).toBeInTheDocument();
});

test('links the primary hero action to the dashboard', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByRole('link', { name: /view group projects/i })).toHaveAttribute(
    'href',
    '/dashboard',
  );
});
