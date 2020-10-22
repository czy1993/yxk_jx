<template>
  <div id="education_sidebar" :class="themeName">
    <ul class="sidebar_container">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SideItem from "./SideItem.vue";
import SubSide from "./SubSide.vue";
export default {
  name: "side-bar",
  componentName:'side-bar',
  props: {
    defaultActive: {
      type: String,
      default: ""
    },
    router: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: this.defaultOpeneds ? this.defaultOpeneds.slice(0) : [],
      items: {},
      submenus: {}
    };
  },
  computed: {
    isActive(item) {
      return item => {
        return (
          this.$route.name === item.name &&
          (!item.children || item.children.length == 0)
        );
      };
    }
  },
  methods: {
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index);
      if (i !== -1) {
        this.openedMenus.splice(i, 1);
      }
    },
    openMenu(index) {
      if (this.openedMenus.includes(index)) return;
      if (this.uniqueOpened) {
        this.openedMenus = this.openedMenus.filter(indexPath => {
          return index === indexPath;
        });
      }
      this.openedMenus.push(index);
    },
    handleItemClick(obj) {
      let oldActiveIndex = this.activeIndex;
      let hasIndex = obj.index !== null;
      if (hasIndex) {
        this.activeIndex = obj.index;
      }

      this.$emit("select", obj.index);

      if (this.router && hasIndex) {
        if (obj.index !== this.$route.path)
          this.$router.push(obj.route || obj.index);
      }
    },
    handleSubmenuClick(obj) {
      let { index } = obj;
      let opened = this.openedMenus.includes(index);
      if (opened) {
        this.closeMenu(index);
      } else {
        this.openMenu(index);
      }
    },
    addItem(obj) {
      this.$set(this.items, obj.index, obj);
    },
    addSubmenu(obj) {
      this.$set(this.submenus, obj.index, obj);
    }
  },
  components: {
    SideItem,
    SubSide
  },
  provide() {
    return {
      rootMenu: this
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_sidebar {
  height: 100%;
}
.sidebar_container {
  height: 100%;
  width: $side-width;
  overflow: auto;
  padding-top: 5px;
  @include themify() {
    box-shadow: 5px 2px 5px 3px themed("sider-boxshadow");
    background-color: themed("sider-bgcolor");
    color: themed("sider-fontcolor");
  }
  @include scroll-bar;
  .sider_item {
    font-size: $font-size;

    cursor: pointer;
    -webkit-user-select: none;
    // @include display($hor: center);

    .submenu_title {
      height: 60px;
      @include display($hor: center);
      transition: all 0.3s;
      .img {
        width: 32px;
        margin-right: 15px;
        img {
          width: 32px;
        }
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
}
</style>
