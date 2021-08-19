import React from "react";
import clsx from "clsx";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export function Content({
  children,
  className,
  ...props
}: React.PropsWithChildren<IProps>) {
  return (
    <main
      className={clsx(className, {
        content: true,
      })}
      {...props}
    >
      {children}
    </main>
  );
}
