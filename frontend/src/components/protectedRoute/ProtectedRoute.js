import React, { useContext } from 'react';
import {AuthenticationContext} from '../authenticationProvider/AuthenticationProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {isLoggedIn} = useContext(AuthenticationContext)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children
}

export default ProtectedRoute;