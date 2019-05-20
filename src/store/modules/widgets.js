const state = {
  disabled: []
};

const getters = {
  isDisabled: state => widget => state.disabled.includes(widget.type)
};

export default {
  namespaced: true,
  state,
  getters
};
