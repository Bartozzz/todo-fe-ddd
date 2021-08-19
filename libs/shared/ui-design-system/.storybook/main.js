const rootMain = require("../../../../.storybook/main");

rootMain.stories.push(
  ...["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"]
);

module.exports = rootMain;
