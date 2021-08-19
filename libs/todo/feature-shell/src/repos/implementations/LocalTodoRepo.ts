import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { Todo } from "../..//domain/Todo";
import { TodoId } from "../../domain/TodoId";
import { TodoMap } from "../../mappers/TodoMap";
import { ITodoRepo } from "../TodoRepo";

export class LocalTodoRepo implements ITodoRepo {
  static STORAGE_KEY = "todo-app-todos";

  public async getAllTodo(): Promise<Todo[]> {
    const todo = localStorage.getItem(LocalTodoRepo.STORAGE_KEY);
    // We provide a safe fallback, so no null assertion is needed
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const todoArray = JSON.parse(todo!) ?? [];

    return todoArray
      .map((todo: unknown) => TodoMap.toDomain(todo))
      .filter((todo: Todo | null) => todo !== null);
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
    const rawTodoAsString = JSON.stringify(rawTodoList);

    localStorage.setItem(LocalTodoRepo.STORAGE_KEY, rawTodoAsString);
  }
}
