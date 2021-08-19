import React from "react";
import clsx from "clsx";
import { FieldCheckbox } from "../FieldCheckbox";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  completed?: boolean;
}

export function TodoItem({ children, completed, className, ...props }: IProps) {
  return (
    <article
      className={clsx(className, {
        "todo-item": true,
      })}
    >
      <FieldCheckbox hideLabel>
        {completed ? "Mark as undone" : "Mark as done"}
      </FieldCheckbox>

      <p
        className={clsx({
          "todo-item__content": true,
          "todo-item__content--completed": completed,
        })}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </article>
  );
}
