import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  body: string;
  isCompleted: boolean;
  id: number;
}

const initialState: {
  todoList: Task[];
} = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    // add item to list
    setToDo(state, action) {
      const newToDo: Task = {
        body: action.payload.body,
        isCompleted: false,
        id: Math.floor(Math.random() * new Date().getTime()),
      };

      state.todoList.push(newToDo);
    },

    // delete to do data
    deleteToDo(state, action) {
      const filteredData = state.todoList.filter((task: Task) => {
        return task.id != action.payload.id;
      });

      state.todoList = filteredData;
    },
    // mark task as completed
    markComplete(state, action) {
      const filteredData = state.todoList.map((task: Task) => {
        if (task.id === action.payload.id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
      state.todoList = filteredData;
    },
    // edit to do
    updateTask(state, action) {
      const filteredData = state.todoList.map((task: Task) => {
        const { id, body } = action.payload;
        if (task.id === id) {
          return { ...task, body: body };
        }
        return task;
      });
      state.todoList = filteredData;
    },
  },
});

export const { setToDo, deleteToDo, markComplete, updateTask } =
  todoSlice.actions;

export default todoSlice;
