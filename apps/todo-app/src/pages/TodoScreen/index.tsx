import React from "react";
import { Content } from "../../shared/components/Content";
import { TodoForm } from "../../modules/todo/components/TodoForm";
import { TodoItems } from "../../modules/todo/components/TodoItems";

export function TodoScreen() {
  return (
    <Content>
      <TodoForm />
      <TodoItems />
    </Content>
  );
}
