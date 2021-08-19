import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
}

export function TodoGroup({
  children,
  heading,
  className,
  ...props
}: React.PropsWithChildren<IProps>) {
  return (
    <article className="todo-group" {...props}>
      <header className="todo-group__header">
        <h2 className="todo-group__heading">{heading}</h2>
      </header>

      <ul className="todo-group__list">
        {React.Children.map(children, (child) => (
          <li className="todo-group__item">{child}</li>
        ))}
      </ul>
    </article>
  );
}
