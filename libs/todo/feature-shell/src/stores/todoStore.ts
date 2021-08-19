import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todoSlice";

export const todoStore = configureStore({
  reducer: todoReducer,
});
