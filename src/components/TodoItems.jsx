import React, { useState } from 'react';

// #REVIEW: ESLint
// #FIXME: prop-types
// eslint-disable-next-line react/prop-types
function TodoItems({ todoItem, modifyTodo, tabType }) {
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  if (!todoItem) {
    return null;
  }

  /**
   * #NOTE:
   * Use PascalCase for React components, or lowercase for HTML elements.
   */
  // 'completed_at' is not in camel case.
  // eslint-disable-next-line react/prop-types, camelcase
  const { id, content, completed_at: completed } = todoItem;

  const todoItemType = completed ? 'DONE' : 'ACTIVE';

  if (tabType !== 'ALL' && tabType !== todoItemType) {
    return null;
  }

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

  const isChecked = completed ? 'checked' : '';

  return (
    <li className="px-2">
      <div className="border-b-2">
        <div className="flex items-center justify-between py-1">
          <label htmlFor="toggle" className="flex items-center">
            <input
              data-buttontype="TOGGLE"
              type="checkbox"
              checked={isChecked}
              name="toggle"
              className="mx-1"
              onChange={handleTodoItem}
            />

            <div className="px-2">
              {!isEdit && (
                <input
                  data-buttontype="EDIT"
                  value={content}
                  type="button"
                  className="block cursor-pointer text-black"
                  onClick={handleTodoItem}
                />
              )}

              {isEdit ? (
                <>
                  <input
                    value={inputValue}
                    type="text"
                    name="content"
                    id="inputEdit"
                    className="bg-yellow-200 px-2"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setInputValue(e.target.value);
                    }}
                  />

                  <input
                    data-buttontype="SAVE"
                    value="SAVE"
                    type="button"
                    className="ml-2 cursor-pointer  rounded bg-[#333] py-[1px] px-1 text-white"
                    onClick={handleTodoItem}
                  />
                </>
              ) : null}
            </div>
          </label>

          <div className="px-2">
            <input
              data-buttontype="DELETE"
              value="&times;"
              type="button"
              className="cursor-pointer px-2 font-bold text-slate-500"
              onClick={handleTodoItem}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default TodoItems;
