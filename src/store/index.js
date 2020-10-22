import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const state = {
  title: "课程管理",
  menuList: [],
  accountInfo: {},
  levelList: [],
  about: {},
  isKeepAlive:false
};

const store = new Vuex.Store({
  modules,
  getters,
  mutations,
  actions,
  state
});

export default store;
