import Vue from "vue";
import { applicationInit, getApplication } from "@/application-init";

const VueInstance = applicationInit(Vue);

window.Application = getApplication(VueInstance);
