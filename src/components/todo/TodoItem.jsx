import React, { useState } from "react";
import useInput from "../../hooks/useInput";

const TodoItem = ({ todoItem, complete, remove, update }) => {
  const { id, todo, isCompleted, userId } = todoItem;

  const [isDone, setIsDone] = useState(isCompleted);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updatedTodo, inputHandler] = useInput(todo);

  const done = (e) => {
    setIsDone(e.target.checked);
    update(id, updatedTodo, !isDone);
  };

  const updateMode = () => {
    setIsUpdateMode(!isUpdateMode);
  };

  const updateHandler = () => {
    update(id, updatedTodo, isDone);
    updateMode();
  };

  const deleteHandler = () => {
    remove(id);
  };

  return (
    <div>
      <input type="checkbox" checked={isDone} onChange={done} />
      {!isUpdateMode ? (
        <div>
          <span>{todo}</span>
          <button onClick={updateMode}>수정</button>
          <button onClick={deleteHandler}>삭제</button>
        </div>
      ) : (
        <div>
          <input type="text" value={updatedTodo} onChange={inputHandler} />
          <button onClick={updateHandler}>제출</button>
          <button onClick={updateMode}>취소</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
