import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoCall from '../VideoCall';

test('renders VideoCall component', () => {
  render(<VideoCall />);
  const startButton = screen.getByText(/Start Video Call/i);
  expect(startButton).toBeTruthy();
});
