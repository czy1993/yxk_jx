<template>
  <div id="popup">
    <div class="popup-backgrount" @click="toParent(false)"></div>
    <div class="popup-view">
      <div class="popup-text">
        <slot name="texts"></slot>
      </div>
      <div class="popup-buts">
        <slot name="buttom"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toParent(type) {
      this.$emit("event1", type);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#popup {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  .popup-backgrount {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 10;
  }
  .popup-view {
    position: fixed;
    width: 340px;
    min-height: 220px;
    left: 50%;
    top: 200px;
    margin-left: -170px;
    background: #fff;
    z-index: 11;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    padding: 15px 20px 0 20px;
    .popup-text {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      p {
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        color: #6e6e6e;
      }
    }
    .popup-buts {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 110px;
        height: 33px;
        display: inline-block;
        text-align: center;
        line-height: 33px;
        border-radius: 1px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
        margin: 0 10px;
        @include themify() {
          background: themed("green-button");
          cursor: pointer;
        }
      }
      span:hover {
        opacity: 0.9;
      }
      .yeller {
        @include themify() {
          background: themed("deputy-button");
          cursor: pointer;
        }
      }
    }
  }
}
</style>