import request from "@/utils/request";
//查询我的机构信息
export function queryAgency(data) {
  return request({
    url: `/agency/front/agency/myAgency?${data}`,
    method: "get"
  });
}
//修改我的机构信息
export function editMyAgency(data) {
  return request({
    url: `/agency/front/agency/editMyAgency`,
    method: "post",
    data
  });
}
//查询机构评论
export function queryAgencyComment(data) {
  return request({
    url: `/agency/front/teacher/agencyComment`,
    method: "post",
    data
  });
}
//查询子评论
export function searchSonComment(data) {
  return request({
    url: `/agency/front/teacher/searchSonComment`,
    method: "post",
    data
  });
}
//查询机构所有素材
export function queryImageList(data) {
  return request({
    url: `/agency/front/agency/imageList?${data}`,
    method: "get",
  });
}
//添加、编辑机构素材
export function addOrEditImage(data) {
  return request({
    url: `/agency/front/agency/addOrEditImage`,
    method: "post",
    data
  });
}
//查询素材详情
export function queryMaterialDetail(data) {
  return request({
    url: `/agency/front/agency/imageById?${data}`,
    method: "get",
  });
}
//删除机构素材
export function delImage(data) {
  return request({
    url: `/agency/front/agency/delImage?${data}`,
    method: "get",
  });
}
//统计机构评价星级
export function searchStarCnt(data) {
  return request({
    url: `/agency/front/teacher/searchStarCnt?${data}`,
    method: "get",
  });
}
//回复评价修改
export function updateComment(data) {
  return request({
    url: `/agency/front/teacher/updateComment`,
    method: "post",
    data
  });
}
//机构回复评价
export function replyComment(data) {
  return request({
    url: `/agency/front/teacher/replyComment`,
    method: "post",
    data
  });
}