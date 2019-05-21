import { getDisabledWidgets } from "@/services/application-settings";

const state = {
  disabled: getDisabledWidgets() || []
};

const getters = {
  isDisabled: state => widget => state.disabled.includes(widget.type)
};

export default {
  namespaced: true,
  state,
  getters
};
