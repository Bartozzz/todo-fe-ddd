import { Service } from "typedi";
import { Unsubscribe } from "@reduxjs/toolkit";
import { Result } from "@todo-app/shared-util-core/Result";
import { UseCaseError } from "@todo-app/shared-util-core/UseCase";
import { CreateTodo } from "../useCases/createTodo/CreateTodo";
import { GetAllTodo } from "../useCases/getAllTodo/GetAllTodo";
import { GetTodoByTodoId } from "../useCases/getTodoByTodoId/GetTodoByTodoId";
import { CreateTodoRequestDTO } from "../useCases/createTodo/CreateTodoRequestDTO";
import { GetAllTodoRequestDTO } from "../useCases/getAllTodo/GetAllTodoRequestDTO";
import { GetTodoByTodoIdRequestDTO } from "../useCases/getTodoByTodoId/GetTodoByTodoIdRequestDTO";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMap } from "../mappers/TodoMap";
import { todoStore } from "../stores/todoStore";
import { todoActions, TodoState } from "../stores/todoSlice";

@Service()
export class TodoController {
  private store = todoStore;

  public constructor(
    private createTodoUseCase: CreateTodo,
    private getAllTodoUseCase: GetAllTodo,
    private getTodoByTodoIdUseCase: GetTodoByTodoId
  ) {}

  public onSnapshot = (listener: (state: TodoState) => void): Unsubscribe => {
    return this.store.subscribe(() => listener(this.store.getState()));
  };

  public createTodo = async (
    payload: CreateTodoRequestDTO
  ): Promise<TodoDTO> => {
    const result = await this.createTodoUseCase.execute(payload);

    if (result.isRight()) {
      const todo = result.value.getValue();
      const todoDTO = TodoMap.toDTO(todo);

      this.store.dispatch(todoActions.create(todoDTO));

      return todoDTO;
    } else {
      const error = result.value as Result<UseCaseError>;
      throw error.errorValue();
    }
  };

  public getAllTodo = async (
    payload?: GetAllTodoRequestDTO
  ): Promise<TodoDTO[]> => {
    const result = await this.getAllTodoUseCase.execute(payload);

    if (result.isRight()) {
      const todoList = result.value.getValue();
      const todoDTOList = todoList.map((todo) => TodoMap.toDTO(todo));

      this.store.dispatch(todoActions.load(todoDTOList));

      return todoDTOList;
    } else {
      const error = result.value as Result<UseCaseError>;
      throw error.errorValue();
    }
  };

  public getTodoById = async (
    payload: GetTodoByTodoIdRequestDTO
  ): Promise<TodoDTO> => {
    const result = await this.getTodoByTodoIdUseCase.execute(payload);

    if (result.isRight()) {
      const todo = result.value.getValue();
      const todoDTO = TodoMap.toDTO(todo);

      return todoDTO;
    } else {
      const error = result.value as Result<UseCaseError>;
      throw error.errorValue();
    }
  };
}
