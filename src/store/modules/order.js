import {
  manageOrders,
  queryOrderOperation,
  orderRefund,
  transferCourse,
  queryCourseByName
} from "@/api/order";

const state = {
  isEdit_order: false,
  orderList: [],
  orderRecord: []
};

const getters = {
  orderDatas(state) {
    return state.orderList.reduce((acc, cur) => {
      acc.push({ ...cur, show: false });
      return acc;
    }, []);
  }
};

const mutations = {
  SET_EDIT_STATUS: (state, boolean) => {
    state.isEdit_order = boolean;
  },
  SAVE_ORDER_LIST: (state, list) => {
    state.orderList = list;
  },
  SAVE_ORDER_RECORD: (state, data) => {
    state.orderRecord = data;
  }
};

const actions = {
  //订单管理
  manageOrders({ commit }, data) {
    return new Promise(resolve => {
      manageOrders(
        `current=${data.current}&size=${data.size}&condition=${data.condition}`
      ).then(res => {
        commit("SAVE_ORDER_LIST", res.data.records);
        resolve(res);
      });
    });
  },
  //查看订单操作记录
  queryOrderOperation({ commit }, data) {
    return new Promise(resolve => {
      queryOrderOperation(data).then(res => {
        commit("SAVE_ORDER_RECORD", res.data);
        resolve(res);
      });
    });
  },
  ////发起退款
  orderRefund({ commit }, data) {
    return new Promise(resolve => {
      orderRefund(data).then(res => {
        resolve(res);
      });
    });
  },
  //转移课程生成新订单
  transferCourse({ commit }, data) {
    return new Promise(resolve => {
      transferCourse(data).then(res => {
        resolve(res);
      });
    });
  },

  //搜索需要转移的目标课程

  queryCourseByName({ commit }, data) {
    return new Promise(resolve => {
      queryCourseByName(data).then(res => {
        resolve(res);
      });
    });
  }
};

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
};
