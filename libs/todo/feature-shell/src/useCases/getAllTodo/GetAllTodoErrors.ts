import { Result } from "@todo-app/shared-util-core/Result";
import { UseCaseError } from "@todo-app/shared-util-core/UseCase";

export class UnexpectedError extends Result<UseCaseError> {
  public constructor() {
    super(false, {
      message: `Something went wrong`,
    });
  }
}
