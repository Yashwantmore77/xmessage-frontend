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
        try {
          const response = await fetch('http://127.0.0.1:5000/protected', {
            method: 'GET',
            headers: {
              'Authorization': token,
            },
          });

          if (response.ok) {
            dispatch(setAuthentication(true));
          } else {
            localStorage.removeItem('token');
            dispatch(setAuthentication(false));
          }
        } catch (error) {
          localStorage.removeItem('token');
          dispatch(setAuthentication(false));
        }
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
