import { Result } from "@todo-app/shared-util-core/Result";
import { Todo } from "@todo-app/todo-feature-shell/domain/Todo";
import { TodoMap } from "@todo-app/todo-feature-shell/mappers/TodoMap";
import { MemoryTodoRepo } from "@todo-app/todo-feature-shell/repos/implementations/MemoryTodoRepo";
import { CreateTodo } from "./CreateTodo";

describe("CreateTodo", () => {
  let repo: MemoryTodoRepo;

  beforeEach(() => {
    repo = new MemoryTodoRepo();
  });

  it("should save a todo and return it", async () => {
    const createTodoUseCase = new CreateTodo(repo);

    // Should succeed:
    const result = await createTodoUseCase.execute({ content: "content" });
    expect(result.isRight()).toBeTruthy();
    expect(result.value.isSuccess).toBeTruthy();

    // Should return the saved todo:
    const todo = (result.value as Result<Todo>).getValue();
    expect(repo.memory).toStrictEqual([TodoMap.toPersistance(todo)]);
  });

  it("should fail gracefully if todo could not be created", async () => {
    const createTodoUseCase = new CreateTodo(repo);

    // Should fail:
    const result = await createTodoUseCase.execute({ content: "" });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value.isFailure).toBeTruthy();
  });
});
