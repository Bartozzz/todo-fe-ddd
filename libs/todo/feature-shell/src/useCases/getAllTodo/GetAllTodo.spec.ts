import { Result } from "@todo-app/shared-util-core/Result";
import { Todo } from "@todo-app/todo-feature-shell/domain/Todo";
import { TodoMap } from "@todo-app/todo-feature-shell/mappers/TodoMap";
import { MemoryTodoRepo } from "@todo-app/todo-feature-shell/repos/implementations/MemoryTodoRepo";
import { GetAllTodo } from "./GetAllTodo";

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

describe("GetAllTodo", () => {
  let repo: MemoryTodoRepo;

  beforeEach(() => {
    repo = new MemoryTodoRepo(todoList);
  });

  it("should fetch all todo and return it", async () => {
    const getAllTodoUseCase = new GetAllTodo(repo);

    // Should succeed:
    const result = await getAllTodoUseCase.execute();
    expect(result.isRight()).toBeTruthy();
    expect(result.value.isSuccess).toBeTruthy();

    // Should return the retrieved todo:
    const todo = (result.value as Result<Todo[]>).getValue();
    expect(repo.memory).toStrictEqual(todo.map(TodoMap.toPersistance));
  });
});
