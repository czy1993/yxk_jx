import { stat } from "fs";

const mutations = {
  //保存标题
  SAVE_TITLE: (state, title) => {
    state.title = title;
  },
  SAVE_accountInfo(state, data) {
    state.accountInfo = data;
  },
  SAVE_about(state, data) {
    state.about = data;
  },
  SAVE_MENU(state, menuList) {
    state.menuList = menuList;
  },
  SAVE_AGENCY_LEVEL(state, levelList) {
    state.levelList = levelList;
  },
  SET_KEEP_ALIVE(state, boolean) {
    state.isKeepAlive = boolean;
  }
};

export default mutations;
