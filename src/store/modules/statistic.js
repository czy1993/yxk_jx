import {
  queryCourse,
  generatePlot,
  generatePie,
  generateGraph,
  generateChart
} from "@/api/statistic";

const state = {
  courseList: [],
  funnel: {},
  pie: {},
  bar: {},
  line: {}
};

const mutations = {
  SAVE_COURSE_LIST(state, list) {
    state.courseList = list;
  },
  SAVE_FUNNEL_DATA(state, data) {
    state.funnel = data;
  },
  SAVE_PIE_DATA(state, data) {
    state.pie = data;
  },
  SAVE_GRAPH_DATA(state, data) {
    state.bar = data;
  },
  SAVE_CHART_DATA(state, data) {
    state.line = data;
  }
};

const actions = {
  //课程
  queryCourse({ commit }) {
    return new Promise(resolve => {
      queryCourse().then(res => {
        commit("SAVE_COURSE_LIST", res.data);
        resolve(res);
      });
    });
  },
  //转化率分析-漏斗图
  generatePlot({ commit }, data) {
    return new Promise(resolve => {
      generatePlot(data).then(res => {
        commit("SAVE_FUNNEL_DATA", res.data);
        resolve(res);
      });
    });
  },
  //饼图
  generatePie({ commit }, data) {
    return new Promise(resolve => {
      generatePie(data).then(res => {
        commit("SAVE_PIE_DATA", res.data);
        resolve(res);
      });
    });
  },
  //课程报名量-柱状图
  generateGraph({ commit }, data) {
    return new Promise(resolve => {
      generateGraph(data).then(res => {
        commit("SAVE_GRAPH_DATA", res.data);
        resolve(res);
      });
    });
  },
  ////经营情况-折线图
  generateChart({ commit }, data) {
    return new Promise(resolve => {
      generateChart(data).then(res => {
        commit("SAVE_CHART_DATA", res.data);
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
