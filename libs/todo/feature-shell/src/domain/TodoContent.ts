import * as yup from "yup";
import * as marked from "marked";
import * as sanitize from "sanitize-html";
import { formatError } from "@todo-app/shared-util-core/utils/errors";
import { Entity } from "@todo-app/shared-util-core/domain/Entity";
import { Result } from "@todo-app/shared-util-core/Result";

interface TodoContentProps {
  value: string;
}

const schema = yup.object().shape({
  value: yup.string().required(),
});

export class TodoContent extends Entity<TodoContentProps> {
  get value(): string {
    return this.props.value;
  }

  get html(): string {
    return sanitize(marked(this.props.value));
  }

  private constructor(props: TodoContentProps) {
    super(props);
  }

  public static create(props: TodoContentProps): Result<TodoContent> {
    try {
      schema.validateSync(props, {
        abortEarly: false,
      });
    } catch (error) {
      return Result.fail<TodoContent>(formatError(error));
    }

    const todoContent = new TodoContent(props);

    return Result.ok<TodoContent>(todoContent);
  }
}
