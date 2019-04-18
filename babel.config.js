module.exports = {
  presets: ["@vue/app"],
  overrides: [
    {
      env: {
        test: {
          plugins: ["babel-plugin-require-context-hook"]
        }
      }
    }
  ]
};
