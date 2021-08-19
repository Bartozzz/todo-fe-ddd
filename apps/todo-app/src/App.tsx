import "reflect-metadata";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "typedi";
import { LocalTodoRepo } from "@todo-app/todo-feature-shell/repos/implementations/LocalTodoRepo";
import { SessionTodoRepo } from "@todo-app/todo-feature-shell/repos/implementations/SessionTodoRepo";

import { TodoScreen } from "./pages/TodoScreen";

// Use local storage for persistence
Container.set("TodoRepo", new LocalTodoRepo());
// Container.set("TodoRepo", new SessionTodoRepo());

// Create a query client
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoScreen />
    </QueryClientProvider>
  );
}

export default App;
