import React from 'react';
import useAuth from '../hooks/useAuth';

function PageHome() {
  const { token } = useAuth();

  return (
    <>
      <h3>HOME</h3>
      <main>
        THIS IS HOME.
        <p className="text-yellow-500">
          TOKEN:
          <pre>{JSON.stringify(null, 2, token)}</pre>
        </p>
      </main>
    </>
  );
}

export default PageHome;
