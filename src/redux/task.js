import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("userTasks", JSON.stringify(state.tasks));
    },
    saveTask: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((i) => i.id !== action.payload.id);
      localStorage.setItem("userTasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      state.tasks.forEach((i) => {
        if (i.id === action.payload.id) {
          i.task = action.payload.task;
        }
      });
      localStorage.setItem("userTasks", JSON.stringify(state.tasks));
    },
    completeTask: (state, action) => {
      state.tasks.forEach((i) => {
        if (i.id === action.payload.id) {
          i.completed = !i.completed;
        }
      });
      localStorage.setItem("userTasks", JSON.stringify(state.tasks));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, deleteTask, updateTask, completeTask, saveTask } =
  taskSlice.actions;

export default taskSlice.reducer;
