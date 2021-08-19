import { Service, Inject } from "typedi";
import { UseCase } from "@todo-app/shared-util-core/UseCase";
import { Either, left, right } from "@todo-app/shared-util-core/Either";
import { Result } from "@todo-app/shared-util-core/Result";
import * as GetTodoByTodoIdErrors from "./GetTodoByTodoIdErrors";
import { GetTodoByTodoIdRequestDTO } from "./GetTodoByTodoIdRequestDTO";
import { GetTodoByTodoIdResponseDTO } from "./GetTodoByTodoIdResponseDTO";
import { ITodoRepo } from "../../repos/TodoRepo";

type Response = Either<
  | GetTodoByTodoIdErrors.UnexpectedError
  | GetTodoByTodoIdErrors.TodoNotFoundError
  | Result<unknown>,
  Result<GetTodoByTodoIdResponseDTO>
>;

@Service()
export class GetTodoByTodoId
  implements UseCase<GetTodoByTodoIdRequestDTO, Promise<Response>>
{
  public constructor(
    @Inject("TodoRepo")
    private todoRepo: ITodoRepo
  ) {}

  public async execute(request: GetTodoByTodoIdRequestDTO): Promise<Response> {
    try {
      const todo = await this.todoRepo.getTodoByTodoId(request.id);

      return right(Result.ok(todo));
    } catch (error) {
      return left(new GetTodoByTodoIdErrors.TodoNotFoundError(request.id));
    }
  }
}
