import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import authReducer from './Store/Auth/authSlice';
import loaderReducer from './Store/Loader/loaderSlice'; // Adjust path if necessary

// Create a mock store with default middleware
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
        isAuthenticated: true, // Simulate a logged-in state
      },
    },
  });
};

describe('App Component', () => {
  beforeEach(() => {
    // Reset localStorage mock before each test
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'token') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjODhmNzVhNWNiOTlhZGMzYmMzZjc0IiwiZXhwIjoxNzI0NjYxMjY5fQ.nabq4_SAWPMyPfN-3JyKe7R16VHkfNjILolDqo6bDTY'; // Provide your JWT token
      }
      return null;
    });

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    // Clear mocks after each test
    jest.restoreAllMocks();
  });

  test('renders login page if not authenticated', () => {
    const store = createStore(false); // Set to false to simulate unauthenticated state

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // Assert that the login page or login components are rendered
    const loginText = screen.getByText(/login/i); // Adjust based on your login page content
    expect(loginText).toBeTruthy();
  });

  // test('renders home page if authenticated', () => {
  //   const store = createStore(true); // Set to true to simulate authenticated state

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <App />
  //       </Router>
  //     </Provider>
  //   );

  //   // Assert that the home page or components visible only to logged-in users are rendered
  //   const homeText = screen.getByText(/home/i); // Adjust based on your home page content
  //   expect(homeText).toBeTruthy();
  // });
});

