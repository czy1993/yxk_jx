<template>
  <li id="sub_side" :class="themeName">
    <div @click="handleClick" class="sub_side_container" :style="[paddingStyle]">
      <template>
        <div class="side_left">
          <div class="img">
            <!-- <img :src="icon" alt> -->
            <slot name="icon"></slot>
          </div>
          <slot name="title"></slot>
        </div>

        <i class="iconfont icon-arrow-down" :class="{tranformClass:opened}"></i>
      </template>
    </div>
    <collapse-transition>
      <ul role="menu" class="sub_items" v-show="opened">
        <slot></slot>
      </ul>
    </collapse-transition>
  </li>
</template>

<script>
import CollapseTransition from "@/transition/CollapseTransition.vue";
import menuMixin from "./menu-mixin";
export default {
  name: "sub-side",
  componentName: "sub-side",
  inject: ["rootMenu"],
  mixins: [menuMixin],
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    icon: String
  },
  data() {
    return {
      items: {},
      submenus: {}
    };
  },
  computed: {
    opened() {
      return this.rootMenu.openedMenus.includes(this.index);
    }
  },
  mounted() {
    this.parentMenu.addSubmenu(this);
    this.rootMenu.addSubmenu(this);
  },
  methods: {
    handleClick() {
      this.rootMenu.handleSubmenuClick(this);
    },
    addItem(item) {
      this.$set(this.items, item.index, item);
    },
    addSubmenu(obj) {
      this.$set(this.submenus, obj.index, obj);
    }
  },
  components: {
    CollapseTransition
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.sub_side_container {
  font-size: $font-size;
  color: $font-color;
  cursor: pointer;
  -webkit-user-select: none;
  height: 60px;
  @include display(space-between);
  transition: all 0.3s;
  padding: 0 20px;
  @include themify() {
    color: themed("sider-fontcolor");
  }
  .side_left {
    @include display();

    .img {
      width: 25px;
      @include display(center);
      margin-right: 10px;
    }
  }

  .sub_items {
    width: 100%;
  }
  i {
    transition: all 0.3s;
  }

  .tranformClass {
    transform: rotate3d(0, 0, 1, 180deg);
  }
  & + div {
    // color: red;
    .sub_items {
      @include themify() {
        background-color: themed("sub-bgcolor");
      }
    }
  }

  &:hover {
    @include themify() {
      background-color: themed("sider-hover");
    }
  }
}
</style>
