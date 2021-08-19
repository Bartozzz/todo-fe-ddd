import { TodoContent } from "./TodoContent";

describe("TodoContent", () => {
  it("should be able to create a valid todo content", () => {
    const todoContentOrError = TodoContent.create({ value: "content" });
    expect(todoContentOrError.isSuccess).toBeTruthy();
    const todoContent = todoContentOrError.getValue();
    expect(todoContent.value).toBe("content");
    expect(todoContent.html).toBe("<p>content</p>\n");
  });

  it("should fail to create an invalid todo content", () => {
    const todoContentOrError = TodoContent.create({ value: "" });
    expect(todoContentOrError.isFailure).toBeTruthy();
    const todoContentError = todoContentOrError.errorValue();
    expect(todoContentError).toBeDefined();
  });
});
