<template>
  <div id="education_pagination">
    <div class="pagination_container">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
        :background="true"
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        :pager-count="pagerCount"
        :small="small"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 40, 100]
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number
    },
    pagerCount: {
      type: Number
    },
    small: {
      type: Boolean
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  methods: {
    sizeChange(num) {
      this.$emit("size-change", num);
    },
    currentChange(page) {
      this.$emit("current-change", page);
    },
    prevClick(page) {
      this.$emit("prev-click", page);
    },
    nextClick(page) {
      this.$emit("next-click", page);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.pagination_container {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    @include themify() {
      background-color: themed("deputy-button");
      color: #fff;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled) {
    &:not(.active) {
      &:hover {
        @include themify() {
          color: themed("deputy-button");
        }
      }
    }
  }
}
</style>
