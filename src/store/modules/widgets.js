import { getDisabledWidgets } from "@/services/application-settings";

const state = {
  disabled: getDisabledWidgets() || []
};

const getters = {
  isDisabled: state => widget => state.disabled.includes(widget.type),
  getWidgetInstances: (state, getters, rootState) => (type, dashboard) => {
    const allCreatedCards = Object.values(rootState.dashboard.cards);
    return allCreatedCards.filter(card => dashboard.widgets.includes(card.id) && card.type === type);
  }
};

export default {
  namespaced: true,
  state,
  getters
};
