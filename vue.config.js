const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const { log } = require("@vue/cli-shared-utils");
const isProduction = process.env.NODE_ENV === "production";

class GenerateI18nFilesPlugin {
  constructor() {
    this.done = false;
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("GenerateI18nFiles", (params, callback) => {
      if (isProduction && this.done) {
        // for some reason this is called a lot on production build...
        // probably not the right registered hook
        return callback();
      }

      generate(() => {
        this.done = true;
        callback();
      });
    });

    function generate(callback) {
      log("Generating i18n files");
      const appLangs = glob.sync("./src/i18n/lang/*.json");
      const widgetsLangs = glob.sync("./src/components/widgets/**/i18n/*.json");
      const tourLangs = glob.sync("./src/components/tour/i18n/*.json");
      const messages = {};

      appLangs.forEach(load);
      widgetsLangs.forEach(load);
      tourLangs.forEach(load);

      Object.keys(messages).forEach(key => {
        log(`Generating ./src/langs/${key}.json file...`);

        const localeMessages = messages[key].reduce((acc, curr) => ({ ...acc, ...curr }), {});

        fs.writeFileSync(`./src/langs/${key}.json`, JSON.stringify(localeMessages, null, 2));
      });

      callback && callback();

      function load(filePath) {
        const parsedPath = path.parse(filePath);
        const locale = parsedPath.name;
        const fileContent = fs.readFileSync(filePath);

        messages[locale] = messages[locale] || [];
        messages[locale].push(JSON.parse(fileContent));
      }
    }
  }
}

module.exports = {
  publicPath: isProduction ? process.env.BASE_URL || "/" : "/",
  transpileDependencies: ["vue-openpaas-components"],
  configureWebpack: {
    plugins: [new webpack.WatchIgnorePlugin([path.resolve(__dirname, "src", "langs")]), new GenerateI18nFilesPlugin()],
    resolve: {
      alias: {
        "%": path.resolve(__dirname, "tests"),
        "%utils": path.resolve(__dirname, "tests", "unit", "utils"),
        "@i18n": path.resolve(__dirname, "src", "langs")
      }
    }
  }
};
