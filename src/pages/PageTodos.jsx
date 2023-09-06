import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import apis from '../helpers/apis';

import TodoItems from '../components/TodoItems';

function PageTodos() {
  const navigate = useNavigate();

  const { token, setToken } = useAuth();
  const [todosData, setTodosData] = useState([]);
  const [activeDataLength, setActiveDataLength] = useState(0);

  const [modifyTime, setModifyTime] = useState('');
  const [tabType, setTabType] = useState('ALL');

  const [inputValue, setInputValue] = useState('');

  const getTodos = (inputToken) => {
    apis.todosGet({ token: inputToken }).then((res) => {
      const { result } = res;

      setTodosData([...result.todos]);
      const filterActiveData = [...result.todos].filter(
        (item) => !item.completed_at,
      );
      setActiveDataLength(filterActiveData.length);
    });
  };

  // eslint-disable-next-line consistent-return
  const modifyTodo = (id, buttonType, todo) => {
    setModifyTime(Date.now());

    // #NOTE:
    // ESLint: Expected to return a value at the end of arrow function.

    if (buttonType === 'SAVE') {
      apis.todosPut({ token, id, todo }).then((res) => {
        // #TODO: if(res.ok)
        if (!res.response.ok) {
          console.log('ERROR');
        }
        getTodos(token);
      });
    }

    if (buttonType === 'EDIT') {
      const targetTodo = todosData.filter((filterItem) => {
        console.log(filterItem.content);
        return filterItem.id === id;
      });

      console.log(targetTodo[0].content);

      console.log(buttonType);
    }

    if (buttonType === 'DELETE') {
      apis.todosDelete({ token, id }).then((res) => {
        if (!res.response.ok) {
          console.log('ERROR');
        }
        getTodos(token);
      });

      console.log(buttonType);
    }

    if (buttonType === 'TOGGLE') {
      apis.todosToggle({ token, id }).then((res) => {
        if (!res.response.ok) {
          console.log('ERROR');
        }
        getTodos(token);
      });

      console.log(buttonType);
    }
  };

  const handleTab = (e) => {
    const buttonType = e.target.dataset.buttontype;

    setTabType(buttonType);
  };

  const handleClear = () => {
    const doneList = todosData.filter((item) => item.completed_at);
    const doneIdList = doneList.map((item) => item.id);

    const deletePromises = doneIdList.map((id) => apis.todosDelete({ token, id }));

    Promise.all(deletePromises)
      .then((results) => {
        // 檢查每個結果，確認是否成功刪除
        results.forEach((result) => {
          if (!result.response.ok) {
            console.log('ERROR');
          }
        });

        // 全部刪除完成後，重新取得資料
        getTodos(token);
      })
      .catch((error) => {
        console.error('Error:::', error);
      });
  };

  useEffect(() => {
    if (token) {
      getTodos(token);
    }
  }, [token, modifyTime]);

  return (
    <>
      <header className="flex items-center justify-between py-2">
        <Link to="/" className="block w-[80%]">
          <h1 className="bg-start overflow-hidden whitespace-nowrap bg-logo bg-[length:313px_46.9px] bg-no-repeat indent-[101%] leading-[3rem]">
            HOME
          </h1>
        </Link>

        <button
          type="button"
          className="px-1"
          onClick={() => {
            setToken(null);
            // localStorage.removeItem('token');
            localStorage.clear();

            navigate('/');
          }}
        >
          登出
        </button>
      </header>

      <main className="mx-auto min-h-[calc(100vh_-_170px)] md:w-[500px]">
        <div className="rounded bg-white">
          <div className="flex w-full items-center p-1">
            {/* <label htmlFor="content"> */}
            <input
              value={inputValue}
              placeholder="新增待辦事項"
              type="text"
              name="content"
              id="content"
              className="w-11/12 rounded"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />

            <input
              value="+"
              type="button"
              className="w-2/12 cursor-pointer rounded bg-[#333333] text-center text-white"
              onClick={() => {
                const todo = {
                  content: inputValue,
                };

                apis.todosPost({ token, todo }).then((res) => {
                  if (!res.response.ok) {
                    return console.log('ERROR');
                  }
                  console.log(res);
                  setModifyTime(Date.now());
                  setInputValue('');
                  return getTodos(token);
                });
              }}
            />
            {/* </label> */}
          </div>
        </div>
        {/* end of DOM-input.new.todo */}
        <hr className="h-2" />
        <div className="rounded bg-white text-center font-medium text-gray-400">
          <ul className="flex items-center">
            <li className="w-1/3">
              <div
                className={`border-b-2 ${
                  tabType === 'ALL' ? 'border-black' : ''
                }`}
              >
                <input
                  data-buttontype="ALL"
                  value="全部"
                  type="button"
                  className="cursor-pointer py-2 transition-all hover:font-bold hover:text-black"
                  onClick={handleTab}
                />
              </div>
            </li>

            <li className="w-1/3">
              <div
                className={`border-b-2 ${
                  tabType === 'DONE' ? 'border-black' : ''
                }`}
              >
                <input
                  data-buttontype="DONE"
                  value="已完成"
                  type="button"
                  className="cursor-pointer py-2 transition-all hover:font-bold hover:text-black"
                  onClick={handleTab}
                />
              </div>
            </li>

            <li className="w-1/3">
              <div
                className={`border-b-2 ${
                  tabType === 'ACTIVE' ? 'border-black' : ''
                }`}
              >
                <input
                  data-buttontype="ACTIVE"
                  value="待完成"
                  type="button"
                  className="cursor-pointer py-2 transition-all hover:font-bold hover:text-black"
                  onClick={handleTab}
                />
              </div>
            </li>
          </ul>
          {/* end of DOM-tabs */}
          <ul className="flex min-h-screen flex-col">
            {/* #NOTE: ESLint:
             * Do not use Array index in keys
             */}

            {todosData
              && todosData.map(
                (todoItem) => (
                  <TodoItems
                    key={todoItem.id}
                    todoItem={todoItem}
                    modifyTodo={modifyTodo}
                    tabType={tabType}
                  />
                ),

                // #NOTE: ESLint
                // Prop spreading is forbidden
              )}
          </ul>
          {/* end of todosData.map() */}
          <div className="flex items-center justify-between py-4 px-2">
            <p>
              <span className="pr-1">{activeDataLength}</span>
              個待完成項目
            </p>
            <input
              value="清除已完成項目"
              className="cursor-pointer"
              type="button"
              onClick={handleClear}
            />
          </div>
        </div>
      </main>
      {/* end of DOM-PageTodos */}
    </>
  );
}

export default PageTodos;
