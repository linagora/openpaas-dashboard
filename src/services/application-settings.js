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

const ApplicationSettings = Object.freeze({
  ...{
    BASE_URL: "/",
    VUE_APP_OPENPAAS_URL: "http://localhost:8080"
  },
  ...process.env,
  ...window.openpaas
});

export default ApplicationSettings;
export { ApplicationSettings, getDisabledWidgets };
