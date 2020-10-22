<template>
  <div id="education_button" :class="themeName">
    <div class="ec_button_container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ec_button"
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_button {
  max-width: 190px;
  height: 40px;
  display: inline-block;
}
.ec_button_container {
  width: 100%;
  height: 100%;
  font-size: $font-size - 2px;
  padding: 0 35px;
  border-radius: 3px;
  transition: all 0.3s;
  background-color: #fff;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @include display($hor: center);
  @include themify() {
    border: 1px solid themed("border-color");
    color: themed("title-active");
  }
  &:hover {
    @include themify() {
      border-color: themed("title-active");
      color: themed("title-active");
    }
  }
  &:active {
    @include themify() {
         border-color: themed("title-active");
    }
  }
}
</style>
