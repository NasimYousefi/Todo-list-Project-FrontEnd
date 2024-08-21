
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  // const { user } = useContext(UserContext);

  // return user ? children : <Navigate to="/signin" />;
  return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
