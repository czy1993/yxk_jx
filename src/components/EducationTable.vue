<template>
  <div id="education_table" :class="themeName">
    <div class="education_container">
      <el-table
        :cell-style="{textAlign:'center'}"
        header-cell-class-name="ec_table_header"
        :data="tableData"
        fit
        style="width: 100%"
        row-class-name="ec_table_row"
        cell-class-name="ec_table_cell"
        :height="height"
        :default-sort="defaultSort"
      >
        <slot></slot>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ec_table",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    height: {
      type: String || Number
    },
    defaultSort: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.education_container {
  .ec_table_header {
    @include themify() {
      background: themed("table-header");
      color: $font-color;
      text-align: center;
      font-weight: 500;
      font-size: $font-size - 2px;
    }
  }
  .ec_table_row:nth-child(odd) {
    @include themify() {
      background: themed("table-odd-row");
    }
  }
  .ec_table_row:nth-child(even) {
    @include themify() {
      background: themed("table-even-row");
    }
  }
  .ec_table_cell {
    border: none;
    font-size: 13px;
    color: $font-color-ass;
  }

  .el-table {
    background: transparent;
  }

  .el-table__body-wrapper {
    @include scroll-bar;
  }
}
</style>
