<template>
  <div class="retrieve">
    <div class="form-group login-form-item">
      <input required="required" class="form-control" ref="user" autocomplete="off" v-model="phone" />
      <label :class="['form-label',, userReg===true?'red':'' ]">手机号/邮箱</label>
    </div>
    <div class="form-group login-form-item">
      <input
        type="password"
        required="required"
        class="form-control"
        autocomplete="new-password"
        v-model="code"
        maxlength="6"
        minlength="6"
      />

      <label :class="['form-label', codeReg===true?'red':'' ]">请输入6位验证码</label>
      <span class="form-getcode" @click="save_sendVerifyCode()">{{butMes}}</span>
    </div>
    <div class="form-group login-form-item">
      <input
        type="password"
        required="required"
        class="form-control"
        autocomplete="new-password"
        v-model="newPass"
      />
      <label :class="['form-label', passReg===true?'red':'' ]">密码 8-16位 数字或加大小写字母</label>
    </div>
    <div class="form-group login-form-item">
      <input
        type="password"
        required="required"
        class="form-control"
        autocomplete="new-password"
        v-model="newPassII"
      />
      <label :class="['form-label',passIIReg===true?'red':'' ]">{{confirmPassword}}</label>
    </div>
    <div class="login-form-btn" @click="save_forgetPassReset()">提交</div>
  </div>
</template>
<script>
import { sendVerifyCode, forgetPassReset } from '@/api/user.js'
export default {
  data() {
    return {
      phone: '',
      code: '',
      newPass: '',
      newPassII: '',

      confirmPassword: '确认密码',
      butMes:"获取验证码",
      userReg: false,
      codeReg: false,
      passReg: false,
      passIIReg: false
    }
  },
  methods: {
    //  校验手机号
    save_sendVerifyCode() {
      if (this.phone == '') {
        this.$message.error('请输入手机号码')
        this.$refs.user.focus()
      } else {
        sendVerifyCode(`?phone=${this.phone}`).then(res => {
          if( res.code == 200){
            this.$notify({
              title: '验证码已发送',
              message: '验证码已发送验证码至-'+this.phone+'请注意查收，验证码五分钟内有效',
              type: 'success',
              duration: 0
            });
            this.butMes = '已发送'
          }
        })
      }
    },
    // 修改密码
    save_forgetPassReset() {
      if (this.phone == '' || this.code == '' || this.newPass == '') {
        this.$message.error('请填写完整的信息再行操作')
      } else if (this.passReg == true || this.newPass == '') {
        this.$message.error('密码 8-16位 数字或加大小写字母')
        this.passReg = false
      } else {
        forgetPassReset({
          code: this.code,
          id: '',
          newPass: this.$md5(this.newPass),
          oldPass: '',
          username: this.phone
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '密码重置成功,请重新登录',
              type: 'success',
              onClose: () => {
                this.$router.go(-1)
              }
            })
            
          } else {
            this.$message.error(res.message)
          }
        })
      }
    }
  },
  watch: {
    phone(value) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      const emailreg = new RegExp(
        '^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$'
      )
      if (!myreg.test(value) && !emailreg.test(value) && value != '') {
        this.userReg = true
      } else {
        this.userReg = false
      }
    },
    code(value) {
      const codereg = /^[0-9]{6}$/
      if (!codereg.test(value) && value != '') {
        this.codeReg = true
      } else {
        this.codeReg = false
      }
    },
    newPass(value) {
      const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
      if (!passreg.test(value) && value != '') {
        this.passReg = true
      } else {
        this.passReg = false
      }
    },
    newPassII(value) {
      if (value != this.newPass) {
        this.confirmPassword = '两次密码输入保持一致'
        this.passIIReg = true
      } else {
        this.passIIReg = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.retrieve {
  font-size: 12px;
  .form-group {
    margin-top: 10px;
    position: relative;
    .form-getcode {
      position: absolute;
      top: 0px;
      right: 0;
      display: block;
      width: 80px;
      height: 24px;
      box-sizing: border-box;
      color: #0006ff;
      cursor: pointer;
      z-index: 3;
      font-size: 13px;
      text-align: center;
      line-height: 20px;
      border: 1px solid #fff;
      border-radius: 3px;
    }
    .form-getcode:hover {
      border: 1px solid #16c899;
      background: #16c899;
      color: #fff;
    }
  }
  .form-label {
    font-weight: 500;
    font-size: 13px;
  }
  .form-control {
    height: 30px;
  }
  .login-form-btn {
    background: #16c899;
    font-size: 13px;
  }
}
</style>