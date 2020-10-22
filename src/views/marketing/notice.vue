<template>
  <div id="notice" class="education_views">
    <div class="education_header">
      <ec-button class="header-buts" @click.native="newsNotice">新的通知</ec-button>
    </div>
    <div class="education_centont">
      <div class="notice_content">
        <EcTable :tableData="noticeData">
          <el-table-column prop="id" label="序号">
            <template slot-scope="scope">
              <span>{{noticeData.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="通知名称">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="area" label="发布范围" width="150">
            <template slot-scope="scope">
              <span>{{handleLevel(scope.row.area)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="通知内容">
            <template slot-scope="scope">
              <span class="common_base">{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="发布时间" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.publishTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="getTime" label="操作" width="80">
            <template slot-scope="scope">
              <span class="edit" @click="onEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </EcTable>
      </div>

      <ec-dialog v-model="showEdite">
        <SetNotice :searchList="searchList" :title="title" @publish="publish" :dataObj="data"/>
      </ec-dialog>
    </div>
    <EcPagination
      :total="total"
      :currentPage="current"
      @size-change="handleSizeChange($event)"
      @current-change="handleCurrentChange($event)"
    ></EcPagination>
  </div>
</template>
<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import EcPagination from "@/components/EducationPagination";
import SetNotice from "./notice-set";
import { queryNotice, queryLevels } from "@/api/marketing.js";
import EcDialog from "../../components/EducationDialog";
import { getAccountInfo } from "@/utils/auth";
export default {
  components: {
    EcButton,
    EcTable,
    EcPagination,
    SetNotice,
    EcDialog
  },
  data() {
    return {
      showEdite: false,
      noticeData: [],
      size: 10,
      current: 1,
      data: {},
      total: 0,
      title: "通知编辑",
      searchList: []
    };
  },
  created() {
    this.queryLevel();
    this.save_queryNotice(this.size, this.current);
  },
  methods: {
    save_queryNotice(size, current) {
      queryNotice({
        current: current,
        size: size
      }).then(res => {
        this.noticeData = res.data.records;
        this.total = res.data.total;
      });
    },
    //新通知
    newsNotice() {
      this.showEdite = true;
      this.data = { area: "", id: "" };
      this.title = "新增通知";
    },
    //编辑
    onEdit(data) {
      this.showEdite = true;
      this.data = data;
      this.title = "通知编辑";
    },
    //编辑/发布
    publish() {
      this.showEdite = false;
      this.save_queryNotice(this.size, this.current);
    },
    handleSizeChange(e) {
      this.size = e;
      this.save_queryNotice(this.size, this.current);
    },
    handleCurrentChange(e) {
      this.current = e;
      this.save_queryNotice(this.size, this.current);
    },
    queryLevel() {
      queryLevels({
        agencyId: getAccountInfo().agencyId
      }).then(res => {
        if (res.code === 200) {
          this.searchList = res.data;
        }
      });
    },
    handleLevel(str) {
      let levelName = [];
      let arr = str.split(",").map(lel => {
        if (!!lel) {
          for (let level of this.searchList) {
            if (lel == level.levelDict) {
              return level.levelName;
            } else if (lel === "学员") {
              return "学员";
            }
          }
        }
      });
      return arr.join("，");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#notice {
  width: 100%;
  position: relative;
  .notice_content {
    width: 90% !important;
    min-width: 880px;
    margin: 0 auto;
    border: 1px solid #e8eae9;
  }
  .edit {
    @include themify() {
      color: themed("title-active");
      cursor: pointer;
    }
  }
}
</style>