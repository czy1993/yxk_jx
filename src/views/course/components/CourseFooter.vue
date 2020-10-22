<template>
  <div id="course_footer">
    <div class="_footer">
      <ec-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        :total="total"
        :currentPage="currentPage"
      ></ec-pagination>
      <div v-if="!isEdite">
        <ec-button @click.native="edite">编辑</ec-button>
      </div>
      <div class="edite_column" v-else>
        <ec-check-box v-model="all">全选</ec-check-box>
        <div class="btns">
          <button @click="update_status('2')">上架</button>
          <button @click="update_status('1')">下架</button>
          <ec-button @click.native="cancel">取消</ec-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcCheckBox from "@/components/EducationCheckBox";
import EcPagination from "@/components/EducationPagination";
import { mapState, mapMutations, mapActions } from "vuex";
import bus from "@/utils/bus";
export default {
  props: {
    total: [String, Number],
    currentPage: Number
  },
  data() {
    return {
      all: false
    };
  },
  computed: {
    ...mapState("course", ["isEdite", "checkedList"]),
    courseIds() {
      return this.checkedList.join(",");
    }
  },
  components: {
    EcButton,
    EcCheckBox,
    EcPagination
  },
  methods: {
    ...mapMutations(["SAVE_TITLE"]),
    ...mapMutations("course", ["SET_EDITE_STATUS"]),
    ...mapActions("course", ["updateStatus"]),
    edite() {
      this.SAVE_TITLE("课程编辑");
      this.SET_EDITE_STATUS(true);
    },
    cancel() {
      this.SET_EDITE_STATUS(false);
    },
    sizeChange(num) {
      this.$emit("page-size", num);
    },
    currentChange(page) {
      this.$emit("current-page", page);
    },
    update_status(status) {
      if (this.checkedList.length > 0) {
        this.updateStatus(`courseIds=${this.courseIds}&status=${status}`).then(
          res => {
            if (res.code === 200) {
              this.$message({
                message: status === "2" ? "上架成功！" : "下架成功！",
                type: "success",
                duration: 1.5 * 1000,
                onClose: () => {
                  this.$emit("update_status");
                }
              });
            }
          }
        );
      } else {
        this.$message({
          type: "error",
          message: "请选择至少一个课程",
          duration: 2000
        });
      }
    }
  },
  watch: {
    all(val) {
      bus.$emit("all", val);
    }
  }
};
</script>

<style lang="scss" >
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
._footer {
  padding: 20px 0 0;
  @include display($hor: space-between) {
    flex-wrap: wrap;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $deputy-color;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    &:not(.active) {
      &:hover {
        color: $deputy-color;
      }
    }
  }
  .edite_column {
    @include display($hor: space-between);

    .btns {
      margin-left: 20px;
      button:nth-child(1) {
        @include buttonColor("c");
      }
      button:nth-child(2) {
        @include buttonColor("g");
      }
    }
  }
}
</style>
