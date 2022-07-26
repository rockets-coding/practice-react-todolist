import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PageHome() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const saveToken = (TOKEN) => {
    setToken(TOKEN);
    localStorage.setItem('TOKEN', TOKEN);
  };
  /* end of saveToken('') */

  const onLogin = () => {
    /**
     * #TODO:
     * - if (res.ok)
     */
    const TOKEN = '1234';

    saveToken(TOKEN);
    navigate('/todos');
  };
  /* end of onLogin() */

  const onSignup = () => {
    const TOKEN = '1234';

    saveToken(TOKEN);
    navigate('/todos');
  };
  /* end of onSignup() */

  if (!token) {
    return (
      <>
        <p className="text-orange-500">!Not Allow!</p>

        <button
          type="button"
          className="my-6 rounded bg-[#333] px-4 py-2 text-white transition-all hover:bg-gray-200"
          onClick={onLogin}
        >
          LOG-IN
        </button>

        <button
          type="button"
          className="my-6 rounded bg-[#333] px-4 py-2 text-white transition-all hover:bg-gray-200"
          onClick={onSignup}
        >
          SIGN-UP
        </button>
      </>
    );
  }
  /* end of if-!token */

  return (
    <>
      <p className="p-2 text-xl ">Welcome!</p>

      <ul>
        <li>
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
        </li>

        <li>
          <button
            type="button"
            className="my-6 rounded bg-[#333] px-4 py-2 text-white transition-all hover:bg-gray-200"
            onClick={() => {
              console.log('GO-TO-DASHBOARD');
              // <Link to="/protected">[Protected]_PageTodos</Link>;
            }}
          >
            DASHBOARD
          </button>
        </li>
      </ul>

      <hr className="h-2 bg-amber-500" />

      <h3>HOME</h3>
      <main>
        THIS IS HOME.
        <p className="text-yellow-500">TOKEN:</p>
        <p>{token}</p>
        {/* <pre>{JSON.stringify(null, 2, token)}</pre> */}
      </main>
    </>
  );
}
/* end of PageHome() */

export default PageHome;
