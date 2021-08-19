import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { Entity } from "@todo-app/shared-util-core/domain/Entity";
import { Result } from "@todo-app/shared-util-core/Result";
import { TodoId } from "./TodoId";
import { TodoContent } from "./TodoContent";

interface TodoProps {
  content: TodoContent;
  isCompleted: boolean;
}

export class Todo extends Entity<TodoProps> {
  get todoId(): TodoId {
    return TodoId.create(this._id).getValue();
  }

  get content(): TodoContent {
    return this.props.content;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  public markAsCompleted(): void {
    this.props.isCompleted = true;
  }

  public markAsUncompleted(): void {
    this.props.isCompleted = false;
  }

  private constructor(props: TodoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TodoProps, id?: UniqueEntityID): Result<Todo> {
    const todo = new Todo(props, id);

    return Result.ok<Todo>(todo);
  }
}
