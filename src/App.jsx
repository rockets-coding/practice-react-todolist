import React, { useState } from 'react';
import { useRoutes, Link, Outlet } from 'react-router-dom';

import AuthContext from './contexts/AuthContext';

import PageNotFound from './pages/PageNotFound';
import PageHome from './pages/PageHome';
import PageSignup from './pages/PageSignup';
import PageLogin from './pages/PageLogin';

import PageTodos from './pages/PageTodos';
import PageDev from './pages/PageDev';
import RouteNeedAuth from './pages/RouteNeedAuth';

function Layout() {
  return (
    <>
      <nav>
        <ul className="text-blue">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/signup">SIGN-UP</Link>
          </li>
          <li>
            <Link to="/login">LOG-IN</Link>
          </li>
          <li>
            <Link to="/todos">TODOS</Link>
          </li>
          <li>
            <Link to="dev">Dev</Link>
          </li>
          <li>
            <Link to="idontknowwheretogo">404</Link>
          </li>
        </ul>
      </nav>
      <hr className="h-2 bg-slate-300" />

      <Outlet />
    </>
  );
}

function App() {
  const [token, setToken] = useState(null);

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

  // return routesConfig;
  return (
    <AuthContext.Provider value={(token, setToken)}>
      {routesConfig}
    </AuthContext.Provider>
  );
}

export default App;
