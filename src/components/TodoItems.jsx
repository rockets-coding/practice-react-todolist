import React from 'react';

// #REVIEW: ESLint
// #FIXME: prop-types
// eslint-disable-next-line react/prop-types
function TodoItems({ todo, modifyTodo }) {
  /**
   * #NOTE:
   * Use PascalCase for React components, or lowercase for HTML elements.
   */
  // 'completed_at' is not in camel case.
  // eslint-disable-next-line react/prop-types, camelcase
  const { id, content, completed_at: completed } = todo;

  const handleTodoItem = (e) => {
    const buttonType = e.target.dataset.buttontype;
    console.log('buttonType::', buttonType);
    return modifyTodo(id, buttonType);
  };

  return (
    <li>
      <p>{id}</p>
      <p>{content}</p>
      <p>{completed}</p>

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
