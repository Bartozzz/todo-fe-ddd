import { Todo } from "../domain/Todo";

export interface ITodoRepo {
  getAllTodo(): Promise<Todo[]>;
  getTodoByTodoId(todoId: string): Promise<Todo>;
  save(todo: Todo): Promise<void>;
}
