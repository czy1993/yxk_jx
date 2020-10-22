import request from "@/utils/request";
//订单管理
export function manageOrders(data) {
  return request({
    url: `/agency/front/Order/manageOrders?${data}`,
    method: "get"
  });
}
//查看订单操作记录
export function queryOrderOperation(data) {
  return request({
    url: `/agency/front/Order/queryOrderOperation`,
    method: "get",
    params: data
  });
}

//发起退款
export function orderRefund(data) {
  return request({
    url: `/agency/front/Order/orderRefund`,
    method: "get",
    params: data
  });
}

//转移课程生成新订单
export function transferCourse(data) {
  return request({
    url: `/agency/front/Order/transferCourse`,
    method: "post",
    data
  });
}
//搜索需要转移的目标课程
export function queryCourseByName(data) {
  return request({
    url: `/agency/front/Order/queryCourseByName`,
    method: "get",
    params: data
  });
}
