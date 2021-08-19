export default {
  title: "Examples/Todo app",
};

export const Base = () => `
<main class="content">
  <form>
    <div class="field-item">
      <div class="field-textarea__wrapper field-textarea__wrapper--with-button">
        <div
          class="field-textarea__input"
          aria-label="Todo message"
          placeholder="Add a task…"
          role="textbox"
          contenteditable
        ></div>

        <button type="submit" class="button field-textarea__button">Add</button>
      </div>
    </div>
  </form>

  <article class="todo-group">
    <header class="todo-group__header">
      <h2 class="todo-group__heading">Tasks – 2</h2>
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

  <article class="todo-group">
    <header class="todo-group__header">
      <h2 class="todo-group__heading">Completed – 1</h2>
    </header>

    <ul class="todo-group__list">
      <li class="todo-group__item">
        <article class="todo-item">
          <div class="field-item field-item--checkbox">
            <input class="field-checkbox__input" type="checkbox" id="checkbox-3" checked />

            <label class="field-checkbox__label visually-hidden" for="checkbox-3">
              Mark as done
            </label>
          </div>

          <p class="todo-item__content todo-item__content--completed">
            Buy bananas
          </p>
        </article>
      </li>
    </ul>
  </article>
</main>
`;
