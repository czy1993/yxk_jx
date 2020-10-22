const funnel = {
  title: {
    text: "转化率分析"
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {d}%"
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  //   legend: {
  //     data: ["展现", "点击", "访问", "咨询", "订单"]
  //   },

  series: [
    {
      name: "转化率分析",
      type: "funnel",
      left: "5%",
      top: 60,
      bottom: 30,
      width: "75%",
      min: 0,
      max: 100,
      minSize: "10%",
      maxSize: "100%",
      sort: "descending",
      //   gap: 2,
      label: {
        show: true,
        color: "#9A9A9A",
        // position: "inside",
        formatter: "{b} {c}"
      },
      labelLine: {
        length: 15,
        lineStyle: {
          width: 1,
          type: "solid",
          color: "#9A9A9A"
        }
      },
      itemStyle: {
        // borderColor: "#fff",
        // borderWidth: 1
        color: ({ seriesIndex, dataIndex, data, value }) => {
          let colors = ["#3AA1FF", "#4ECB73", "#FBD437", "#435188"];
          return colors[dataIndex];
        }
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: []
    }
  ]
};

const pie = {
  title: {
    text: "报名来源"
  },
  tooltip: {
    name: "报名来源",
    trigger: "item",
    formatter: "{b} : {c} ({d}%)"
  },
  legend: {
    orient: "horizontal",
    bottom: "30",
    data: ["新用户", "续报"]
  },
  series: [
    {
      name: "报名来源",
      type: "pie",
      radius: "55%",
      left: "1%",
      center: ["50%", "60%"],
      bottom: 40,
      label: {
        show: true,
        color: "#9A9A9A",
        // position: "inside",
        formatter: "{b} {d}%"
      },
      labelLine: {
        length: 15,
        lineStyle: {
          width: 1,
          type: "solid",
          color: "#9A9A9A"
        }
      },
      itemStyle: {
        color: ({ seriesIndex, dataIndex, data, value }) => {
          let colors = ["#3AA1FF", "#36CBCB", "#FBD437", "#435188"];
          return colors[dataIndex];
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      data: []
    }
  ]
};

const bar = {
  title: {
    text: "课程报名量"
  },
  tooltip: {
    name: "课程报名量",
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    orient: "horizontal",
    bottom: "0",
    data: ["新用户", "续报"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "12%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
        interval: 0
      },
      axisLabel: {
        interval: 0,
        rotate: -45,
        color: "#9A9A9A"
      }
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "新用户",
      type: "bar",
      stack: "one",
      itemStyle: {
        color: "#3AA1FF"
      }
    },
    {
      name: "续报",
      type: "bar",
      stack: "one",
      itemStyle: {
        color: "#4ECB73"
      }
    }
  ]
};

const line = {
  title: {
    text: "经营情况"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    orient: "horizontal",
    bottom: "0",
    data: ["合计", "应收款",'退款']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: "value"
  },

  series: [
    {
      name:'合计',
      type: "line",
      symbol: "circle",
      lineStyle: {
        color: "#3AA1FF"
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: "#3AA1FF",
        color: "#3AA1FF"
      }
    },
    {
      name:"应收款",
      type: "line",
      symbol: "circle",
      lineStyle: {
        color: "#4ECB73"
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: "#4ECB73",
        color: "#4ECB73"
      }
    },
    {
      name:"退款",
      type: "line",
      symbol: "circle",
      lineStyle: {
        color: "#FBD437"
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: "#FBD437",
        color: "#FBD437"
      }
    }
  ]
};

export { funnel, pie, bar, line };
