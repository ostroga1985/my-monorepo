import { render, fireEvent, cleanup } from '@testing-library/react';
import { Input } from './Input';

test('Input renders with correct text', () => {
  const { getByRole, getAllByRole } = render(<Input />);

  const input = getAllByRole('textbox');
  expect(input).not.toBeNull();
});
