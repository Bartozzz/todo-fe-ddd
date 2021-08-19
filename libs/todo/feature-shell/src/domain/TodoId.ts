import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { Entity } from "@todo-app/shared-util-core/domain/Entity";
import { Result } from "@todo-app/shared-util-core/Result";

export class TodoId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<TodoId> {
    return Result.ok<TodoId>(new TodoId(id));
  }
}
