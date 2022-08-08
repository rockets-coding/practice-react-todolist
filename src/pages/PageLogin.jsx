import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

import apis from '../helpers/apis';

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
      <h3>PageLogin</h3>

      <main className="container p-4">
        THIS IS PageLogin.
        <hr />
        <form action="" onSubmit={submitForm} className="text-center">
          <input
            value={email.value}
            type="email"
            name=""
            id=""
            className="my-1 w-full bg-yellow-50"
            onChange={email.onChange}
          />
          <input
            value={password.value}
            type="password"
            name=""
            id=""
            className="my-1 w-full bg-yellow-50"
            onChange={password.onChange}
          />
          <button
            className="m-2 rounded bg-[#333] px-4 py-1 text-white "
            type="submit"
          >
            登入
          </button>
        </form>
      </main>
    </>
  );
}

export default PageLogin;
