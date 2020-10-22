<template>
  <div id="transfer_pop" :class="themeName">
    <div class="transfer_container">
      <div class="_select">
        <!-- <el-select v-model="course" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>-->
        <el-autocomplete
          :fetch-suggestions="querySearchAsync"
          v-model="course"
          placeholder="请输入课程名称"
          @select="handleSelect"
        ></el-autocomplete>
        <p>(想要转移至的课程名称，剩余课时不低于转移课时)</p>
        <div class="_radio">
          <el-radio v-model="status" label="1">转移主课程</el-radio>
          <el-radio v-model="status" label="2">转移联报课程</el-radio>
        </div>
      </div>
      <footer>
        <button @click="submit">设置完成</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import bus from "@/utils/bus";
export default {
  props: ["oldOrderNo"],
  data() {
    return {
      course: "",
      timeout: null,
      status: "1",
      courseName: "",
      courseId: ""
    };
  },
  mounted() {},
  methods: {
    ...mapActions("order", ["transferCourse", "queryCourseByName"]),
    submit() {
      if (!this.course) {
        this.$message.error({
          message: "请输入课程名称"
        });
      } else {
        this.transferCourse({
          courseId: this.courseId,
          courseName: this.courseName,
          oldOrderNo: this.oldOrderNo,
          status: this.status
        }).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message: "转移成功！",
              duration: 1500,
              onClose: () => {
                bus.$emit("initOrder");
              }
            });
          }
        });
      }
    },
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.queryCourseByName({
          courseName: queryString
        }).then(res => {
          let arr = res.data.map(course => {
            return {
              value: course.courseName,
              courseName: course.courseName,
              courseId: course.courseId
            };
          });
          cb(arr);
        });
      }, 1000 * Math.random());
    },
    handleSelect(course) {
      this.courseName = course.courseName;
      this.courseId = course.courseId;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#transfer_pop {
  padding: 40px;
}

.transfer_container {
  ._select {
    @include display(center) {
      flex-direction: column;
    }
    p {
      font-size: $font-size - 4px;
      color: #7e7e7e;
    }
    .el-autocomplete {
      width: 90%;
    }
    ._radio {
      display: flex;
      margin-top: 20px;
    }
  }
  footer {
    width: 100%;
    margin-top: 40px;
    button {
      @include buttonColor($type: "ge") {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
