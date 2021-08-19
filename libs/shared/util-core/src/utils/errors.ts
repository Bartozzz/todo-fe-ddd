import { ValidationError } from "yup";

export function formatError(error: ValidationError) {
  return error.inner.map((innerError) => ({
    field: innerError.path,
    errors: innerError.errors,
  }));
}
