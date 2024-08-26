import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import authReducer from '../../Store/Auth/authSlice';
import loaderReducer from '../../Store/Loader/loaderSlice'; // Adjust path if necessary

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const createStore = (isAuthenticated: boolean) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      loader: loaderReducer,
    },
    preloadedState: {
      loader: {
        isLoading: false, // Set isLoading to false
      },
      auth: {
        isAuthenticated, // Set authentication state
      },
    },
  });
};

describe('LogoutButton', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset localStorage mock before each test
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') {
        return 'mocked_token'; // Provide your mocked token
      }
      return null;
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('dispatches logout action, removes token, and navigates to login', () => {
    const store = createStore(true); // Set to true to simulate authenticated state
    render(
      <Provider store={store}>
        <LogoutButton />
      </Provider>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Check if the token was removed from localStorage
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('token');

    // Check if the user was navigated to the login page
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
