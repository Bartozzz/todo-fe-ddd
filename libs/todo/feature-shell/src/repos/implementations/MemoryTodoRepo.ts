import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { Todo } from "../..//domain/Todo";
import { TodoId } from "../../domain/TodoId";
import { TodoMap } from "../../mappers/TodoMap";
import { ITodoRepo } from "../TodoRepo";

export class MemoryTodoRepo implements ITodoRepo {
  public constructor(public memory: any[] = []) {}

  public async getAllTodo(): Promise<Todo[]> {
    return this.memory
      .map((todo: any) => TodoMap.toDomain(todo))
      .filter((todo: Todo | null): todo is Todo => todo !== null);
  }

  public async getTodoByTodoId(todoId: string): Promise<Todo> {
    const todoList = await this.getAllTodo();
    const todoIdEntity = TodoId.create(new UniqueEntityID(todoId)).getValue();
    const todo = todoList.find((t) => t.todoId.equals(todoIdEntity)) ?? null;

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  public async save(todo: Todo): Promise<void> {
    const todoList = await this.getAllTodo();
    const newTodoList = [todo, ...todoList];
    const rawTodoList = newTodoList.map((todo) => TodoMap.toPersistance(todo));

    this.memory = rawTodoList;
  }
}
