import React , {act} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../LoginForm';
import useAuth from '../../Utils/useAuth';

// Mock the useAuth hook
jest.mock('../../Utils/useAuth');

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.resetAllMocks();
  });

  test('renders login form correctly', () => {
    // Mock useAuth to return false (not authenticated)
    (useAuth as jest.Mock).mockReturnValue(false);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByText(/sign in/i)).toBeTruthy();
  });

  test('shows error message when login fails', async () => {
    // Mock useAuth to return false (not authenticated)
    (useAuth as jest.Mock).mockReturnValue(false);

    // Mock fetch response for failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'Login failed' }),
      } as Response)
    );

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByText(/sign in/i));
    });

    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeTruthy();
  });

  test('redirects to home when already authenticated', async () => {
    // Mock useAuth to return true (authenticated)
    (useAuth as jest.Mock).mockReturnValue(true);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const { container } = render(
        <Router>
          <LoginForm />
        </Router>
      );

      expect(container.innerHTML).toBe('');
    });
  });

  test('calls fetch with correct data when form is submitted', async () => {
    // Mock useAuth to return false (not authenticated)
    (useAuth as jest.Mock).mockReturnValue(false);

    // Mock fetch response for successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-token' }),
      } as Response)
    );

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByText(/sign in/i));
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
    });

    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/login', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: '123456' })
    }));
  });
});
