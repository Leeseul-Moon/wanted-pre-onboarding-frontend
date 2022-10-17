import React from "react";

const TodoForm = ({ todo, inputHandler, add }) => {
  return (
    <div>
      <input value={todo} onChange={inputHandler}></input>
      <button onClick={add}>추가</button>
    </div>
  );
};

export default TodoForm;
