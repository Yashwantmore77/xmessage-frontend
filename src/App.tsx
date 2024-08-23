import React from 'react';
import { Route, Routes} from 'react-router-dom';
import GlobalLoader from './GlobalLoader';
import AuthProvider from './Utils/AuthProvider';
import LoginForm from './Auth/LoginForm';
import Home from './Home/Home';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalLoader />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            <Home />

          }
        />
        <Route
          path="/"
          element={
            <Home />
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
