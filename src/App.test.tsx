import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/#/');
});

test('renders the DDI Sandbox page heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /where ideas become innovation/i })).toBeInTheDocument();
});

test('links the primary hero action to the dashboard', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /view group projects/i })).toHaveAttribute(
    'href',
    '/#/dashboard',
  );
});

test('renders the dashboard from a direct hash route', () => {
  window.history.pushState({}, '', '/#/dashboard');
  render(<App />);
  expect(screen.getByRole('heading', { name: /project dashboard/i, level: 1 })).toBeInTheDocument();
});

test('accepts a trailing slash on the dashboard hash route', () => {
  window.history.pushState({}, '', '/#/dashboard/');
  render(<App />);
  expect(screen.getByRole('heading', { name: /project dashboard/i, level: 1 })).toBeInTheDocument();
});

test('reacts to in-app hash navigation without a server rewrite', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('link', { name: /view group projects/i }));
  act(() => window.dispatchEvent(new HashChangeEvent('hashchange')));

  expect(screen.getByRole('heading', { name: /project dashboard/i, level: 1 })).toBeInTheDocument();
});
