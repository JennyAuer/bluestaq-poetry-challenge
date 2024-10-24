import React from 'react';
import { render, screen } from '@testing-library/react';
import { PoemTable } from './poemTable';
test('renders learn react link', () => {
  render(<PoemTable />);
  const linkElement = screen.getByText(/It worked!/i);
  expect(linkElement).toBeInTheDocument();
});