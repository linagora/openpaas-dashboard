import Vue from "vue";
import { applicationInit, getApplication } from "@/application-init";

(async () => {
  const VueInstance = await applicationInit(Vue);

  window.Application = getApplication(VueInstance);
})();
