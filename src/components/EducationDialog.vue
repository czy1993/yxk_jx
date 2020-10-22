<template>
  <transition name="pop">
    <div v-show="value" id="education_dialog">
      <div class="dialog_container">
        <div class="header">
          <i @click="back" class="el-icon-back"></i>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  model: {
    prop: "value",
    event: "click"
  },
  methods: {
    back() {
      this.$emit("click", false);
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.$emit("open", val);
      } else {
        this.$emit("close", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.pop-enter {
  transform: scale(0.2);
}

.pop-enter-to {
  transform: scale(1);
}
.pop-enter-active {
  transition: all 0.3s;
  transform-origin: bottom right;
}

#education_dialog {
  width: 100%;
  height: 100%;
  background: #eeee;
  position: absolute;
  top: 0;
  z-index: 1000;
  overflow: auto;
  @include scroll-bar;
}

.dialog_container {
  width: 100%;
  height: 100%;
  padding: 30px;
  background: #fff;
  .header {
    @include display(flex-start);
    .el-icon-back {
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>
