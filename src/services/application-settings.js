function parseDisabledWidgets(widgets = []) {
  let array;

  if (!Array.isArray(widgets)) {
    array = (widgets || "").split(",");
  } else {
    array = widgets;
  }

  return array.map(disabled => disabled.trim()).filter(Boolean);
}

function getDisabledWidgets() {
  return [
    ...parseDisabledWidgets(process.env.VUE_APP_DISABLED_WIDGETS),
    ...parseDisabledWidgets(window.openpaas ? window.openpaas.VUE_APP_DISABLED_WIDGETS : "")
  ];
}

const settings = {
  ...{
    BASE_URL: "/",
    VUE_APP_OPENPAAS_URL: "http://localhost:8080",
    VUE_APP_AUTH: "basic",
    VUE_APP_APPLICATION_MENU: [],
    VUE_APP_TOUR: false
  },
  ...process.env,
  ...window.openpaas,
  ...window._e2esettings
};

if (!settings.VUE_APP_SEARCH_URL) {
  settings.VUE_APP_SEARCH_URL = new URL("/#/search/?q=", settings.VUE_APP_OPENPAAS_URL).toString();
}

const ApplicationSettings = Object.freeze(settings);

export default ApplicationSettings;
export { ApplicationSettings, getDisabledWidgets };
