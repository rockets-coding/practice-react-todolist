import React from 'react';
import useAuth from '../hooks/useAuth';

function PageTodos() {
  const { token } = useAuth();

  return (
    <>
      <h3>PageTodos</h3>
      <main>
        THIS IS PageTodos.
        <p className="text-yellow-500">
          TOKEN:
          <pre>{JSON.stringify(null, 2, token)}</pre>
        </p>
      </main>
    </>
  );
}

export default PageTodos;
