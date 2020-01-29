import React from 'react';
import { render } from '@testing-library/react';
import VehicleComponent from './vehicle';

test('renders learn react link', () => {
  const { getByText } = render(<VehicleComponent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
