import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import GlobalLoader from './GlobalLoader';
import loaderReducer from './Store/Loader/loaderSlice'; // Adjust the import path if needed

// Create a mock store with the loader slice
const createStore = (isLoading: boolean) => {
  return configureStore({
          reducer: {
            loader: loaderReducer,
          },
          preloadedState: {
            loader: { isLoading }, // Set the initial state for the test
          },
  });
};

test('renders loading text when isLoading is true', () => {
  const store = createStore(true); // Set isLoading to true

  render(
    <Provider store={store}>
      <GlobalLoader />
    </Provider>
  );
  // Assert that the loading text is rendered
  const loadingText = screen.getByText('Loading');
  expect(loadingText).toBeTruthy();

});

test('does not render loading text when isLoading is false', () => {
  const store = createStore(false); // Set isLoading to false

  render(
    <Provider store={store}>
      <GlobalLoader />
    </Provider>
  );

  // Assert that the loading text is not rendered
  expect(screen.queryByText(/Loading/i)).toBeNull();
});
