webpackJsonp([22],{BZCd:function(e,s){},SWYo:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=t("vMJZ"),a={data:function(){return{phone:"",code:"",newPass:"",newPassII:"",confirmPassword:"确认密码",butMes:"获取验证码",userReg:!1,codeReg:!1,passReg:!1,passIIReg:!1}},methods:{save_sendVerifyCode:function(){var e=this;""==this.phone?(this.$message.error("请输入手机号码"),this.$refs.user.focus()):Object(o.n)("?phone="+this.phone).then(function(s){200==s.code&&(e.$notify({title:"验证码已发送",message:"验证码已发送验证码至-"+e.phone+"请注意查收，验证码五分钟内有效",type:"success",duration:0}),e.butMes="已发送")})},save_forgetPassReset:function(){var e=this;""==this.phone||""==this.code||""==this.newPass?this.$message.error("请填写完整的信息再行操作"):1==this.passReg||""==this.newPass?(this.$message.error("密码 8-16位 数字或加大小写字母"),this.passReg=!1):Object(o.e)({code:this.code,id:"",newPass:this.$md5(this.newPass),oldPass:"",username:this.phone}).then(function(s){200==s.code?e.$message({message:"密码重置成功,请重新登录",type:"success",onClose:function(){e.$router.go(-1)}}):e.$message.error(s.message)})}},watch:{phone:function(e){var s=new RegExp("^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$");/^[1][3,4,5,7,8,9][0-9]{9}$/.test(e)||s.test(e)||""==e?this.userReg=!1:this.userReg=!0},code:function(e){/^[0-9]{6}$/.test(e)||""==e?this.codeReg=!1:this.codeReg=!0},newPass:function(e){/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(e)||""==e?this.passReg=!1:this.passReg=!0},newPassII:function(e){e!=this.newPass?(this.confirmPassword="两次密码输入保持一致",this.passIIReg=!0):this.passIIReg=!1}}},r={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"retrieve"},[t("div",{staticClass:"form-group login-form-item"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],ref:"user",staticClass:"form-control",attrs:{required:"required",autocomplete:"off"},domProps:{value:e.phone},on:{input:function(s){s.target.composing||(e.phone=s.target.value)}}}),e._v(" "),t("label",{class:["form-label",,!0===e.userReg?"red":""]},[e._v("手机号/邮箱")])]),e._v(" "),t("div",{staticClass:"form-group login-form-item"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"form-control",attrs:{type:"password",required:"required",autocomplete:"new-password",maxlength:"6",minlength:"6"},domProps:{value:e.code},on:{input:function(s){s.target.composing||(e.code=s.target.value)}}}),e._v(" "),t("label",{class:["form-label",!0===e.codeReg?"red":""]},[e._v("请输入6位验证码")]),e._v(" "),t("span",{staticClass:"form-getcode",on:{click:function(s){return e.save_sendVerifyCode()}}},[e._v(e._s(e.butMes))])]),e._v(" "),t("div",{staticClass:"form-group login-form-item"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPass,expression:"newPass"}],staticClass:"form-control",attrs:{type:"password",required:"required",autocomplete:"new-password"},domProps:{value:e.newPass},on:{input:function(s){s.target.composing||(e.newPass=s.target.value)}}}),e._v(" "),t("label",{class:["form-label",!0===e.passReg?"red":""]},[e._v("密码 8-16位 数字或加大小写字母")])]),e._v(" "),t("div",{staticClass:"form-group login-form-item"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPassII,expression:"newPassII"}],staticClass:"form-control",attrs:{type:"password",required:"required",autocomplete:"new-password"},domProps:{value:e.newPassII},on:{input:function(s){s.target.composing||(e.newPassII=s.target.value)}}}),e._v(" "),t("label",{class:["form-label",!0===e.passIIReg?"red":""]},[e._v(e._s(e.confirmPassword))])]),e._v(" "),t("div",{staticClass:"login-form-btn",on:{click:function(s){return e.save_forgetPassReset()}}},[e._v("提交")])])},staticRenderFns:[]};var n=t("C7Lr")(a,r,!1,function(e){t("BZCd")},"data-v-63fcb874",null);s.default=n.exports}});
//# sourceMappingURL=22.b0add1eaeed29a8ba33f.js.map