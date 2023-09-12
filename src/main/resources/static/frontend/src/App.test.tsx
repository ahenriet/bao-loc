import { render, screen } from '@testing-library/react';
import App from './App';
import * as React from 'react';

test('Solve it! button is displayed when app starts', () => {
  render(<App />);
  const solveItButton = screen.getByRole('button');
  expect(solveItButton).toBeInTheDocument();
  expect(solveItButton.innerHTML).toContain('Solve it!')
});
