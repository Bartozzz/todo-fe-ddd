import { Service, Inject } from "typedi";
import { UseCase } from "@todo-app/shared-util-core/UseCase";
import { Either, left, right } from "@todo-app/shared-util-core/Either";
import { Result } from "@todo-app/shared-util-core/Result";
import * as GetAllTodoErrors from "./GetAllTodoErrors";
import { GetAllTodoRequestDTO } from "./GetAllTodoRequestDTO";
import { GetAllTodoResponseDTO } from "./GetAllTodoResponseDTO";
import { ITodoRepo } from "../../repos/TodoRepo";

type Response = Either<
  GetAllTodoErrors.UnexpectedError | Result<unknown>,
  Result<GetAllTodoResponseDTO>
>;

@Service()
export class GetAllTodo
  implements UseCase<GetAllTodoRequestDTO, Promise<Response>>
{
  public constructor(
    @Inject("TodoRepo")
    private todoRepo: ITodoRepo
  ) {}

  public async execute(request?: GetAllTodoRequestDTO): Promise<Response> {
    try {
      const todoList = await this.todoRepo.getAllTodo();

      return right(Result.ok(todoList));
    } catch (error) {
      return left(new GetAllTodoErrors.UnexpectedError());
    }
  }
}
