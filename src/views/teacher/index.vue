<template>
  <div id="education_teacher">
    <div ref="container" class="teacher_container">
      <teacher-header :tableData="tableList" ref="header" @event1="get_teacher($event)"></teacher-header>
      <teacher-table :imgServer="imgServer" :height="height" ref="table" :tableData="tableList" @event1="goChild($event)"></teacher-table>
      <footer ref="footer">
        <ec-pagination
          :total="total"
          :currentPage="currentPage"
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
        ></ec-pagination>
      </footer>
    </div>
  </div>
</template>
<script>
import TeacherHeader from "./components/TeacherHeader.vue";
import TeacherTable from "./components/TeacherTable.vue";
import EcPagination from "@/components/EducationPagination";
import { teacherList, deleteTeacher } from "@/api/teacher.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      height: "100px",
      currentPage: 1,
      size: 10,
      name: "",
      phone: "",
      tableList: [],
      total: 0,
      imgServer:''
    };
  },
  components: {
    TeacherHeader,
    TeacherTable,
    EcPagination
  },
  mounted() {
    this.init();
    //初始化科目
    this.initSubjectDict();
    this.initTeachAreas();
    window.addEventListener("resize", this.init);
  },
  created() {
    this.save_teacherList(this.currentPage, this.size);
  },
  methods: {
    ...mapActions("course", ["getDictSubject", "getDictTeachAreasDict"]),
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.$el.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    //初始化科目
    initSubjectDict() {
      this.getDictSubject();
    },
    //初始化学习阶段
    initTeachAreas() {
      this.getDictTeachAreasDict();
    },
    save_teacherList(currentPage, size, name, phone) {
      teacherList({
        current: currentPage,
        name: name ? name : "",
        phone: phone ? phone : "",
        size: size
      }).then(res => {
        if (res.code == 200) {
          this.tableList = res.data.list.records;
          this.total = res.data.list.total;
          this.imgServer=res.data.imgServer;
        }
      });
    },
    del_deleteTeacher() {},
    handleSizeChange(e) {
      this.size = e;
      this.save_teacherList(this.currentPage, this.size);
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.save_teacherList(this.currentPage, this.size);
    },
    get_teacher(value) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (myreg.test(value) == true) {
        this.save_teacherList(this.currentPage, this.size, this.name, value);
      } else {
        this.save_teacherList(this.currentPage, this.size, value, this.phone);
      }
    },
    goChild(id) {
      this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTeacher(`?id=${id}`).then(res => {
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
                onClose: () => {
                  this.save_teacherList(this.currentPage, this.size);
                }
              });
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
#education_teacher {
  @include layout;
}
.teacher_container {
  height: 100%;
  footer {
    padding-top: 20px;
  }
}
</style>
