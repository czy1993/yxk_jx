import request from "@/utils/request";
//学员列表
export function studentList(data) {
  return request({
    url: `/agency/front/Student/queryCourseStudentVO?${data}`,
    method: "get"
  });
}
//学员课程详情
export function queryStudentCourse(data) {
  return request({
    url: `/agency/front/Student/queryStudentCourse?${data}`,
    method: "get"
  });
}
//课程考勤详情
export function queryCourseStatus(data) {
  return request({
    url: `/agency/front/Student/queryCourseStatus?${data}`,
    method: "get"
  });
}
