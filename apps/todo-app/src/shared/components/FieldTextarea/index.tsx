import React from "react";
import clsx from "clsx";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface IProps {
  children?: string;
  placeholder?: string;
  button?: React.ReactNode;
  className?: string;
  withButton?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export function FieldTextarea({
  children = "",
  button,
  disabled,
  className,
  onChange,
  onSubmit,
  ...props
}: IProps) {
  const text = React.useRef(children);

  const handleChange = React.useCallback(
    (event: ContentEditableEvent) => {
      text.current = event.target.value;

      if (onChange) {
        onChange(text.current);
      }
    },
    [onChange]
  );

  const handleSubmit = React.useCallback(() => {
    if (onSubmit) {
      onSubmit(text.current);
    }
  }, [onSubmit]);

  return (
    <div
      className={clsx(className, {
        "field-item": true,
      })}
    >
      <div
        className={clsx({
          "field-textarea__wrapper": true,
          "field-textarea__wrapper--with-button": button,
        })}
      >
        <ContentEditable
          className={clsx(className, {
            "field-textarea__input": true,
            "field-textarea__input--disabled": disabled,
          })}
          aria-label="Todo message"
          role="textbox"
          tagName="div"
          contentEditable
          {...props}
          html={text.current}
          onChange={handleChange}
        />

        {button ? (
          <button
            type="submit"
            className="button field-textarea__button"
            onClick={handleSubmit}
          >
            {button}
          </button>
        ) : null}
      </div>
    </div>
  );
}
