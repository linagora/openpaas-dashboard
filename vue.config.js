const path = require("path");
const glob = require("glob");
const fs = require("fs");
const { log } = require("@vue/cli-shared-utils");
const isProduction = process.env.NODE_ENV === "production";

class GenerateI18nFilesPlugin {
  constructor() {}

  apply() {
    log("Generating i18n files");
    const appLangs = glob.sync("./src/i18n/lang/*.json");
    const widgetsLangs = glob.sync("./src/components/widgets/**/i18n/*.json");
    const messages = {};

    appLangs.forEach(load);
    widgetsLangs.forEach(load);

    Object.keys(messages).forEach(key => {
      log(`Generating ./src/langs/${key}.json file...`);

      const localeMessages = messages[key].reduce((acc, curr) => ({ ...acc, ...curr }), {});

      fs.writeFileSync(`./src/langs/${key}.json`, JSON.stringify(localeMessages, null, 2));
    });

    function load(filePath) {
      const parsedPath = path.parse(filePath);
      const locale = parsedPath.name;

      messages[locale] = messages[locale] || [];
      messages[locale].push(require(filePath));
    }
  }
}

module.exports = {
  publicPath: isProduction ? process.env.BASE_URL || "/" : "/",
  transpileDependencies: ["vue-openpaas-components"],
  configureWebpack: {
    plugins: [new GenerateI18nFilesPlugin()],
    resolve: {
      alias: {
        "%": path.resolve(__dirname, "tests"),
        "%utils": path.resolve(__dirname, "tests", "unit", "utils"),
        "@i18n": isProduction ? path.resolve(__dirname, "src", "langs") : path.resolve(__dirname, "src", "i18n", "lang")
      }
    }
  }
};
