const state = {
  themeType:localStorage.getItem('theme')||"green"
};
const mutations = {
  SELECT_THEMETYPE: (state, type) => {
    state.themeType = type;
    localStorage.setItem('theme',type)
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
