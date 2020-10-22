<template>
  <div id="chart_unit" :class="themeName">
    <div class="unit_container">
      <div class="_date_course">
        <div class="_date">
          <el-date-picker
            v-model="dates"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :unlink-panels="true"
            value-format="yyyy-MM-dd"
            @change="change"
          ></el-date-picker>
        </div>
        <div class="_select" >
          <span class="_title" v-show="isShowCourse">课程选择</span>
          <el-select v-show="isShowCourse" @change="selectChange" v-model="course" placeholder="请选择课程">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="_main">
        <ul>
          <li
            :class="{active_btn:mark===index&&dateAndCourse['date']==dates}"
            @click="selectDate(index)"
            v-for="(item,index) of btns"
            :key="index"
          >{{item.name}}</li>
        </ul>
        <div class="_chart">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeFormate } from "@/utils";
export default {
  model: {
    prop: "dateAndCourse",
    event: "input"
  },
  props: {
    dateAndCourse: {
      type: Object,
      default: () => {
        return {
          date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()],
          course: ''
        };
      }
    },
    options: {
      type: Array
    },
    isShowCourse:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      dates: [],
      course: "",
      mark: 0,
      courseName: "",
      btns: [
        {
          name: "近24小时",
          date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()]
        },
        {
          name: "近7天",
          date: [
            new Date(new Date().getTime() - 24 * 3600 * 1000 * 7),
            new Date()
          ]
        },
        {
          name: "近30天",
          date: [
            new Date(new Date().getTime() - 24 * 3600 * 1000 * 30),
            new Date()
          ]
        }
      ]
    };
  },
  computed: {

  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.dates = this.dateAndCourse["date"];
      this.course = this.dateAndCourse["course"];
    },
    selectDate(index) {
      this.mark = index;
      this.$emit("input", {
        course: this.dateAndCourse.course,
        date: this.dateFormate(this.btns[index]["date"])
      });
    },
    change(val) {
      this.$emit("input", {
        course: this.dateAndCourse.course,
        date: val
      });
    },
    selectChange(val) {
      this.$emit("input", {
        course: val,
        date: this.dates
      });
    },
    dateFormate(arr) {
      let dateArr = arr.map(date => {
        return timeFormate(date.getTime());
      });
      return dateArr;
    }
  },
  watch: {
    dateAndCourse: {
      handler(val) {
        this.dates = val["date"];
        this.course = val["course"];
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#chart_unit {
}
.unit_container {
  width: 100%;
  ._date_course {
    margin-bottom: 10px;
    @include display() {
      flex-wrap: wrap;
    }
    ._date {
      // width: 50%;
    }
    ._select {
      width: 250px;
      @include display();
      max-width: 230px;
      margin-left: 20px;
      ._title {
        font-size: $font-size - 2px;
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
  ._main {
    @include display();
    & > ul {
      width: 100px;
      font-size: $font-size - 2px;
      li {
        width: 90%;
        padding: 5px 7px;
        margin-bottom: 30px;
        border-radius: 3px;
        transition: all 0.3s;
        cursor: pointer;
        @include display(center) {
        }
        @include themify() {
          color: themed("title-active");
          border: 1px solid themed("title-active");
        }
        &:hover {
          opacity: 0.8;
        }
      }
      .active_btn {
        @include themify() {
          background: themed("title-active");
          color: #fff;
        }
      }
    }
    ._chart {
      width: 75%;
      height: 360px;
    }
  }
}
</style>
