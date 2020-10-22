import {
  courseList,
  addCourse,
  queryStudent,
  updateStatus,
  queryTeacher,
  queryCourseMessage,
  queryCoupon,
  editCourse,
  queryRegion
} from "@/api/course";

import { getDict } from "@/api/user";
import { queryCourses } from "@/api/marketing";

const state = {
  isEdite: false,
  courseList: [],
  studentList: [],
  checkedList: [], //选中的课程id集合
  subjectList: [],
  teachAreas: [], //学习阶段
  teacherList: [],
  couponShow: false, //能否选择优惠券
  unionCourse: [], //联报课程
  courseDetails: "", //课程详情
  courseData: "", //已编辑数据
  isAgainEdit: false, //是否再编辑
  couponList: [], //优惠券列表
  courseId: ""
};

const getters = {
  teachers(state) {
    let arr = [];
    for (let item of state.teacherList) {
      arr.push({
        value: item.teacherName,
        id: item.teacherId
      });
    }
    return arr;
  }
};
const mutations = {
  SET_EDITE_STATUS: (state, boolean) => {
    state.isEdite = boolean;
  },
  //存储课程列表
  SAVE_COURSE_LIST: (state, list) => {
    state.courseList = list;
  },
  //学生列表
  SAVE_STUDENT_LIST: (state, list) => {
    state.studentList = list;
  },
  SAVE_COURSE_ID: (state, list) => {
    state.checkedList = list;
  },
  SAVE_SUBJECT: (state, list) => {
    state.subjectList = list;
  },
  SAVE_TEACH_AREAS: (state, list) => {
    state.teachAreas = list;
  },
  SAVE_TEACHERS: (state, list) => {
    state.teacherList = list;
  },
  SET_COUPON_SHOW: (state, boolean) => {
    state.couponShow = boolean;
  },
  SAVE_UNION_COURSE: (state, courses) => {
    state.unionCourse = courses;
  },
  //课程详情
  SAVE_COURSE_DETAILS: (state, details) => {
    state.courseDetails = details;
  },
  //保存已编辑数据
  SAVE_COURSE_DATA: (state, details) => {
    state.courseData = details;
  },
  //设置再编辑
  SET_AGAIN_EDIT: (state, boolean) => {
    state.isAgainEdit = boolean;
  },
  SAVE_COUPONS: (state, boolean) => {
    state.couponList = boolean;
  },
  SET_COURSE_ID: (state, id) => {
    state.courseId = id;
  }
};

const actions = {
  //查询课程列表
  queryCourseList({ commit }, data) {
    return new Promise(resolve => {
      courseList(data).then(res => {
        commit("SAVE_COURSE_LIST", res.data.records);
        resolve(res);
      });
    });
  },
  //添加课程
  addCourse({ commit }, data) {
    return new Promise(resolve => {
      addCourse(data).then(res => {
        resolve(res);
      });
    });
  },
  ////查询课程学生
  queryStudent({ commit }, data) {
    return new Promise(resolve => {
      queryStudent(data).then(res => {
        commit("SAVE_STUDENT_LIST", res.data.records);
        resolve(res);
      });
    });
  },
  //更新课程状态(上架，下架)
  updateStatus({ commit }, data) {
    return new Promise(resolve => {
      updateStatus(data).then(res => {
        resolve(res);
      });
    });
  },
  //查询科目
  getDictSubject({ commit }) {
    return new Promise(resolve => {
      getDict(`groupType=subject`).then(res => {
        commit("SAVE_SUBJECT", res.data);
        resolve(res);
      });
    });
  },
  //查询学习阶段
  getDictTeachAreasDict({ commit }) {
    return new Promise(resolve => {
      getDict(`groupType=teachAreas`).then(res => {
        commit("SAVE_TEACH_AREAS", res.data);
        resolve(res);
      });
    });
  },
  //查询机构老师
  queryTeacher({ commit }, data) {
    return new Promise(resolve => {
      queryTeacher(data).then(res => {
        commit("SAVE_TEACHERS", res.data);
        resolve(res);
      });
    });
  },
  //查询未上架课程（联报）
  queryCourses({ commit }, data) {
    return new Promise(resolve => {
      queryCourses(data).then(res => {
        commit("SAVE_UNION_COURSE", res.data);
        resolve(res);
      });
    });
  },
  //查询课程信息
  queryCourseDetails({ commit }, data) {
    return new Promise(resolve => {
      queryCourseMessage(data).then(res => {
        commit("SAVE_COURSE_DETAILS", res.data);
        resolve(res);
      });
    });
  },
  //查询优惠券
  queryCoupon({ commit }, data) {
    return new Promise(resolve => {
      queryCoupon(data).then(res => {
        commit("SAVE_COUPONS", res.data);
        resolve(res);
      });
    });
  },
  //课程编辑
  editCourse({ commit }, data) {
    return new Promise(resolve => {
      editCourse(data).then(res => {
        resolve(res);
      });
    });
  },
  queryRegion({ commit }, data) {
    return new Promise(resolve => {
      queryRegion(data).then(res => {
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
