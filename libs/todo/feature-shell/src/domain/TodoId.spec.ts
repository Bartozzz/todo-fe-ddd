import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { TodoId } from "./TodoId";

describe("TodoId", () => {
  it("should be able to create a todo id", () => {
    const todoIdOrError = TodoId.create(new UniqueEntityID("1"));
    expect(todoIdOrError.isSuccess).toBeTruthy();
    const todoId = todoIdOrError.getValue();
    expect(todoId.id.toString()).toBe("1");
  });

  it("should be able to generate a todo id if none provided", () => {
    const todoIdOrError = TodoId.create();
    expect(todoIdOrError.isSuccess).toBeTruthy();
    const todoId = todoIdOrError.getValue();
    expect(todoId.id).toBeDefined();
  });
});
