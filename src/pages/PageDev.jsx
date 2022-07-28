import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apis from '../helpers/apis';
import useAuth from '../hooks/useAuth';

import logo from '../images/logo.svg';
import poweredBy from '../images/powered-by-vitawind-dark.png';

function PageDev() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [devLog, setDevLog] = useState(null);

  const { token, setToken } = useAuth();

  const user = {
    email: 'g7@dev.me',
    password: '000000',
    nickname: 'Guest',
  };

  const todo = {
    content: new Date().toISOString(),
  };

  const id = '578847ad88dd1629cf85feac59c43e8c';

  const saveToken = ({ response }) => {
    setDevLog(response);

    const AUTH_TOKEN = response.headers?.get('Authorization');
    console.log('AUTH_TOKEN:::', AUTH_TOKEN);
    setToken(AUTH_TOKEN);
    localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
  };

  const removeToken = ({ response }) => {
    setDevLog(response);
    console.log('REMOVE-AUTH_TOKEN:::');

    setToken(null);
    localStorage.removeItem('AUTH_TOKEN');
  };

  useEffect(() => {
    if (devLog) {
      console.log('devLog');
    }
  }, [devLog]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/posts?_limit=10`,
  //       );

  //       if (!response.ok) {
  //         throw new Error(
  //           `This is an HTTP error: The status is ${response.status}`,
  //         );
  //       }

  //       let actualData = await response.json();
  //       setData(actualData);
  //       setError(null);
  //     } catch (err) {
  //       setError(err.message);
  //       setData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <div className="text-center selection:bg-green-900">
      <p>{JSON.stringify(null, 2, devLog)}</p>
      {/* <p>{devLog}</p> */}

      <header className="container">
        <input
          value="GET"
          type="button"
          className="m-2 rounded bg-[#6AF] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.todosGet({ token }).then((res) => {
              console.log(res);
            });
          }}
        />

        <input
          value="POST"
          type="button"
          className="m-2 rounded bg-[#4C9] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.todosPost({ token, todo }).then((res) => {
              console.log(res);
            });
          }}
        />

        <input
          value="PUT"
          type="button"
          className="m-2 rounded bg-[#4C9] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.todosPut({ token, id, todo }).then((res) => {
              console.log(res);
            });
          }}
        />

        <input
          value="DELETE"
          type="button"
          className="m-2 rounded bg-[#F33] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.todosDelete({ token, id }).then((res) => {
              console.log(res);
            });
          }}
        />

        <input
          value="TOGGLE"
          type="button"
          className="m-2 rounded bg-[#4C9] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.todosToggle({ token, id }).then((res) => {
              console.log(res);
            });
          }}
        />

        <hr />

        <input
          value="CHECK"
          type="button"
          className="m-2 rounded bg-[#6AF] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.testCheck({ token }).then((res) => {
              console.log(res);
              navigate('/todos');
            });
          }}
        />

        <input
          value="SIGN-UP"
          type="button"
          className="m-2 rounded bg-[#4C9] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            apis.usersSignUp({ user }).then((res) => {
              console.log(res);

              saveToken(res);
            });
          }}
        />

        <button
          type="button"
          className="m-2 rounded bg-[#4C9] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            apis.usersSignIn({ user }).then((res) => {
              console.log(res);

              saveToken(res);
            });
          }}
          // onClick={apis.usersSignIn}
        >
          SIGN-IN
        </button>

        <input
          value="SIGN-OUT"
          type="button"
          className="m-2 rounded bg-[#F33] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
          onClick={() => {
            console.log('check-Token::', token);

            apis.usersSignOut({ token }).then((res) => {
              console.log(res);

              removeToken(res);
              navigate('/');
            });
          }}
        />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin"
          alt="logo"
        />
        <style>
          {
            '\
            .animate-speed{\
              animation-duration:20s;\
            }\
          '
          }
        </style>

        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
          Vite + React + Tailwindcss v3
        </p>

        <p className="mt-3">
          <button
            type="button"
            className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200"
            onClick={() => setCount((prevCount) => prevCount + 1)}
          >
            count is:
            {count}
          </button>
        </p>

        <p>
          Edit
          <code className="text-[#8d96a7]">App.jsx</code>
          and save to test HMR updates.
        </p>

        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}

          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>

        <img src={poweredBy} className="mx-auto my-8" alt="powered-by" />
      </main>
    </div>
  );
}

export default PageDev;
