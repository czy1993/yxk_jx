<template>
  <li @click="handelClick" id="sider_item" :class="themeName"  >
    <div class="item_container" :class="[active?'sider_item_active':'sider_item_unactive']" :style="[paddingStyle]">
      <template>
        <div class="item_left">
          <div class="img">
            <!-- <img :src="themeType=='green'&&(!active?icon:active_icon)||themeType=='black'&&active_icon" alt> -->
            <slot name="icon"></slot>
          </div>
          <slot></slot>
          <slot name="title"></slot>
        </div>
      </template>
    </div>
  </li>
</template>

<script>
import menuMixin from "./menu-mixin";
export default {
  inject: ["rootMenu"],
  mixins: [menuMixin],
  props: {
    index: {
      default: null,
      validator: val => {
        return typeof val === "string" || val === null;
      }
    },
    route: [String, Object],
    icon: [String],
    active_icon: [String]
  },
  mounted() {
    this.rootMenu.addItem(this);
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex;
    }
  },
  methods: {
    handelClick() {
      this.rootMenu.handleItemClick(this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";


.item_container {
  font-size: $font-size;
  // color: $font-color;
  cursor: pointer;
  -webkit-user-select: none;
  height: 60px;
  @include display($hor: space-between);
  transition: all 0.3s;
  padding: 0 20px;
  .item_left {
    @include display;
    .img {
      width: 25px;
      @include display(center);
      margin-right: 10px;
    }
  }
}
.sider_item_unactive {
  &:hover {
    @include themify() {
      background-color: themed("sider-hover");
    }
  }
}
.sider_item_active {
  @include themify() {
    background-color: themed("nav-active");
    color: #fff;
  }
}
</style>
