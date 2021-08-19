import "./index.scss";

export default {
  title: "Components/Textarea",
};

export const Base = () => `
<div class="field-item">
  <div class="field-textarea__wrapper">
    <div
      class="field-textarea__input"
      aria-label="Todo message"
      role="textbox"
      contenteditable
    >
      Default value
    </div>
  </div>
</div>
`;

export const VariantWithPlaceholder = () => `
<div class="field-item">
  <div class="field-textarea__wrapper">
    <div
      class="field-textarea__input"
      aria-label="Todo message"
      placeholder="Type something here…"
      role="textbox"
      contenteditable
    ></div>
  </div>
</div>
`;

export const VariantWithButton = () => `
<div class="field-item">
  <div class="field-textarea__wrapper field-textarea__wrapper--with-button">
    <div
      class="field-textarea__input"
      aria-label="Todo message"
      role="textbox"
      contenteditable
    ></div>

    <button type="button" class="button field-textarea__button">Text</button>
  </div>
</div>
`;

export const StateDisabled = () => `
<div class="field-item">
  <div class="field-textarea__wrapper">
    <div
      class="field-textarea__input field-textarea__input--disabled"
      aria-label="Todo message"
      role="textbox"
      contenteditable
    ></div>
  </div>
</div>
`;
