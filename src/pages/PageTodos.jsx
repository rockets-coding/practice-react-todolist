import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import apis from '../helpers/apis';
import TodoItems from '../components/TodoItems';

function PageTodos() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [todosData, setTodosData] = useState([]);
  const [modifyTime, setModifyTime] = useState('');
  const [tabType, setTabType] = useState('');

  const todo = {
    content: `UPDATE-${new Date().toISOString()}`,
  };

  // eslint-disable-next-line consistent-return
  const modifyTodo = (id, buttonType) => {
    // #NOTE:
    // ESLint: Expected to return a value at the end of arrow function.
    console.log('modifyTodo:::', id, buttonType);
    // #TODO: API

    if (buttonType === 'EDIT') {
      apis.todosPut({ token, id, todo }).then((res) => {
        console.log(res);
        // #TODO: if(res.ok)

        setModifyTime(Date.now());
      });

      return console.log(buttonType);
    }

    if (buttonType === 'DELETE') {
      apis.todosDelete({ token, id }).then((res) => {
        console.log(res);
        // #TODO: if(res.ok)

        setModifyTime(Date.now());
      });

      return console.log(buttonType);
    }

    if (buttonType === 'TOGGLE') {
      apis.todosToggle({ token, id }).then((res) => {
        console.log(res);
        // #TODO: if(res.ok)

        setModifyTime(Date.now());
      });

      return console.log(buttonType);
    }
  };

  const handleTab = (e) => {
    const buttonType = e.target.dataset.buttontype;
    console.log('buttonTypeTab::', buttonType, tabType);
    // return modifyTodo(buttonType);
    // #TODO: #WIP: send to map()
    setTabType(buttonType);
  };

  useEffect(() => {
    if (token) {
      apis.todosGet({ token }).then((res) => {
        console.log(res);

        const { result } = res;
        console.log(result.todos);

        setTodosData(result.todos);
      });
    }
  }, [token, modifyTime]);

  return (
    <>
      <header>
        <ul>
          <li>
            <input
              data-buttontype="ALL"
              value="ALL"
              type="button"
              className="m-2 rounded bg-gray-300 py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
              onClick={handleTab}
            />
          </li>

          <li>
            <input
              data-buttontype="DONE"
              value="DONE"
              type="button"
              className="m-2 rounded bg-gray-300 py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
              onClick={handleTab}
            />
          </li>

          <li>
            <input
              data-buttontype="ACTIVE"
              value="ACTIVE"
              type="button"
              className="m-2 rounded bg-gray-300 py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
              onClick={handleTab}
            />
          </li>
        </ul>
        <ul>
          {/* #NOTE: ESLint:
           * Do not use Array index in keys
           */}
          {console.log('DATA-LENGTH:::', todosData.length)}
          {todosData.map((todoItem) => {
            console.log('DATA-MAP:::');

            return (
              <TodoItems
                key={todoItem.id}
                todo={todoItem}
                modifyTodo={modifyTodo}
              />
            );
            // return <TodoItems key={todo.id} {...todo} />;
            // #NOTE: ESLint
            // Prop spreading is forbidden
          })}
        </ul>
        <hr />
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
