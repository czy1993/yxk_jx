<template>
  <div id="forms" class="login-form">
    <div class="form-group login-form-item">
      <input
        required="required"
        class="form-control"
        ref="user"
        autocomplete="off"
        v-model="username"
      >
      <label :class="['form-label', userReg===true?'red':'' ]">手机号/邮箱</label>
    </div>
    <div class="form-group login-form-item">
      <input
        type="password"
        required="required"
        class="form-control"
        v-model="password"
        autocomplete="new-password"
      >
      <label :class="['form-label', passReg===true?'red':'' ]">密码 6-16位 数字或字母</label>
    </div>
    <div class="text-right">
      <router-link to="/form/retrieve">忘记密码</router-link>
    </div>
    <div class="login-form-btn" @click="setLogin()">登录</div>
  </div>
</template>
<script>
import { login } from "../../api/user";
import { mapState, mapMutations } from "vuex";
import { setToken, setAccountInfo } from "@/utils/auth.js";
export default {
  data() {
    return {
      password: "",
      username: "",
      userReg: false,
      passReg: false
    };
  },
  created() {
    // console.log(login)
  },
  methods: {
    ...mapMutations(["SAVE_accountInfo"]),
    setLogin() {
      if (this.password === "" && this.username === "") {
        this.$message.error("账号密码不能为空");
        this.passReg = true;
        this.userReg = true;
        setTimeout(() => {
          this.passReg = false;
          this.userReg = false;
        }, 2500);
      } else if (this.username === "") {
        this.$message.error("账号不能为空");
        this.userReg = true;
        setTimeout(() => {
          this.userReg = false;
        }, 2500);
      } else if (this.password === "") {
        this.$message.error("密码不能为空");
        this.passReg = true;
        setTimeout(() => {
          this.passReg = false;
        }, 2500);
      } else if (this.userReg === true || this.passReg === true) {
        this.$message.error("请填写正确格式的账号和密码");
      } else {
        login({
          password: this.$md5(this.password),
          username: this.username
        }).then(res => {
          if (res.code == 200) {
            setAccountInfo(res.data);
            setToken(res.data.token);
            this.SAVE_accountInfo(res.data);
            if (!res.data.firstLogin) {
              return this.$message.success({
                message: "首次登录，请修改密码！",
                duration: 1 * 2000,
                onClose: () => {
                  this.$router.push({
                    path: "/form/change-password"
                  });
                }
              });
            }

            this.$message({
              message: "登录成功",
              type: "success",
              duration: 1 * 1000,
              onClose: () => {
                this.$router.push("/");
              }
            });
          }
        });
      }
    }
  },
  watch: {
    username(value) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      const emailreg = new RegExp(
        "^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$"
      );
      if (!myreg.test(value) && !emailreg.test(value) && value != "") {
        if (value == "admin") {
          this.userReg = false;
        } else {
          this.userReg = true;
        }
      } else {
        this.userReg = false;
      }
    },
    password(value) {
      // const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      const passreg = /^[0-9A-Za-z]{6,16}$/;
      if (!passreg.test(value) && value != "") {
        this.passReg = true;
      } else {
        this.passReg = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.login-form {
  label {
    font-weight: initial;
  }
  .text-right {
    position: absolute;
    width: 246px;
    top: 105px;
    z-index: 2;
    margin-top: 16px;
    text-align: right;
    font-size: 14px;
    a {
      color: rgb(70, 70, 70);
    }
    a:hover {
      color: rgb(22, 200, 153);
    }
  }
  .login-form-btn {
    cursor: pointer;
    // line-height: 49px;
    // margin-top: 40px;
    // font-size: 18px;
    // font-weight: bold;
    // text-align: center;
    // // width: 339px;
    // height: 49px;
    // color: #fff;
    // background-color: #ff9b55;
    // border-radius: 5px;
    @include themify() {
      background-color: themed("login-btn");
    }

    transition: all 0.2s;
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>