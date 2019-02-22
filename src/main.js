import Vue from "vue";
import modules from "@/modules/index";
import { applicationInit, getApplication } from "@/application-init";

import "@/main.styl";

const VueInstance = applicationInit(Vue);

window.Application = getApplication(VueInstance);

modules.load(VueInstance);
