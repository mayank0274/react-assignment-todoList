import { Tuple, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoList/todoSlice";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "../utlis/localStorage";

// middleware for updating data to localstorage
const todoMiddleware = ({ getState }: { getState: any }) => {
  return (next: (arg0: any) => any) => (action: any) => {
    const res = next(action);
    const state = getState();
    setLocalStorageTodoData(state.todoList);
    return res;
  };
};

// store variable is a global variable.
export const makeStore = () => {
  return configureStore({
    reducer: {
      todoList: todoSlice.reducer,
    },
    preloadedState: getLocalStorageTodoData(),
    middleware: () => new Tuple(todoMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
