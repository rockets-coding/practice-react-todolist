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
  const [tabType, setTabType] = useState('ALL');

  const [inputValue, setInputValue] = useState('');

  // const todo = {
  //   content: `UPDATE-${new Date().toISOString()}`,
  // };

  // eslint-disable-next-line consistent-return
  const modifyTodo = (id, buttonType, todo) => {
    // #NOTE:
    // ESLint: Expected to return a value at the end of arrow function.
    console.log('modifyTodo:::', id, buttonType);
    // #TODO: API

    if (buttonType === 'SAVE') {
      console.log('SAVE-todo', todo);

      apis.todosPut({ token, id, todo }).then((res) => {
        console.log(res);
        // #TODO: if(res.ok)

        setModifyTime(Date.now());
      });
    }

    if (buttonType === 'EDIT') {
      const targetTodo = todosData.filter((filterItem) => {
        console.log(filterItem.content);
        return filterItem.id === id;
      });

      console.log(targetTodo[0].content);
      // const todo = {
      //   content: `UPDATE-${new Date().toISOString()}`,
      // };

      // apis.todosPut({ token, id, todo }).then((res) => {
      //   console.log(res);
      //   // #TODO: if(res.ok)

      //   setModifyTime(Date.now());
      // });

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
    console.log('--beforeTab::', tabType);
    console.log('buttonTypeTab::', buttonType);

    // return modifyTodo(buttonType);
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
        <p>{inputValue}</p>
        {/* #TODO: export it */}
        <input
          value={inputValue}
          type="text"
          name=""
          id=""
          className="bg-yellow-200"
          onChange={(e) => {
            console.log(e.target.value);
            setInputValue(e.target.value);
          }}
        />
        <input
          value="ADD"
          type="button"
          className="m-2 rounded  bg-[#333] px-2 py-1 text-white"
          onClick={() => {
            console.log(inputValue);
            console.log('ADD-check-Token::', token);

            const todo = {
              content: inputValue,
            };

            apis.todosPost({ token, todo }).then((res) => {
              console.log(res);
              setModifyTime(Date.now());
              setInputValue('');
            });
          }}
        />
        <hr />
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
            console.log('MAP-TAB:::', tabType);

            const todoItemType = todoItem.completed ? 'DONE' : 'ACTIVE';
            console.log('Item-tabType::', tabType);
            console.log('Item-todoItemType::', todoItemType);

            if (tabType !== 'ALL' && tabType !== todoItemType) {
              return null;
            }

            return (
              <TodoItems
                key={todoItem.id}
                todoItem={todoItem}
                modifyTodo={modifyTodo}
                // tabType={tabType}
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
