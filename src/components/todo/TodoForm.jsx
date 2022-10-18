import React from "react";
import styled from "styled-components";

const TodoForm = ({ todo, inputHandler, add }) => {
  return (
    <Container>
      <input value={todo} onChange={inputHandler}></input>
      <button onClick={add}>추가</button>
    </Container>
  );
};

const Container = styled.div`
  input {
    margin: 0.4rem;
  }
`;

export default TodoForm;
