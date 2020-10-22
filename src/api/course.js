import request from "@/utils/request";
//课程列表
export function courseList(data) {
  return request({
    url: `/agency/front/course/list?${data}`,
    method: "get"
  });
}
//添加课程
export function addCourse(data) {
  return request({
    url: `/agency/front/course/add`,
    method: "post",
    data
  });
}
//查询课程学生
export function queryStudent(data) {
  return request({
    url: `/agency/front/course/student?${data}`,
    method: "get"
  });
}
//更新课程状态(上架，下架)
export function updateStatus(data) {
  return request({
    url: `/agency/front/course/update/status?${data}`,
    method: "get"
  });
}
//查询机构老师
export function queryTeacher(data) {
  return request({
    url: `/agency/front/course/teacher?${data}`,
    method: "get"
  });
}
//查询课程信息
export function queryCourseMessage(data) {
  return request({
    url: `/agency/front/course/query/id?${data}`,
    method: "get"
  });
}
//查询优惠券
export function queryCoupon(data) {
  return request({
    url: `/agency/front/course/query/coupon?${data}`,
    method: "get"
  });
}
//课程编辑
export function editCourse(data) {
  return request({
    url: `/agency/front/course/edit`,
    method: "post",
    data
  });
}
//区域信息接口-只查机构省级辖区的所有市区
export function queryRegion(data) {
  return request({
    url: `/agency/front/course/region`,
    method: "get",
    params: data
  });
}
