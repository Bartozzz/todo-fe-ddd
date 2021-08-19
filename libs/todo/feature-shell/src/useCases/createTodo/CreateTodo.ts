import { Service, Inject } from "typedi";
import { Either, left, right } from "@todo-app/shared-util-core/Either";
import { UseCase } from "@todo-app/shared-util-core/UseCase";
import { Result } from "@todo-app/shared-util-core/Result";
import * as CreateTodoErrors from "./CreateTodoErrors";
import { CreateTodoRequestDTO } from "./CreateTodoRequestDTO";
import { CreateTodoResponseDTO } from "./CreateTodoResponseDTO";
import { ITodoRepo } from "../../repos/TodoRepo";
import { Todo } from "../../domain/Todo";
import { TodoContent } from "../../domain/TodoContent";

type Response = Either<
  CreateTodoErrors.UnexpectedError | Result<unknown>,
  Result<CreateTodoResponseDTO>
>;

@Service()
export class CreateTodo
  implements UseCase<CreateTodoRequestDTO, Promise<Response>>
{
  public constructor(
    @Inject("TodoRepo")
    private todoRepo: ITodoRepo
  ) {}

  public async execute(request: CreateTodoRequestDTO): Promise<Response> {
    try {
      const todoContentOrError = TodoContent.create({
        value: request.content,
      });

      if (todoContentOrError.isFailure) {
        return left(todoContentOrError);
      }

      const todoContent = todoContentOrError.getValue();
      const todoOrError = Todo.create({
        content: todoContent,
        isCompleted: false,
      });

      if (todoOrError.isFailure) {
        return left(todoOrError);
      }

      const todo = todoOrError.getValue();
      await this.todoRepo.save(todo);

      return right(Result.ok(todo));
    } catch (error) {
      return left(new CreateTodoErrors.UnexpectedError());
    }
  }
}
