<template>
  <div id="education_wrapper" :class="themeName">
    <NavBar/>
    <div class="education_container">
      <!-- <el-scrollbar class="scrollbar-wrapper"> -->
      <SideBar :default-active="$route.path" :router="true">
        <!-- <side-item
          :key="index"
          v-for="(item,index) of menuList"
          :index="item.to"
          :icon="item.icon"
          :active_icon="item.activeIcon"
        >
          <span>{{item.title}}</span>
        </side-item>-->
        <Sides v-for="item of menuList" :key="item.id" :item="item"></Sides>
      </SideBar>
      <!-- </el-scrollbar> -->

      <article>
        <transition name="slide">
          <keep-alive v-if="$route.meta.isKeepAlive">
            <router-view/>
          </keep-alive>
          <router-view v-else/>
        </transition>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SideItem from "./components/SideBar/SideItem";
import Sides from "./components/SideBar/Sides";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["menuList", "isKeepAlive"])
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["searchLeftMenu"]),
    init() {
      this.searchLeftMenu();
    }
  },
  components: {
    NavBar,
    SideBar,
    SideItem,
    Sides
  }
};
</script>




<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.slide-enter {
  transform: translateX(40px);
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.5s ease;
}

#education_wrapper {
  height: 100%;
  overflow: hidden;
  @include scroll-bar;
  @include display($hor: space-between) {
    flex-direction: column;
  }
}

.education_container {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include display($hor: space-between);
  @include themify() {
    background-color: themed("laout-bgcolor");
  }

  // .scrollbar-wrapper {
  //   height: 100%;
  //   overflow-x: hidden!important;
  // }

  article {
    // flex: 1;
    width: calc(100vw - #{$side-width});
    height: 100%;
    padding-left: 15px;
    overflow: auto;
    @include scroll-bar;
  }
}
</style>
