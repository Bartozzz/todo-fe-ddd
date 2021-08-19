import { Result } from "@todo-app/shared-util-core/Result";
import { Todo } from "@todo-app/todo-feature-shell/domain/Todo";
import { TodoMap } from "@todo-app/todo-feature-shell/mappers/TodoMap";
import { MemoryTodoRepo } from "@todo-app/todo-feature-shell/repos/implementations/MemoryTodoRepo";
import { GetTodoByTodoId } from "./GetTodoByTodoId";

const todoList = [
  {
    id: "1",
    content: "foo",
    is_completed: false,
  },
  {
    id: "2",
    content: "bar",
    is_completed: true,
  },
];

describe("GetTodoByTodoId", () => {
  let repo: MemoryTodoRepo;

  beforeEach(() => {
    repo = new MemoryTodoRepo(todoList);
  });

  it("should fetch todo and return it", async () => {
    const getTodoByTodoIdUseCase = new GetTodoByTodoId(repo);

    // Should succeed:
    const result = await getTodoByTodoIdUseCase.execute({ id: "2" });
    expect(result.isRight()).toBeTruthy();
    expect(result.value.isSuccess).toBeTruthy();

    // Should return the retrieved todo:
    const todo = (result.value as Result<Todo>).getValue();
    expect(TodoMap.toPersistance(todo)).toStrictEqual(todoList[1]);
  });

  it("should fail if the todo does not exist", async () => {
    const getTodoByTodoIdUseCase = new GetTodoByTodoId(repo);

    // Should succeed:
    const result = await getTodoByTodoIdUseCase.execute({ id: "3" });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value.isFailure).toBeTruthy();
  });
});
