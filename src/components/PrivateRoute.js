import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RoleContext from '../utils/roleContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const role = useContext(RoleContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (roles && roles.indexOf(role) === -1) {
          return <Redirect to={{ pathname: '/products' }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
