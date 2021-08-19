import { Mapper } from "@todo-app/shared-util-core/Mapper";
import { TodoDTO } from "../dtos/TodoDTO";
import { Todo } from "../domain/Todo";
import { TodoContent } from "../domain/TodoContent";
import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";

export class TodoMap implements Mapper<Todo> {
  public static toDTO(todo: Todo): TodoDTO {
    return {
      id: todo.todoId.id.toString(),
      content: {
        raw: todo.content.value,
        html: todo.content.html,
      },
      isCompleted: todo.isCompleted,
    };
  }

  public static toPersistance(todo: Todo): any {
    return {
      id: todo.todoId.id.toString(),
      content: todo.content.value,
      is_completed: todo.isCompleted,
    };
  }

  public static toDomain(raw: any): Todo | null {
    if (raw === null || typeof raw !== "object") {
      return null;
    }

    const todoContentOrError = TodoContent.create({ value: raw.content });

    if (todoContentOrError.isFailure) {
      return null;
    }

    const todoOrError = Todo.create(
      {
        content: todoContentOrError.getValue(),
        isCompleted: raw.is_completed,
      },
      new UniqueEntityID(raw.id)
    );

    if (todoOrError.isFailure) {
      return null;
    }

    return todoOrError.getValue();
  }
}
