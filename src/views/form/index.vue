<template>
  <div id="education_login" :class="themeName">
    <section class="login-main clearfix">
      <div class="bg"></div>
      <div class="login-section">
        <div class="logon-tab clearfix">
          <router-link to="/form/login" class="logon-tab-item bt-line">{{tilName}}</router-link>
          <!-- <router-link to="/form/register" class="logon-tab-item bt-line">注册</router-link> -->
        </div>
        <div class="login-center">
          <router-view></router-view>
        </div>
        <img class="dl_kuang" src="../../assets/dl_kuang.png" alt>
      </div>
    </section>
  </div>
</template>
<script>
import Login from "./login-form";
export default {
  data() {
    return {
      tilName: "登录",
      titleType: {
        login: "登录",
        retrieve: "找回密码",
        changePassword:'修改密码'
      }
    };
  },
  created() {
    this.initTitle(this.$route.name);
  },
  components: {
    Login
  },
  methods: {
    initTitle(RouteName) {
      this.tilName= this.titleType[RouteName];
    }
  },
  watch: {
    $route(to, from) {
      this.initTitle(to.name);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_login {
  // width: 100%;
  width: 980px;
  min-width: 980px;
  height: 100%;
  margin: 0 auto;
}
.login-main {
  height: 100%;

  .bg,
  .login-section {
    float: left;
    position: relative;
    top: 50%;
  }
  .bg {
    width: 537px;
    height: 585px; //背景图按原图缩小1.5倍
    // background-image: url(../../assets/dl_logo.png);
    background-size: 100% 100%;
    margin-top: -293px;
    @include themify() {
      background-image: url(themed("login-bg"));
    }
  }

  .login-section {
    width: 300px;
    height: 320px;
    margin-top: -215px;
    padding: 20px 30px;
    // border: 1px solid #e0e2ef;
    margin-left: -38px;
    position: relative;
    .logon-tab {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
      height: 34px;
      line-height: 34px;
      z-index: 1;

      .logon-tab-item {
        display: block;
        width: 50%;
        margin: 0 auto;
        // float: left;
        text-align: center;
        font-family: Microsoft YaHei;
        // font-weight: bold;
        font-size: 16px;
        color: rgb(70, 70, 70);
        z-index: 1;
      }
      .logon-tab-item.router-link-exact-active.bt-line {
        font-weight: 700;
        z-index: 1;
        @include themify() {
          background: linear-gradient(
              themed("login-tab-color"),
              themed("login-tab-color")
            )
            no-repeat;
          color: themed("login-tab-color");
          background-position: center bottom;
          background-size: 56px 3px;
        }
      }
    }
    .login-center {
      position: absolute;
      top: 45px;
      left: 50%;
      width: 246px;
      margin-left: -124px;
      // left: 0;
      z-index: 1;
    }
    .dl_kuang {
      position: absolute;
      top: 0;
      left: 0;
      height: 590px;
    }
  }
}
</style>
