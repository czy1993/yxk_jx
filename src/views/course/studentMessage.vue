<template>
  <div id="student_message">
    <div ref="container" class="message_container">
      <header ref="header">
        <div>
          <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
        </div>
      </header>
      <div class="student_table">
        <ec-table :height="height" :tableData="studentList">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span>{{studentList.indexOf(scope.row)+1 }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span>{{sex[scope.row.sex]}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="phone" label="手机号">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
        </ec-table>
      </div>
      <footer ref="footer">
        <ec-pagination
          @current-page="changePage"
          @page-size="changeSize"
          :total="total"
          :currentPage="currentPage"
        ></ec-pagination>
      </footer>
    </div>
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import EcPagination from "@/components/EducationPagination";
import { mapState, mapActions } from "vuex";
import { export_json_to_excel } from "@/utils/Export2Excel";
export default {
  data() {
    return {
      height: "100px",
      currentPage: 1,
      size: 10,
      total: 0,
      sex: {
        "1": "男",
        "2": "女"
      }
    };
  },
  computed: {
    ...mapState("course", ["studentList"])
  },
  mounted() {
    this.init();
    this.query(1);

    window.addEventListener("resize", this.init);
  },
  methods: {
    ...mapActions("course", ["queryStudent"]),
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    query(page) {
      this.queryStudent(
        `courseId=${this.$route.query.id}&current=${page}&size=${this.size}`
      ).then(res => {
        this.total = res.data.total;
      });
    },
    changeSize(size) {
      this.size = size;
      this.query(1);
    },
    //翻页
    changePage(page) {
      this.query(page);
    },
    handleExportExcel() {
      const tHeader = ["姓名", "性别", "手机号"];
      const filterVal = ["name", "sex", "phone"];

      const data = this.formatJson(filterVal, this.studentList);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "学员管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "sex") {
            return this.sex[item[item2]];
          } else {
            return item[item2];
          }
        });
      });
    }
  },
  components: {
    EcButton,
    EcTable,
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
#student_message {
  @include layout;
}

.message_container {
  height: 100%;
  margin-left: 100px;
  header {
    @include display($hor: flex-end);
    padding-right: 70px;
    padding-bottom: 10px;
  }
  footer {
    padding-top: 10px;
  }
}
</style>
