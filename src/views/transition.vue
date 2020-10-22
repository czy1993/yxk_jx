<template>
  <div
    class="_transition"
    v-loading="true"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#fff"
  ></div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["menuList"]),
    menu() {
      return this.menuRecursive(this.menuList);
    }
  },
  created() {
    this.initMenu();
  },
  methods: {
    ...mapActions(["searchLeftMenu"]),
    initMenu() {
      this.searchLeftMenu();
    },
    handleItem(item) {
      if (item.component === "1" && item.type === "1") {
        return item;
      }
    },
    menuRecursive(arr) {
      let mm;
      for (let menu of arr) {
        if ((mm = this.handleItem(menu))) {
          return mm;
        }
        if (menu.children > 0) {
          this.menuRecursive(arr);
        }
      }
    }
  },
  watch: {
    menu(val) {
      this.$nextTick(() => {
        this.$router.push(val.frontUrl);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
._transition {
  width: 100%;
  height: 100%;
}
</style>
