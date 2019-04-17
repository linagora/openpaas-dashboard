import Vue from "vue";
import { applicationInit, getApplication } from "@/application-init";

import "@/main.styl";

const VueInstance = applicationInit(Vue);

window.Application = getApplication(VueInstance);
