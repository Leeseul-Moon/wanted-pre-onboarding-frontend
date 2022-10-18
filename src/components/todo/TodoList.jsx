import React, { useEffect, useState } from "react";
import { todoCreate, todoDelete, todoGet, todoUpdate } from "../../apis/request";
import useInput from "../../hooks/useInput";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  const [todo, inputHandler, setTodo] = useInput("");

  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      getTodos();
    }
  }, [ACCESS_TOKEN]);

  const getTodos = async () => {
    try {
      const { data } = await todoGet();
      setTodoList(data);
    } catch (error) {
      throw new Error(`todo list 를 불러오는데 실패했습니다. 토큰 유무를 확인하세요.`);
    }
  };

  const add = async () => {
    const { data: newTodo } = await todoCreate({ todo });
    setTodo("");
    setTodoList([...todoList, newTodo]);
  };

  const update = async (id, todo, isCompleted) => {
    const sendData = { id, todo, isCompleted };
    try {
      const res = await todoUpdate(sendData);
      if (res.status === 200) {
        setTodoList(todoList.map((todoItem) => (todoItem.id === id ? { ...todoItem, todo, isCompleted } : todoItem)));
      }
    } catch (error) {
      throw new Error(`update 가 실패했습니다. 데이터 형식 및 값을 확인해주세요`);
    }
  };

  const remove = async (id) => {
    try {
      const res = await todoDelete(id);
      if (res.status === 204) {
        setTodoList(todoList.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      throw new Error(`delete 가 실패했습니다. 데이터 형식 및 값을 확인해주세요`);
    }
  };

  return (
    <Container>
      <div>✅ 오늘의 할 일을 적어 주세요!</div>
      <TodoForm todo={todo} inputHandler={inputHandler} add={add} />
      <div>
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} todoItem={todo} remove={remove} update={update} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default TodoList;
