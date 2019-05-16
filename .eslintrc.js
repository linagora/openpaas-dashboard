module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue-i18n/recommended", "plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-len": ["error", { code: 120 }],
    "prettier/prettier": [process.env.NODE_ENV === "production" ? "off" : "error", { printWidth: 120 }],
    "vue-i18n/no-dynamic-keys": "warn",
    "vue-i18n/no-unused-keys": ["error", { extensions: [".js", ".vue"] }]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  settings: {
    "vue-i18n": {
      localeDir: "./i18n/lang/*.json"
    }
  }
};
