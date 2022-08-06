const { resolve } = require('path');
const root = resolve(__dirname, "..");
/* import {rootConfig} from `${root}/jest.config.js`; */

const rootConfig = require(`${root}/jest.config.js`);


module.exports = {
  ...rootConfig,
  ...{
    verbose: true,
    rootDir: root,
    displayName: "end2end-tests",
    setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
    testMatch: ["<rootDir>/test/**/*.test.ts"],
  },
};
