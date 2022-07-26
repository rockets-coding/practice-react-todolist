import React from 'react';

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// #TODO:
// eslint-disable-next-line react/prop-types
function RouteNeedAuth({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
    // return <Navigate to="/" replace />;
    /**
     * #NOTE:
     * This API is mostly useful in React.Component subclasses
     *  that are not able to use hooks.
     *
     * In functional components,
     *  we recommend you use the useNavigate hook instead.
     */
  }

  return children;
}

export default RouteNeedAuth;
