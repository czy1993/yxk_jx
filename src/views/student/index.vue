<template>
  <div id="education_student">
    <div ref="container" class="student_container">
      <student-header
        @search="search"
        :inputValue="inputValue"
        ref="header"
      ></student-header>
      <student-table :height="height" :tableData="studentList"></student-table>
      <footer ref="footer">
        <ec-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :total="total"
          :currentPage="currentPage"
        ></ec-pagination>
      </footer>
    </div>
  </div>
</template>

<script>
import StudentHeader from "./components/StudentHeader";
import StudentTable from "./components/StudentTable";
import EcPagination from "@/components/EducationPagination";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      height: "100px",
      currentPage: 1,
      inputValue: "",
      total: 1,
      size: 10,
    };
  },
  computed: {
    ...mapState("student", ["studentList"])
  },
  mounted() {
    this.init();
    this.query(1, this.inputValue);
    console.log(this.studentData);
    window.addEventListener("resize", this.init);
  },
  methods: {
    ...mapActions("student", ["queryStudentList"]),
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.$el.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    query(page, name) {
      this.queryStudentList(
        `current=${page}&size=${this.size}&studentPhoneOrName=${name}`
      ).then(res => {
        this.total = res.data.total;
      });
    },
    search(name) {
      this.query(1, name);
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
  },
  components: {
    StudentHeader,
    StudentTable,
    EcPagination
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

#education_student {
  @include layout;
}

.student_container {
  height: 100%;
  footer {
    padding-top: 10px;
  }
}
</style>
