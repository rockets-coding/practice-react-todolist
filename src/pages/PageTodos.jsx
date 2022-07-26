import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PageTodos() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  return (
    <>
      <header>
        THIS IS PageTodos.
        <p className="text-yellow-500">TOKEN:</p>
        <p>{token}</p>
        {/* <pre>{JSON.stringify(null, 2, token)}</pre> */}
        <button
          type="button"
          className="rounded-md bg-sky-500 py-1 px-3 text-white  hover:bg-sky-700"
          onClick={() => {
            setToken(null);
            // localStorage.removeItem('token');
            localStorage.clear();

            navigate('/');
          }}
        >
          LOG-OUT
        </button>
      </header>

      <main>
        <h3>PageTodos</h3>
      </main>
    </>
  );
}

export default PageTodos;
