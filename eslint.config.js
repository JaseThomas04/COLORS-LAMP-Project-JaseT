const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["public/js/md5.js"]
  },

  js.configs.recommended,

  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];