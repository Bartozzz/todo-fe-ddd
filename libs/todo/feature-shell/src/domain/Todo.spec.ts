import { Todo } from "./Todo";
import { TodoContent } from "./TodoContent";

describe("Todo", () => {
  it("should be able to create a valid todo", () => {
    const todoContentOrError = TodoContent.create({ value: "content" });
    const todoContent = todoContentOrError.getValue();

    const todoOrError = Todo.create({
      content: todoContent,
      isCompleted: false,
    });

    expect(todoContentOrError.isSuccess).toBeTruthy();
    const todo = todoOrError.getValue();

    expect(todo.isCompleted).toBeFalsy();
    expect(todo.content.html).toBeDefined();
    expect(todo.content.value).toBeDefined();
  });

  it("should be able to mark a todo as complete", () => {
    const todoContentOrError = TodoContent.create({ value: "content" });
    const todoContent = todoContentOrError.getValue();

    const todo = Todo.create({
      content: todoContent,
      isCompleted: false,
    }).getValue();

    expect(todo.isCompleted).toBeFalsy();
    todo.markAsCompleted();
    expect(todo.isCompleted).toBeTruthy();
  });

  it("should be able to mark a todo as uncompleted", () => {
    const todoContentOrError = TodoContent.create({ value: "content" });
    const todoContent = todoContentOrError.getValue();

    const todo = Todo.create({
      content: todoContent,
      isCompleted: true,
    }).getValue();

    expect(todo.isCompleted).toBeTruthy();
    todo.markAsUncompleted();
    expect(todo.isCompleted).toBeFalsy();
  });
});
