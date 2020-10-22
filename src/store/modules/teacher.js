import { searchStarCnt } from "@/api/teacher";
import { searchLevel } from "@/api/user";

const state = {
  starData: [],
  agencyLevel: []
};

const mutations = {
  SAVE_STAR_CNT(state, data) {
    state.starData = data;
  },
  SAVE_AGENCY_LEVEL(state, data) {
    state.agencyLevel = data;
  }
};

const actions = {
  //课程考勤详情
  searchStarCnt({ commit }, id) {
    return new Promise(resolve => {
      searchStarCnt(id).then(res => {
        commit("SAVE_STAR_CNT", res.data);
        resolve(res);
      });
    });
  },

  //查询机构层级
  searchLevel({ commit }, id) {
    return new Promise(resolve => {
      searchLevel(id).then(res => {
        commit("SAVE_AGENCY_LEVEL", res.data);
        resolve(res);
      });
    });
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  state
};
