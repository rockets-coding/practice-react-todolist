import React from 'react';

import useAuth from '../hooks/useAuth';
import PageLogin from './PageLogin';
import PageTodos from './PageTodos';

function PageHome() {
  const { token } = useAuth();

  if (!token) {
    return (
      <>
        <p className="text-orange-500">!Not Allow!</p>
        <PageLogin />
      </>
    );
  }
  /* end of if-!token */

  return <PageTodos />;
}
/* end of PageHome() */

export default PageHome;
