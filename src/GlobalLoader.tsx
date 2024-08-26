import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './Store/store';

const GlobalLoader: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return isLoading ? (
    <div className="global-loader">Loading</div>
  ) : null;
};

export default GlobalLoader;
