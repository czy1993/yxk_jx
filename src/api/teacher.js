// 教师管理api
import request from "@/utils/request";

//教师管理,查询老师
export function teacherList(data) {
  return request({
    url: "/agency/front/teacher/teacherList",
    method: "post",
    data
  });
}
// 新增教师
export function addTeacher(data) {
  return request({
    url: "/agency/front/teacher/addTeacher",
    method: "post",
    data
  });
}
// 编辑教师
export function updateTeacher(data) {
  return request({
    url: "/agency/front/teacher/updateTeacher",
    method: "post",
    data
  });
}
//查询教师评价
export function searchComment(data) {
  return request({
    url: "/agency/front/teacher/searchComment",
    method: "post",
    data
  });
}
// 编辑教师介绍
export function addDesc(data) {
  return request({
    url: "/agency/front/teacher/addDesc",
    method: "post",
    data
  });
}
// 教师考勤
export function searchAttendance(data) {
  return request({
    url: "/agency/front/teacher/searchAttendance" + data,
    method: "get"
  });
}
// 删除教师
export function deleteTeacher(data) {
  return request({
    url: "/agency/front/teacher/deleteTeacher" + data,
    method: "get"
  });
}
// 查询字典
export function getDict(data) {
  return request({
    url: "/agency/front/system/getDict" + data,
    method: "get"
  });
}

//统计教师评价星级
export function searchStarCnt(id) {
  return request({
    url: `/agency/front/teacher/searchStarCnt?id=${id}&type=1`,
    method: "get"
  });
}

//编辑教师图片限制
export function teacherPhotoLimit() {
  return request({
    url: `/agency/front/teacher/teacherPhotoLimit`,
    method: "get"
  });
}