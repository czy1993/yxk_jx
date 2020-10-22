<template>
  <div class="change_password">
    <span class="_tip">提示：密码为 6-16位 数字或字母</span>
    <div style="margin-top:10px" class="oldPasswordBlock form-group login-form-item">
      <input
        required="required"
        class="form-control"
        :type="showOldPassword?'text':'password'"
        autocomplete="off"
        v-model="oldPassword"
      >
      <label :class="['form-label', oldPasswordReg===true?'red':'' ]">请输入旧密码</label>
      <i
        @click="showOldPassword=!showOldPassword"
        v-if="showOldPassword"
        class="fa fa-eye"
        aria-hidden="true"
      ></i>
      <i
        @click="showOldPassword=!showOldPassword"
        v-else
        class="fa fa-eye-slash"
        aria-hidden="true"
      ></i>
    </div>
    <div class="oldPasswordBlock form-group login-form-item">
      <input
        :type="showNewPassword?'text':'password'"
        required="required"
        class="form-control"
        v-model="newPassword"
        autocomplete="new-password"
      >
      <label :class="['form-label', newPasswordReg===true?'red':'' ]">请输入新密码</label>
      <i
        @click="showNewPassword=!showNewPassword"
        v-if="showNewPassword"
        class="fa fa-eye"
        aria-hidden="true"
      ></i>
      <i
        @click="showNewPassword=!showNewPassword"
        v-else
        class="fa fa-eye-slash"
        aria-hidden="true"
      ></i>
    </div>

    <div class="oldPasswordBlock form-group login-form-item">
      <input
        :type="showConfirmPassword?'text':'password'"
        required="required"
        class="form-control"
        v-model="confirmPassword"
        autocomplete="new-password"
      >
      <label :class="['form-label', confirmPasswordReg===true?'red':'' ]">确认新密码</label>
      <i
        @click="showConfirmPassword=!showConfirmPassword"
        v-if="showConfirmPassword"
        class="fa fa-eye"
        aria-hidden="true"
      ></i>
      <i
        @click="showConfirmPassword=!showConfirmPassword"
        v-else
        class="fa fa-eye-slash"
        aria-hidden="true"
      ></i>
    </div>

    <div class="login-form-btn" @click="submit()">提交</div>
  </div>
</template>

<script>
import { updatePass, login } from "@/api/user";
import { getAccountInfo, setAccountInfo } from "@/utils/auth";
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      newPasswordReg: false,
      oldPasswordReg: false,
      confirmPasswordReg: false,
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      rules: {
        oldPassword: [
          { require: true, message: "旧密码不能为空!" },
          {
            validator: /^[0-9A-Za-z]{6,16}$/,
            message: "请填写正确格式的密码！"
          }
        ],
        newPassword: [
          { require: true, message: "新密码不能为空!" },
          {
            validator: /^[0-9A-Za-z]{6,16}$/,
            message: "请填写正确格式的密码！"
          }
        ],
        confirmPassword: [
          { require: true, message: "新密码不能为空!" },
          {
            validator: () => {
              return this.newPassword === this.confirmPassword;
            },
            message: "两次密码输入不一致!"
          }
        ]
      }
    };
  },
  methods: {
    validate() {
      this.reset();
      for (let rule of Object.keys(this.rules)) {
        for (let val of this.rules[rule]) {
          if (val.require && !this.$data[rule]) {
            this.$message.error(val.message);
            this[`${rule}Reg`] = true;
            return false;
          }

          if (typeof val.validator == "function") {
            if (!val.validator()) {
              this.$message.error(val.message);
              this[`${rule}Reg`] = true;
              return false;
            }
          } else if (val.validator) {
            if (!val.validator.test(this.$data[rule])) {
              this.$message.error(val.message);
              this[`${rule}Reg`] = true;
              return false;
            }
          }
        }
      }

      return true;
    },
    reset() {
      this.oldPasswordReg = false;
      this.newPasswordReg = false;
      this.confirmPasswordReg = false;
    },

    submit() {
      if (this.validate()) {
        updatePass({
          newPass: this.$md5(this.newPassword),
          oldPass: this.$md5(this.oldPassword)
        }).then(res => {
          if (res.code == 200) {
            this.$message.success({
              message: "密码修改成功，稍后为您跳转至首页！",
              onClose: () => {
                login({
                  password: this.$md5(this.newPassword),
                  username: getAccountInfo().phone
                }).then(res => {
                  if (res.code == 200) {
                    setAccountInfo(res.data);
                    this.$router.push("/");
                  }
                });
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.change_password {
  .oldPasswordBlock {
    position: relative;
    .fa {
      position: absolute;
      right: 0;
      top: 20%;
      cursor: pointer;
      z-index: 99;
    }
  }

  ._tip {
    font-size: 12px;
    color: #333;
  }
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
