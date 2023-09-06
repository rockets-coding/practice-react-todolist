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
/**
 * #NOTE:
 * Warning: Functions are not valid as a React child.
 * This may happen
 *  if you return a Component instead of <Component /> from render.
 * Or maybe you meant to call this function rather than return it.
 */

export default RouteNeedAuth;
