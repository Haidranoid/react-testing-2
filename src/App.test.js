import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  /* render components */
  render(<App />);

  /* get elements based on priority https://testing-library.com/docs/queries/about#priority */
  const linkElement = screen.getByRole('link', { name: /learn react/i});

  /* assertions */
  expect(linkElement).toBeInTheDocument();
});
