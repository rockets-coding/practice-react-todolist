import React, { useState } from 'react';

// #REVIEW: ESLint
// #FIXME: prop-types
// eslint-disable-next-line react/prop-types
function TodoItems({ todoItem, modifyTodo }) {
  // function TodoItems({ todoItem, modifyTodo, tabType }) {
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  /**
   * #NOTE:
   * Use PascalCase for React components, or lowercase for HTML elements.
   */
  // 'completed_at' is not in camel case.
  // eslint-disable-next-line react/prop-types, camelcase
  const { id, content, completed_at: completed } = todoItem;

  // const todoItemType = completed ? 'DONE' : 'ACTIVE';
  // console.log('Item-tabType::', tabType);
  // console.log('Item-todoItemType::', todoItemType);

  // if (tabType !== 'ALL' && tabType !== todoItemType) {
  //   return null;
  // }

  const handleTodoItem = (e) => {
    const buttonType = e.target.dataset.buttontype;
    console.log('buttonType::', buttonType);

    if (buttonType === 'EDIT') {
      console.log('CLICK');
      setIsEdit(true);
    }

    if (buttonType === 'SAVE') {
      console.log('CLICK-SAVE');
      setIsEdit(false);
    }

    console.log(inputValue);

    const todo = {
      content: inputValue,
    };
    console.log(todo);

    return modifyTodo(id, buttonType, todo);
  };

  return (
    <li>
      <p>{id}</p>
      <p>{content}</p>
      <p className={completed ? 'bg-slate-600' : null}>{completed}</p>

      {/* React does not recognize the `data-btnType` prop on a DOM element.
       *  If you intentionally want it to appear in the DOM
       *  as a custom attribute, spell it as lowercase `data-btntype` instead.
       *  If you accidentally passed it from a parent component, remove it from the DOM element. */}
      <input
        data-buttontype="EDIT"
        value="EDIT"
        type="button"
        className="m-2 rounded bg-[#FA3] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
        onClick={handleTodoItem}
      />

      {isEdit ? (
        <>
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
            data-buttontype="SAVE"
            value="SAVE"
            type="button"
            className="m-2 rounded bg-[#333] p-2 text-white"
            onClick={handleTodoItem}
          />
        </>
      ) : null}

      <input
        data-buttontype="DELETE"
        value="DELETE"
        type="button"
        className="m-2 rounded bg-[#F33] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
        onClick={handleTodoItem}
      />

      <input
        data-buttontype="TOGGLE"
        value="TOGGLE"
        type="button"
        className="m-2 rounded bg-[#5EC] py-2 px-3 text-center text-xs font-medium text-white transition-all hover:bg-gray-200"
        onClick={handleTodoItem}
      />
    </li>
  );
}

export default TodoItems;
