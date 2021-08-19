export default {
  title: "Examples/Todo group with items",
};

export const Base = () => `
<article class="todo-group">
  <header class="todo-group__header">
    <h2 class="todo-group__heading">Todo – 2</h2>
  </header>

  <ul class="todo-group__list">
    <li class="todo-group__item">
      <article class="todo-item">
        <div class="field-item field-item--checkbox">
          <input class="field-checkbox__input" type="checkbox" id="checkbox-1" />

          <label class="field-checkbox__label visually-hidden" for="checkbox-1">
            Mark as done
          </label>
        </div>

        <p class="todo-item__content">
          Buy milk
        </p>
      </article>
    </li>

    <li class="todo-group__item">
      <article class="todo-item">
        <div class="field-item field-item--checkbox">
          <input class="field-checkbox__input" type="checkbox" id="checkbox-2" />

          <label class="field-checkbox__label visually-hidden" for="checkbox-2">
            Mark as done
          </label>
        </div>

        <p class="todo-item__content">
          Buy apples
        </p>
      </article>
    </li>
  </ul>
</article>
`;
