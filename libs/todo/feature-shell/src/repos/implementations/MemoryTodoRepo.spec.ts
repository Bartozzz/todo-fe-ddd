import { Todo } from "../../domain/Todo";
import { TodoContent } from "../../domain/TodoContent";
import { TodoMap } from "../../mappers/TodoMap";
import { MemoryTodoRepo } from "./MemoryTodoRepo";

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

describe("MemoryTodoRepo", () => {
  let todoRepo: MemoryTodoRepo;

  beforeEach(() => {
    todoRepo = new MemoryTodoRepo(todoList);
  });

  describe("getAllTodo", () => {
    it("should get all todo and convert to domain objects", async () => {
      const response = await todoRepo.getAllTodo();
      const persistance = response.map((todo) => TodoMap.toPersistance(todo));

      // Expect every todo to be converted to domain object:
      expect(response.every((todo) => todo instanceof Todo)).toBeTruthy();

      // Expect every domain object to represent the mocked persistance:
      expect(persistance).toStrictEqual(todoList);
    });
  });

  describe("getTodoByTodoId", () => {
    it("should get todo by todo id and convert to domain object", async () => {
      const todo1 = await todoRepo.getTodoByTodoId("1");
      const todo1Persistance = TodoMap.toPersistance(todo1);
      const todo2 = await todoRepo.getTodoByTodoId("2");
      const todo2Persistance = TodoMap.toPersistance(todo2);

      // Expect every todo to be converted to domain object:
      expect(todo1 instanceof Todo).toBeTruthy();
      expect(todo2 instanceof Todo).toBeTruthy();

      // Expect every domain object to represent the mocked persistance:
      expect(todo1Persistance).toStrictEqual(todoList[0]);
      expect(todo2Persistance).toStrictEqual(todoList[1]);
    });

    it("should throw an error when the todo cannot be found", async () => {
      await expect(
        async () => await todoRepo.getTodoByTodoId("3")
      ).rejects.toThrow();
    });
  });

  describe("save", () => {
    it("should convert todo to persistance and prepend it to the list", async () => {
      const todoContent = TodoContent.create({ value: "baz" }).getValue();
      const todo = Todo.create({
        content: todoContent,
        isCompleted: false,
      }).getValue();

      await todoRepo.save(todo);

      // Expect every domain object to represent the mocked persistance:
      expect(todoRepo.memory).toStrictEqual([
        TodoMap.toPersistance(todo),
        ...todoList,
      ]);
    });
  });
});
