<template>
  <div id="education_navbar" :class="themeName">
    <div class="navbar_container">
      <section class="_left">
        <div class="_logo">
          <img :src="agencyMessage.logo" alt>
          <el-popover
            placement="top-start"
            title="机构名称："
            width="200"
            trigger="hover"
            :content="agencyMessage.name"
          >
            <h1 class="_name" slot="reference">{{agencyMessage.name}}</h1>
          </el-popover>
        </div>
        <div class="_title">{{title}}</div>
      </section>
      <div class="_right">
        <div class="them_color">
          主题色：
          <span @click="selectTheme('green')" class="select_color" :value="'green'">
            <i class="el-icon-check" v-show="themeType==='green'"></i>
          </span>
          <span @click="selectTheme('black')" class="select_color" :value="'black'">
            <i v-show="themeType==='black'" class="el-icon-check"></i>
          </span>
        </div>
        <div class="_center">
          <span>个人中心</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <ul class="_drop_menu">
            <li>{{name}}</li>
            <li @click="logout">退出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken, getAccountInfo, removeAccountInfo } from "@/utils/auth";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: getAccountInfo().name
    };
  },
  created() {
    this.initMessage();
  },
  computed: {
    ...mapState("agency", ["agencyMessage"]),
    ...mapState(["title"])
  },
  methods: {
    ...mapActions("agency", ["queryAgency"]),
    ...mapMutations("theme", ["SELECT_THEMETYPE"]),
    initMessage() {
      this.queryAgency(`agencyId=${getAccountInfo().agencyId}`);
    },
    logout() {
      removeToken().then(() => {
        removeAccountInfo().then(res => {
          this.$router.push("/form/login");
        });
      });
    },
    selectTheme(type) {
      this.SELECT_THEMETYPE(type);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

$tab-width: 132px;
$nav-height: 58px;

#education_navbar {
  width: 100%;
}
.navbar_container {
  height: $nav-height;
  padding: 0 50px;
  width: 100%;
  @include display($hor: space-between);
  @include themify() {
    background-color: themed("header-bg");
  }
  ._left {
    @include display;
    height: 100%;
    // width: $side-width - 50px;
    ._logo {
      @include display;
      width: $side-width - 50px;
      cursor: pointer;
      img {
        width: 50px;
      }
      h1 {
        width: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 10px;
        color: #fff;
        font-size: $font-size;
      }
    }
  }
  ._right {
    height: 100%;
    @include display;
    color: #fff;
    .them_color {
      @include display;
      .select_color {
        // display: block;
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-radius: 2px;
        margin: 0 5px;
        @include display(center);
        cursor: pointer;
        &:nth-child(1) {
          background: #45d9a6;
        }
        &:nth-child(2) {
          background: #1e2a36;
        }
        i {
          font-size: 20px;
          color: #fff;
        }
      }
    }

    ._center {
      width: $tab-width;
      height: 100%;

      font-size: $font-size;
      position: relative;
      @include display($hor: center);
      cursor: pointer;
      transition: all 0.3s;
      i {
        color: #fff;
      }
      .name {
        width: 100px;
      }
      &:hover {
        @include themify() {
          background-color: themed("title-active");
        }
        ._drop_menu {
          display: block;
        }
      }
      ._drop_menu {
        display: none;
        position: absolute;
        top: 100%;
        width: 100%;
        height: 100%;
        z-index: 1111111;

        font-size: $font-size;
        transition: all 0.3s;
        li {
          width: 100%;
          height: 100%;
          color: #9e9e9e;
          transition: all 0.3s;
          background: $dropMenu_bgcolor;
          @include display($hor: center);
          &:hover {
            @include themify() {
              background-color: themed("title-active");
              color: #fff;
            }
          }
        }
      }
    }
  }
  ._title {
    width: $tab-width;
    height: 100%;
    margin-right: 60px;
    font-size: $font-size;
    @include themify() {
      background-color: themed("title-active");
    }
    @include display($hor: center);
    color: #fff;
  }
}
</style>
