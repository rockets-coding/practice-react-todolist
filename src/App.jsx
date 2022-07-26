import React, { useState, useEffect } from 'react';
// #TODO:
// eslint-disable-next-line object-curly-newline
import { useRoutes, useNavigate } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';

import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import PageHome from './pages/PageHome';
import PageSignup from './pages/PageSignup';
import PageLogin from './pages/PageLogin';

import PageTodos from './pages/PageTodos';
import PageDev from './pages/PageDev';
import RouteNeedAuth from './pages/RouteNeedAuth';
/* end of import */

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const loadToken = localStorage.getItem('TOKEN');
    return loadToken || null;
  });

  const apiTestCheck = () => {
    // console.log('#TODO-API: fetch()', localToken);
    /**
     * #TODO:
     * if (res.ok)
     */
    setToken(token);
    // setToken(loadToken);
    navigate('/todos');
    // IF(!) navigate('/');
  };
  /* end of apiTestCheck() */

  useEffect(() => {
    // console.log('render1-loadToken::', token);
    if (token) {
      console.log('#TODO: API-TestCheck()');
      apiTestCheck();
    }

    return () => {
      // console.log('#TODO: return clear');
    };
  }, []);
  /* end of useEffect() */

  const routesConfig = useRoutes([
    {
      path: '/',
      element: <Layout />,

      children: [
        {
          index: true,
          element: <PageHome />,
        },
        {
          path: '/dev',
          element: <PageDev />,
        },
        {
          path: '/login',
          element: <PageLogin />,
        },
        {
          path: '/signup',
          element: <PageSignup />,
        },
        {
          path: '/todos',
          element: (
            <RouteNeedAuth>
              <PageTodos />
            </RouteNeedAuth>
          ),
        },
        {
          path: '/*',
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  /* end of useRoutes() */

  // return routesConfig;
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {/* <AuthContext.Provider value={{ token, setToken }}> */}
      {/* #TODO:
       * The object passed as the value prop
       *   to the Context provider (at line 90) changes every render.
       * To fix this consider wrapping it in a useMemo hook.
       */}
      {routesConfig}
    </AuthContext.Provider>
  );
}
/* end of App() */

export default App;
