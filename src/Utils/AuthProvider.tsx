import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { hideLoader, showLoader } from '../Store/Loader/loaderSlice';
import { setAuthentication } from '../Store/Auth/authSlice';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // use useNavigate inside a Router context

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(showLoader());
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(setAuthentication(true));
      } else {
        dispatch(setAuthentication(false));
      }
      dispatch(hideLoader());
    };

    checkAuth();
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
