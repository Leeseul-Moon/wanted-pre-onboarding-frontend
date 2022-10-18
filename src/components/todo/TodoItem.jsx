import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

const TodoItem = ({ todoItem, remove, update }) => {
  const { id, todo, isCompleted } = todoItem;

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
    <Container>
      <input type="checkbox" checked={isDone} onChange={done} />
      {!isUpdateMode ? (
        <>
          <span>{todo}</span>
          <div>
            <button onClick={updateMode}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </div>
        </>
      ) : (
        <>
          <input type="text" value={updatedTodo} onChange={inputHandler} />
          <div>
            <button onClick={updateHandler}>제출</button>
            <button onClick={updateMode}>취소</button>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  max-width: 500px;
  margin: 0.3rem;

  span {
    overflow: auto;
  }

  button {
    margin: 0 0.1rem;
  }
`;

export default TodoItem;
