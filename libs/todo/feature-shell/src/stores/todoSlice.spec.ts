import { todoReducer, todoActions } from "./todoSlice";

describe("todoSlice", () => {
  it("should return the initial state", () => {
    const previousState = undefined;

    expect(todoReducer(previousState, {} as any)).toStrictEqual({
      todo: [],
    });
  });

  describe("load", () => {
    it("should override current todo state with the new one", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = [
        {
          id: "1",
          content: {
            raw: "bar",
            html: "bar",
          },
          isCompleted: true,
        },
        {
          id: "1",
          content: {
            raw: "baz",
            html: "baz",
          },
          isCompleted: false,
        },
      ];

      expect(
        todoReducer(previousState, todoActions.load(payload))
      ).toStrictEqual({
        todo: [
          {
            id: "1",
            content: {
              raw: "bar",
              html: "bar",
            },
            isCompleted: true,
          },
          {
            id: "1",
            content: {
              raw: "baz",
              html: "baz",
            },
            isCompleted: false,
          },
        ],
      });
    });
  });

  describe("create", () => {
    it("should handle a todo being added to an empty list", () => {
      const previousState = {
        todo: [],
      };

      const payload = {
        id: "1",
        content: {
          raw: "bar",
          html: "bar",
        },
        isCompleted: true,
      };

      expect(
        todoReducer(previousState, todoActions.create(payload))
      ).toStrictEqual({
        todo: [
          {
            id: "1",
            content: {
              raw: "bar",
              html: "bar",
            },
            isCompleted: true,
          },
        ],
      });
    });

    it("should handle a todo being added to an existing list", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = {
        id: "1",
        content: {
          raw: "bar",
          html: "bar",
        },
        isCompleted: true,
      };

      expect(
        todoReducer(previousState, todoActions.create(payload))
      ).toStrictEqual({
        todo: [
          {
            id: "1",
            content: {
              raw: "bar",
              html: "bar",
            },
            isCompleted: true,
          },
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      });
    });
  });

  describe("update", () => {
    it("should handle updating an existing todo", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = {
        id: "0",
        content: {
          raw: "new_foo_value",
          html: "new_foo_value",
        },
        isCompleted: false,
      };

      expect(
        todoReducer(previousState, todoActions.update(payload))
      ).toStrictEqual({
        todo: [
          {
            id: "0",
            content: {
              raw: "new_foo_value",
              html: "new_foo_value",
            },
            isCompleted: false,
          },
        ],
      });
    });

    it("should handle updating an not existing todo", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = {
        id: "1",
        content: {
          raw: "new_foo_value",
          html: "new_foo_value",
        },
        isCompleted: false,
      };

      expect(
        todoReducer(previousState, todoActions.update(payload))
      ).toStrictEqual(previousState);
    });
  });

  describe("delete", () => {
    it("should handle deleting an existing todo", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = "0";

      expect(
        todoReducer(previousState, todoActions.delete(payload))
      ).toStrictEqual({
        todo: [],
      });
    });

    it("should handle deleting an not existing todo", () => {
      const previousState = {
        todo: [
          {
            id: "0",
            content: {
              raw: "foo",
              html: "foo",
            },
            isCompleted: false,
          },
        ],
      };

      const payload = "1";

      expect(
        todoReducer(previousState, todoActions.delete(payload))
      ).toStrictEqual(previousState);
    });
  });
});
