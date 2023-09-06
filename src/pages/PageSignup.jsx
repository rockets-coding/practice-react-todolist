import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

import apis from '../helpers/apis';

function PageSignup() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  // const [inputValue, setInputValue] = useState('');
  const email = useInput('');
  const password = useInput('');
  const passwordConfirm = useInput('');
  const nickname = useInput('');

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
      nickname: nickname.value,
    };

    apis.usersSignUp({ user }).then((res) => {
      console.log(res);

      if (res.response.ok) {
        saveToken(res);
        navigate('/todos');
      }
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

        <p className="text-center text-lg font-bold">註冊帳號</p>
      </hgroup>

      <form
        action=""
        onSubmit={submitForm}
        className="mx-auto flex flex-col items-center md:w-[500px]"
      >
        <label htmlFor="email" className="my-1 block w-full">
          Email
          <input
            placeholder="EMAIL"
            value={email.value}
            type="email"
            name="email"
            id="email"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={email.onChange}
          />
        </label>

        <label htmlFor="password" className="my-1 block w-full">
          Nickname
          <input
            placeholder="NICKNAME"
            value={nickname.value}
            type="text"
            name="nickname"
            id="nickname"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={nickname.onChange}
          />
        </label>

        <label htmlFor="password" className="my-1 block w-full">
          Password
          <input
            placeholder="PASSWORD"
            value={password.value}
            type="password"
            name="password"
            id="password"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={password.onChange}
          />
        </label>

        <label htmlFor="passwordConfirm" className="my-1 block w-full">
          Password Confirm
          <input
            placeholder="CONFIRM"
            value={passwordConfirm.value}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="my-1 w-full rounded bg-yellow-50 p-1"
            onChange={passwordConfirm.onChange}
          />
        </label>

        <button
          className="m-2 block rounded bg-[#333] px-16 py-2 text-center text-white"
          type="submit"
        >
          註冊帳號
        </button>

        <input
          value="登入"
          type="button"
          name=""
          id=""
          className="my-2 cursor-pointer hover:scale-100"
          onClick={() => {
            console.log('login');
            navigate('/login');
          }}
        />
      </form>
    </>
  );
}

export default PageSignup;
