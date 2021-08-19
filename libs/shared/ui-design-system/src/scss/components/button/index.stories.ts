import "./index.scss";

export default {
  title: "Components/Button",
};

export const Base = () => `
<button type="button" class="button">Text</button>
`;

export const VariantRounded = () => `
<button type="button" class="button button--rounded">Text</button>
`;

export const StateActive = () => `
<button type="button" class="button button--active">Text</button>
`;

export const StateDisabled = () => `
<button type="button" class="button button--disabled">Text</button>
`;
