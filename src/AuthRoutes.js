/**
 * Auth gaurd component for restricting unauthorized access
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const db = sessionStorage.getItem('db');
  return (
    <Route {...rest} render={(props) => (
      db
      ? <Component {...props} /> 
      : <Redirect to='/' />
    )} />
  );
};

export default ProtectedRoute;