import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthorPage } from './AuthorPage';

test('renders learn react link', () => {
  render(<AuthorPage />);
  const linkElement = screen.getByText(/It worked!/i);
  expect(linkElement).toBeInTheDocument();
});
