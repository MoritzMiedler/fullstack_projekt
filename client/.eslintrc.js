module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/extensions": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": process.env.NODE_ENV === "production" ? "warn" : "off",
    "object-curly-newline": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-param-reassign": process.env.NODE_ENV === "production" ? "warn" : "off",
    "spaced-comment": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
