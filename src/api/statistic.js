import request from "@/utils/request";

//课程
export function queryCourse() {
  return request({
    url: `/agency/front/statistics/course/list`,
    method: "get"
  });
}

//转化率分析-漏斗图
export function generatePlot(data) {
  return request({
    url: `/agency/front/statistics/funnel/plot`,
    method: "get",
    params: data
  });
}

//饼图

export function generatePie(data) {
  return request({
    url: `/agency/front/statistics/pie`,
    method: "get",
    params: data
  });
}

//课程报名量-柱状图

export function generateGraph(data) {
  return request({
    url: `/agency/front/statistics/bar/graph`,
    method: "get",
    params: data
  });
}

//经营情况-折线图
export function generateChart(data) {
  return request({
    url: `/agency/front/statistics/line/chart`,
    method: "get",
    params: data
  });
}