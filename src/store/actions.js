import { queryUserMenu,searchLevel } from "@/api/user";

const actions = {
  searchLeftMenu({ commit }) {
    return new Promise(resolve => {
      queryUserMenu()
        .then(res => {
          commit("SAVE_MENU", res.data);
          resolve(res)
        })
        .catch(err => {
          console.error(err);
        });
    });
  },
  //查询机构层级
  searchLevel({ commit },data) {
    return new Promise(resolve => {
      searchLevel(data)
        .then(res => {
          commit("SAVE_AGENCY_LEVEL", res.data);
          resolve(res)
        })
        .catch(err => {
          console.error(err);
        });
    });
  },
};

export default actions;
