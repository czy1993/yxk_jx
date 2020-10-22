<template>
  <div id="education_course" :class="themeName">
    <div ref="container" class="course_container">
      <course-header @search="search" ref="top"></course-header>
      <course-table :tableData="courseList" :height="height"></course-table>
      <course-footer
        :currentPage="currentPage"
        @current-page="changePage"
        @page-size="changeSize"
        :total="total"
        ref="footer"
        @update_status="update_status"
      ></course-footer>
    </div>
  </div>
</template>
<script>
import CourseHeader from "./components/CourseHeader.vue";
import CourseTable from "./components/CourseTable.vue";
import CourseFooter from "./components/CourseFooter.vue";
import { mapState, mapMutations, mapActions } from "vuex";
// import bus from "@/utils/bus";
export default {
  data() {
    return {
      height: "100px",
      size: 10,
      total: 0,
      inputValue: "",
      // 课程类别
      courseType: "",
      currentPage: 1
    };
  },

  computed: {
    ...mapState("course", ["isEdite", "courseList"])
  },
  mounted() {
    this.init();
    this.query(1, "");
    window.addEventListener("resize", this.init);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  },
  methods: {
    ...mapMutations(["SAVE_TITLE"]),
    ...mapActions("course", ["queryCourseList"]),
    init() {
      this.updateEditeStatus(this.isEdite);
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.top.$el.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.$el.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    updateEditeStatus(val) {
      if (val) {
        this.SAVE_TITLE("课程编辑");
      } else {
        this.SAVE_TITLE("课程管理");
      }
    },
    query(page, name) {
      this.queryCourseList(
        `current=${page}&size=${this.size}&name=${name}&status=${
          this.courseType
        }`
      ).then(res => {
        this.total = res.data.total;
      });
    },
    changeSize(size) {
      this.size = size;
      this.currentPage = 1;
      this.query(1, this.inputValue);
    },
    //翻页
    changePage(page) {
      this.query(page, this.inputValue);
      this.currentPage = page;
    },
    //搜索课程
    search(val, type) {
      this.inputValue = val;
      this.courseType = type;
      this.query(1, this.inputValue);
    },
    // //筛选课程
    // changeType(val) {
    //   this.courseType = val;
    // },
    update_status() {
      this.query(this.currentPage, this.inputValue);
    }
  },
  components: {
    CourseHeader,
    CourseTable,
    CourseFooter
  },
  watch: {
    isEdite(val) {
      this.updateEditeStatus(val);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

#education_course {
  @include layout;
}

.course_container {
  height: 100%;
}
</style>
