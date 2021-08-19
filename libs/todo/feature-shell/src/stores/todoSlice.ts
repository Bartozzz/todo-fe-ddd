import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";
import { TodoDTO } from "../dtos/TodoDTO";

export interface TodoState {
  todo: TodoDTO[];
}

export const initialState: TodoState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    load(state: Draft<TodoState>, { payload }: PayloadAction<TodoDTO[]>) {
      state.todo = payload;
    },
    create(state: Draft<TodoState>, { payload }: PayloadAction<TodoDTO>) {
      state.todo.unshift(payload);
    },
    update(state: Draft<TodoState>, { payload }: PayloadAction<TodoDTO>) {
      const index = state.todo.findIndex((todo) => todo.id === payload.id);

      if (index !== -1) {
        state.todo[index] = payload;
      }
    },
    delete(state: Draft<TodoState>, { payload }: PayloadAction<string>) {
      state.todo = state.todo.filter((todo) => todo.id !== payload);
    },
  },
});

export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
