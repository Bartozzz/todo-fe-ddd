import React from "react";
import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  active,
  rounded,
  disabled,
  className,
  type = "button",
  ...props
}: React.PropsWithChildren<IProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(className, {
        button: true,
        "button--active": active,
        "button--rounded": rounded,
        "button--disabled": disabled,
      })}
      {...props}
    >
      {children}
    </button>
  );
}
