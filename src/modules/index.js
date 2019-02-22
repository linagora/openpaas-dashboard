import EmailModule from "./email/index";
import store from "@/store";

export default {
  load
};

function load(VueInstance) {
  store.registerModule("email", EmailModule.store);
  EmailModule.components.forEach(component => {
    VueInstance.component(component.name, component.component);
  });
}
