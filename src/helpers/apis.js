const BASE_URL = 'https://todoo.5xcamp.us';

// const user = {
//   email: 'g3@dev.me',
//   password: '000000',
//   // nickname: 'Guest',
// };

// const todo = {
//   content: new Date().toISOString(),
// };

// const AUTH_TOKEN = ;

// const usersSignUp = async (requestOptions) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ user }),
//   };

//   const result = await fetch(
//     `${BASE_URL}/users/sign_in`,
//     requestOptions,
//   ).then((response) => {
//     console.log(response.json);
//     return response.json();
//   });
//   console.log('result::', result);
// };

// const asyncFetch = async (url, config) => {};

const asyncFetch = async ({ url, method, data, Authorization } = {}) => {
  // #NOTE: CH08
  // #REVIEW: naming

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },

    body: data ? JSON.stringify(data) : null,
    method,
  };

  console.log('API-requestOptions::', requestOptions);

  const response = await fetch(url, requestOptions);
  const result = await response.json();

  console.log('response::', response);
  console.log('result::', result);
  return { response, result };
};

const usersSignIn = ({ user }) => {
  console.log('user::', user);

  return asyncFetch({
    url: `${BASE_URL}/users/sign_in`,
    method: 'POST',
    data: { user },
  });
};

const usersSignUp = ({ user }) => {
  console.log('user::', user);

  return asyncFetch({
    url: `${BASE_URL}/users`,
    method: 'POST',
    data: { user },
  });
};

const usersSignOut = ({ token }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/users/sign_out`,
    method: 'DELETE',
    Authorization: token,
    // data: { user },
  });
};

const testCheck = ({ token }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/check`,
    method: 'GET',
    Authorization: token,
    // data: { user },
  });
};

const todosGet = ({ token }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/todos`,
    method: 'GET',
    Authorization: token,
    // data: { user },
  });
};

const todosPost = ({ token, todo }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/todos`,
    method: 'POST',
    Authorization: token,
    data: { todo },
  });
};

const todosPut = ({ token, id, todo }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/todos/${id}`,
    method: 'PUT',
    Authorization: token,
    data: { todo },
  });
};

const todosDelete = ({ token, id }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/todos/${id}`,
    method: 'DELETE',
    Authorization: token,
    // data: { user },
  });
};

const todosToggle = ({ token, id }) => {
  console.log('Authorization::', token);

  return asyncFetch({
    url: `${BASE_URL}/todos/${id}/toggle`,
    method: 'PATCH',
    Authorization: token,
    // data: { user },
  });
};

const apis = {
  testCheck,

  usersSignUp,
  usersSignIn,
  usersSignOut,

  todosGet,
  todosPost,
  todosToggle,
  todosDelete,
  todosPut,
};

export default apis;
