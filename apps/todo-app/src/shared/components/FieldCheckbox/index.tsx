import React from "react";
import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hideLabel?: boolean;
  disabled?: boolean;
}

export function FieldCheckbox({
  children,
  id,
  hideLabel,
  disabled,
  className,
  ...props
}: React.PropsWithChildren<IProps>) {
  return (
    <div
      className={clsx(className, {
        "field-item": true,
        "field-item--checkbox": true,
      })}
    >
      <input
        id={id}
        disabled={disabled}
        type="checkbox"
        className="field-checkbox__input"
        {...props}
      />

      <label
        className={clsx({
          "field-checkbox__label": true,
          "visually-hidden": hideLabel,
        })}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}
