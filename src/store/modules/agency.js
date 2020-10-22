import {
  queryAgency,
  editMyAgency,
  queryAgencyComment,
  searchSonComment,
  queryImageList,
  addOrEditImage,
  queryMaterialDetail,
  delImage,
  searchStarCnt,
  updateComment,
  replyComment
} from "@/api/agency";
const state = {
  agencyMessage: "", //机构信息
  commentList: [], //评论列表
  materialList: [], //素材列表
  starCnt: ""
};

const mutations = {
  SAVE_AGENCY_MESSAGE(state, data) {
    state.agencyMessage = data;
  },
  SAVE_COMMENT_LIST: (state, list) => {
    state.commentList = list;
  },
  SAVE_MATERIAL_LIST: (state, list) => {
    state.materialList = list;
  },
  SAVE_STAR_CNT: (state, data) => {
    state.starCnt = data;
  }
};

const actions = {
  //查询我的机构信息
  queryAgency({ commit }, data) {
    return new Promise(resolve => {
      queryAgency(data).then(res => {
        commit("SAVE_AGENCY_MESSAGE", res.data);
        resolve(res);
      });
    });
  },
  //修改我的机构信息
  editMyAgency({ commit }, data) {
    return new Promise(resolve => {
      editMyAgency(data).then(res => {
        resolve(res);
      });
    });
  },
  //查询机构评论
  queryAgencyComment({ commit }, data) {
    return new Promise(resolve => {
      queryAgencyComment(data).then(res => {
        commit("SAVE_COMMENT_LIST", res.data.records);
        resolve(res);
      });
    });
  },
  //查询子评论
  searchSonComment({ commit }, data) {
    return new Promise(resolve => {
      searchSonComment(data).then(res => {
        resolve(res);
      });
    });
  },

  //查询机构所有素材
  queryImageList({ commit }, data) {
    return new Promise(resolve => {
      queryImageList(data).then(res => {
        commit("SAVE_MATERIAL_LIST", res.data);
        resolve(res);
      });
    });
  },
  //添加、编辑机构素材
  addOrEditImage({ commit }, data) {
    return new Promise(resolve => {
      addOrEditImage(data).then(res => {
        resolve(res);
      });
    });
  },
  queryMaterialDetail({ commit }, data) {
    return new Promise(resolve => {
      queryMaterialDetail(data).then(res => {
        resolve(res);
      });
    });
  },
  //删除机构素材
  delImage({ commit }, data) {
    return new Promise(resolve => {
      delImage(data).then(res => {
        resolve(res);
      });
    });
  },
  searchStarCnt({ commit }, data) {
    return new Promise(resolve => {
      searchStarCnt(data).then(res => {
        commit("SAVE_STAR_CNT", res.data);
        resolve(res);
      });
    });
  },
  //回复评价修改
  updateComment({ commit }, data) {
    return new Promise(resolve => {
      updateComment(data).then(res => {
        resolve(res);
      });
    });
  },
  //机构回复评价
  replyComment({ commit }, data) {
    return new Promise(resolve => {
      replyComment(data).then(res => {
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
