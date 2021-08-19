import React from "react";
import { useMutation } from "react-query";
import { Container } from "typedi";
import { TodoController } from "@todo-app/todo-feature-shell/controllers/TodoController";
import { FieldTextarea } from "../../../../shared/components/FieldTextarea";

interface Props {
  controller?: TodoController;
}

export function TodoForm({
  controller = Container.get(TodoController),
}: Props) {
  const { mutate, isError, isLoading } = useMutation(controller.createTodo);

  return (
    <FieldTextarea
      button="Add"
      placeholder="Add a task…"
      disabled={isLoading}
      onSubmit={(content) => mutate({ content })}
    />
  );
}
