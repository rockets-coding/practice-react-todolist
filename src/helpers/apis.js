const BASE_URL = 'https://todoo.5xcamp.us';

// #TODO:
// const handleError = (error) => {
//   console.log('error.message::', error.message);
//   // return ;
// };

const asyncFetch = async ({
  url, method, data, Authorization,
} = {}) => {
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

  // console.log('API-requestOptions::', requestOptions);

  const response = await fetch(url, requestOptions);
  const result = await response.json();

  // console.log('response::', response);
  // console.log('result::', result);
  return { response, result };
};

const usersSignIn = ({ user }) => asyncFetch({
  url: `${BASE_URL}/users/sign_in`,
  method: 'POST',
  data: { user },
});

const usersSignUp = ({ user }) => asyncFetch({
  url: `${BASE_URL}/users`,
  method: 'POST',
  data: { user },
});

const usersSignOut = ({ token }) => asyncFetch({
  url: `${BASE_URL}/users/sign_out`,
  method: 'DELETE',
  Authorization: token,
  // data: { user },
});

const testCheck = ({ token }) => asyncFetch({
  url: `${BASE_URL}/check`,
  method: 'GET',
  Authorization: token,
  // data: { user },
});

const todosGet = ({ token }) => asyncFetch({
  url: `${BASE_URL}/todos`,
  method: 'GET',
  Authorization: token,
  // data: { user },
});

const todosPost = ({ token, todo }) => asyncFetch({
  url: `${BASE_URL}/todos`,
  method: 'POST',
  Authorization: token,
  data: { todo },
});

const todosPut = ({ token, id, todo }) => asyncFetch({
  url: `${BASE_URL}/todos/${id}`,
  method: 'PUT',
  Authorization: token,
  data: { todo },
});

const todosDelete = ({ token, id }) => asyncFetch({
  url: `${BASE_URL}/todos/${id}`,
  method: 'DELETE',
  Authorization: token,
  // data: { user },
});

const todosToggle = ({ token, id }) => asyncFetch({
  url: `${BASE_URL}/todos/${id}/toggle`,
  method: 'PATCH',
  Authorization: token,
  // data: { user },
});

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
