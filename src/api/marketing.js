// 营销管理api
import request from "@/utils/request";

// /agency/front/marketing/queryActivity 查询当前活动
export function queryActivity(data) {
  return request({
    url: "/agency/front/marketing/queryActivity" + data,
    method: "get"
  });
}
// /agency/front/marketing/queryUserCoupon  查询优惠券
export function queryUserCoupon(data) {
  return request({
    url: "/agency/front/marketing/queryUserCoupon" + data,
    method: "get"
  });
}
// /agency/front/marketing/setCoupon 设定优惠券
export function setCoupon(data) {
  return request({
    url: "/agency/front/marketing/setCoupon",
    method: "post",
    data
  });
}
// /agency/front/marketing/queryNotice 查询已发布的通知
export function queryNotice(data) {
  return request({
    url: "/agency/front/marketing/queryNotice",
    method: "get",
    params: data
  });
}
// /agency/front/marketing/setNotice 新增/编辑 通知
export function setNotice(data) {
  return request({
    url: "/agency/front/marketing/setNotice",
    method: "post",
    data
  });
}
// /agency/front/marketing/queryLevels 查询机构层级
export function queryLevels(data) {
  return request({
    url: "/agency/front/marketing/queryLevels",
    method: "get",
    params:data
  });
}
// /agency/front/marketing/adverts  查询广告计划
export function adverts() {
  return request({
    url: "/agency/front/marketing/adverts",
    method: "get"
  });
}
// /agency/front/marketing/joinActivity 参与id对应的活动(教学端)
export function joinActivity(data) {
  return request({
    url: "/agency/front/marketing/joinActivity" + data,
    method: "get"
  });
}
// /agency/front/marketing/advertising 广告投放(教学端)
export function advertising(data) {
  return request({
    url: "/agency/front/marketing/advertising",
    method: "post",
    data
  });
}
// /agency/front/marketing/queryCourses  查询未上架的课程(教学端)
export function queryCourses(data) {
  return request({
    url: "/agency/front/marketing/queryCourses?status=" + data,
    method: "get"
  });
}
