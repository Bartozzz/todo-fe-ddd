import "./index.scss";

export default {
  title: "Components/Todo Item",
};

export const Base = () => `
<article class="todo-item">
  <div class="field-item field-item--checkbox">
    <input class="field-checkbox__input" type="checkbox" id="checkbox-todo-uuid" />

    <label class="field-checkbox__label visually-hidden" for="checkbox-todo-uuid">
      Mark as done
    </label>
  </div>

  <p class="todo-item__content">
    Buy milk
  </p>
</article>
`;

export const VariantCompleted = () => `
<article class="todo-item">
  <div class="field-item field-item--checkbox">
    <input class="field-checkbox__input" type="checkbox" id="checkbox-todo-uuid" checked />

    <label class="field-checkbox__label visually-hidden" for="checkbox-todo-uuid">
      Mark as undone
    </label>
  </div>

  <p class="todo-item__content todo-item__content--completed">
    Buy milk
  </p>
</article>
`;
