import "./index.scss";

export default {
  title: "Components/Checkbox",
};

export const Base = () => `
<div class="field-item field-item--checkbox">
  <input class="field-checkbox__input" type="checkbox" id="checkbox" />

  <label class="field-checkbox__label" for="checkbox">
    Get notified about all marketing messages
  </label>
</div>
`;

export const VariantWithoutLabel = () => `
<div class="field-item field-item--checkbox">
  <input class="field-checkbox__input" type="checkbox" id="checkbox" />

  <label class="field-checkbox__label visually-hidden" for="checkbox">
    Get notified about all marketing messages
  </label>
</div>
`;

export const VariantDisabled = () => `
<div class="field-item field-item--checkbox">
  <input class="field-checkbox__input" type="checkbox" id="checkbox" disabled />

  <label class="field-checkbox__label" for="checkbox">
    Get notified about all marketing messages
  </label>
</div>
`;
