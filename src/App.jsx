// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';
import apis from './helpers/apis';

import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import PageHome from './pages/PageHome';
import PageSignup from './pages/PageSignup';
import PageLogin from './pages/PageLogin';

import PageTodos from './pages/PageTodos';
import RouteNeedAuth from './pages/RouteNeedAuth';
/* end of import */

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const loadToken = localStorage.getItem('AUTH_TOKEN');
    return loadToken || null;
  });

  useEffect(() => {
    if (token) {
      console.log('#TODO: API-TestCheck()');

      apis.testCheck({ token }).then((res) => {
        console.log(res);
        const { result } = res;
        console.log(result.message);
        // #TODO: handleError;
        // alert(result.message);

        navigate('/todos');
        /**
         * #TODO:
         * if (res.ok)
         */
        // IF(!) navigate('/');
      });
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

  // const authProvideValue = useMemo(
  //   () => ({ authProvideValue: { token, setToken } }),
  //   [],
  // );

  const authProvideValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  return (
    // <AuthContext.Provider value={authProvideValue}>
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={authProvideValue}>
      {/* #TODO:
       * The object passed as the value prop
       *   to the Context provider (at line 90) changes every render.
       * To fix this consider wrapping it in a useMemo hook.
       * https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
       */}

      {routesConfig}
    </AuthContext.Provider>
  );
}
/* end of App() */

export default App;
