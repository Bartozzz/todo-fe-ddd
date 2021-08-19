import { UniqueEntityID } from "@todo-app/shared-util-core/domain/UniqueEntityID";
import { Todo } from "../domain/Todo";
import { TodoContent } from "../domain/TodoContent";
import { TodoMap } from "./TodoMap";

function todoEntityFactory(id: string, value: string, isCompleted: boolean) {
  const todoId = new UniqueEntityID(id);
  const todoContent = TodoContent.create({ value });

  return Todo.create(
    {
      content: todoContent.getValue(),
      isCompleted,
    },
    todoId
  );
}

describe("TodoMap", () => {
  describe("toDTO", () => {
    it("should properly convert a Todo entity to DTO", () => {
      const todoOrError = todoEntityFactory("todo-id", "# todo-content", false);
      const todo = todoOrError.getValue();

      expect(TodoMap.toDTO(todo)).toStrictEqual({
        id: "todo-id",
        content: {
          raw: "# todo-content",
          html: "<h1>todo-content</h1>\n",
        },
        isCompleted: false,
      });
    });
  });

  describe("toPersistance", () => {
    it("should properly convert a Todo entity to persistance", () => {
      const todoOrError = todoEntityFactory("todo-id", "# todo-content", false);
      const todo = todoOrError.getValue();

      expect(TodoMap.toPersistance(todo)).toStrictEqual({
        id: "todo-id",
        content: "# todo-content",
        is_completed: false,
      });
    });
  });

  describe("toDomain", () => {
    it("should properly convert an object to Todo entity", () => {
      const todoOrError = todoEntityFactory("todo-id", "# todo-content", false);
      const todo = todoOrError.getValue();

      const recreatedTodo = TodoMap.toDomain({
        id: "todo-id",
        content: "# todo-content",
        is_completed: false,
      });

      expect(todo.equals(recreatedTodo!)).toBeTruthy();
    });

    it("should return null if cannot convert an object to Todo entity", () => {
      expect(
        TodoMap.toDomain({
          id: "todo-id",
          content: "",
          is_completed: false,
        })
      ).toBeNull();
    });

    it("should return null if invalid raw data provided", () => {
      expect(TodoMap.toDomain(undefined)).toBeNull();
      expect(TodoMap.toDomain(null)).toBeNull();
      expect(TodoMap.toDomain([])).toBeNull();
    });
  });
});
