import { systemAbout } from "@/api/user";

const state = {
  aboutUs: []
};
const mutations = {
  SAVE_PLATFORM_MESSAGE(state, data) {
    state.aboutUs = data;
  }
};

const actions = {
  //关于平台,平台信息
  systemAbout({ commit }, data) {
    return new Promise(resolve => {
      systemAbout(data).then(res => {
        commit("SAVE_PLATFORM_MESSAGE", res.data);
        resolve(res);
      });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
