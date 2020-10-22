import {
  studentList,
  queryStudentCourse,
  queryCourseStatus
} from "@/api/student";

const state = {
  studentList: [], //学生列表
  courseDetailList: [],//学员课程详情列表
  courseStatusList:[]
};

const mutations = {
  SAVE_STUDENT_LIST(state, list) {
    state.studentList = list;
  },
  //保存学员课程详情
  SAVE_STUDENT_COURSE_DETAIL(state, data) {
    state.courseDetailList = data;
  },
  //保存课程考勤详情
  SAVE_COURSE_STATUS(state, data){
    state.courseStatusList = data;
  }
};

const actions = {
  //查询学生列表
  queryStudentList({ commit }, data) {
    return new Promise(resolve => {
      studentList(data).then(res => {
        commit("SAVE_STUDENT_LIST", res.data.records);
        resolve(res);
      });
    });
  },
  //学员课程详情
  queryStudentCourse({ commit }, data) {
    return new Promise(resolve => {
      queryStudentCourse(data).then(res => {
        commit("SAVE_STUDENT_COURSE_DETAIL", res.data);
        resolve(res);
      });
    });
  },
  //课程考勤详情
  queryCourseStatus({ commit }, data) {
    return new Promise(resolve => {
        queryCourseStatus(data).then(res => {
        commit("SAVE_COURSE_STATUS", res.data);
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
