import React from "react";
import { useQuery } from "react-query";
import { Container } from "typedi";
import { TodoController } from "@todo-app/todo-feature-shell/controllers/TodoController";
import { TodoGroup } from "../../../../shared/components/TodoGroup";
import { TodoItem } from "../../../../shared/components/TodoItem";
import { TodoDTO } from "@todo-app/todo-feature-shell/dtos/TodoDTO";

interface Props {
  controller?: TodoController;
}

export function TodoItems({
  controller = Container.get(TodoController),
}: Props) {
  const query = useQuery("todo", () => controller.getAllTodo());
  const [todo, setTodo] = React.useState<TodoDTO[]>([]);

  React.useEffect(() => {
    const unsubscribe = controller.onSnapshot((snapshot) => {
      setTodo(snapshot.todo);
    });

    return unsubscribe;
  }, [controller]);

  if (query.isLoading) {
    return <>Loading…</>;
  }

  if (query.isError) {
    return <>Could not fetch todo list…</>;
  }

  if (todo.length === 0) {
    return <>Create your first todo!</>;
  }

  return (
    <TodoGroup heading={`Tasks – ${todo.length}`}>
      {todo.map((todo) => (
        <TodoItem key={todo.id} completed={todo.isCompleted}>
          {todo.content.html}
        </TodoItem>
      ))}
    </TodoGroup>
  );
}
