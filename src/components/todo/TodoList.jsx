import React, { useEffect, useState } from "react";
import { todoCreate, todoDelete, todoGet, todoUpdate } from "../../apis/request";
import useInput from "../../hooks/useInput";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  const [todo, inputHandler, setTodo] = useInput("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const { data } = await todoGet();
    setTodoList(data);
  };

  const add = async () => {
    const { data: newTodo } = await todoCreate({ todo });
    setTodo("");
    setTodoList([newTodo, ...todoList]);
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
    <div>
      <TodoForm todo={todo} inputHandler={inputHandler} add={add} />
      <div>
        {todoList?.map((todo) => (
          <TodoItem key={todo.id} todoItem={todo} remove={remove} update={update} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
