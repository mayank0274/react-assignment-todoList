import { Task } from "../store/features/todoList/todoSlice";

const todoKey = "iTasks-todo";

export const getLocalStorageTodoData = () => {
  const rawTodos = localStorage.getItem(todoKey);
  if (!rawTodos) return [];
  return { todoList: JSON.parse(rawTodos) };
};

export const setLocalStorageTodoData = (task: Task[]) => {
  return localStorage.setItem(todoKey, JSON.stringify(task));
};
