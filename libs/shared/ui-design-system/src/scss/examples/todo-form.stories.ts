export default {
  title: "Examples/Todo form",
};

export const Base = () => `
<div class="field-item">
  <div class="field-textarea__wrapper field-textarea__wrapper--with-button">
    <div
      class="field-textarea__input"
      aria-label="Todo message"
      placeholder="Type something here…"
      role="textbox"
      contenteditable
    ></div>

    <button type="button" class="button field-textarea__button">Text</button>
  </div>
</div>
`;
