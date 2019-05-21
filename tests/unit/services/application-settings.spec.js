import { getDisabledWidgets } from "@/services/application-settings";

describe.only("The ApplicationSettings service", () => {
  describe("The getDisabledWidgets function", () => {
    test("should return empty array", () => {
      expect(getDisabledWidgets()).toEqual([]);
    });

    test("should return valid array from window.openpaas as null", () => {
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: null
      };
      expect(getDisabledWidgets()).toEqual([]);
    });

    test("should return valid array from window.openpaas as string", () => {
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: "foo,bar"
      };
      expect(getDisabledWidgets()).toEqual(["foo", "bar"]);
    });

    test("should return valid array from window.openpaas as string with spaces", () => {
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: "foo   , bar"
      };
      expect(getDisabledWidgets()).toEqual(["foo", "bar"]);
    });

    test("should return valid array from window.openpaas as array", () => {
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: ["foo", "bar"]
      };
      expect(getDisabledWidgets()).toEqual(["foo", "bar"]);
    });

    test("should return valid array and remove empty strings from window.openpaas", () => {
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: ["foo", ""]
      };
      expect(getDisabledWidgets()).toEqual(["foo"]);
    });

    test("should concat values from process.env and window.openpaas", () => {
      process.env.VUE_APP_DISABLED_WIDGETS = ["foo"];
      window.openpaas = {
        VUE_APP_DISABLED_WIDGETS: ["bar"]
      };
      expect(getDisabledWidgets()).toEqual(["foo", "bar"]);
    });
  });
});
