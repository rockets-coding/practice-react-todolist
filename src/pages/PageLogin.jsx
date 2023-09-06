import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

import apis from '../helpers/apis';

// import hero from '../images/hero.webp';

function PageLogin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  // const [inputValue, setInputValue] = useState('');
  const email = useInput('');
  const password = useInput('');

  const saveToken = ({ response }) => {
    const AUTH_TOKEN = response.headers?.get('Authorization');
    console.log('AUTH_TOKEN:::', AUTH_TOKEN);

    setToken(AUTH_TOKEN);
    localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log('email', email.value);
    console.log('password', password.value);

    const user = {
      email: email.value,
      password: password.value,
    };

    apis.usersSignIn({ user }).then((res) => {
      console.log(res);

      saveToken(res);
      navigate('/todos');
    });
  };

  return (
    <>
      <hgroup className="mb-8">
        <Link to="/" className="block leading-[48px]">
          <h1 className="mb-4 overflow-hidden whitespace-nowrap bg-logo bg-[length:313px_46.9px] bg-center bg-no-repeat indent-[101%]">
            TODOLIST
          </h1>
        </Link>

        <p className="text-center text-lg font-bold">
          最實用的線上待辦事項服務
        </p>
      </hgroup>

      <form
        action="#"
        onSubmit={submitForm}
        className="mx-auto flex flex-col items-center md:w-[500px]"
      >
        {/* #NOTE: ESLint label-has-associated-control */}
        <label htmlFor="email" className="mb-4 block w-full">
          Email
          <input
            value={email.value}
            type="email"
            name="email"
            id="email"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={email.onChange}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
          />
        </label>

        <label htmlFor="password" className="mb-7 block w-full">
          Password
          <input
            value={password.value}
            type="password"
            name="password"
            id="password"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={password.onChange}
            pattern="^(.{6,})$"
            required
          />
        </label>

        <button
          className="m-2 block rounded bg-[#333] px-4 py-1 text-center text-white"
          type="submit"
        >
          登入
        </button>

        <input
          value="註冊"
          type="button"
          name=""
          id=""
          className="my-2 cursor-pointer hover:scale-100"
          onClick={() => {
            console.log('signup');
            navigate('/signup');
          }}
        />
      </form>
    </>
  );
}

export default PageLogin;
