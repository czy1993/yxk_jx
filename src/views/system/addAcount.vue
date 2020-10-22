<template>
  <div id="addAcount" class="system_component">
    <div class="system_view">
      <!-- <EcRouterBack  routerName='system'  /> -->
      <h4>新建账号</h4>
      <div class="views">
        <span class="names">姓名</span>
        <el-input class="texts" v-model="name" placeholder="请输入姓名"></el-input>
      </div>
      <div class="views">
        <span class="names">手机号码</span>
        <el-input class="texts" v-model="phone" placeholder="请输入号码"></el-input>
        <p class="tips">初始密码均为123456,首次登陆均需要修改密码</p>
      </div>
      <div class="views">
        <span class="names">层级</span>
        <el-select v-model="levelDict" class="texts" placeholder="请选择层级">
          <el-option
            v-for="item in levelList"
            :key="item.levelDict"
            :label="item.levelName"
            :value="item.levelDict"
          ></el-option>
        </el-select>
      </div>
      <div class="buts" @click="save_addAccount()">提交</div>
    </div>
  </div>
</template>
<script>
import { addAccount } from "@/api/user.js";
import { mapState, mapActions } from "vuex";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { getAccountInfo } from "@/utils/auth";
export default {
  data() {
    return {
      name: "",
      phone: "",
      levelDict: "",
      agencyInfo: getAccountInfo()
    };
  },
  components: {
    EcRouterBack
  },
  computed: {
    ...mapState(["levelList"])
  },
  created() {
    this.initLevel();
  },
  methods: {
    ...mapActions(["searchLevel"]),
    // 新增账号
    save_addAccount() {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.name == "" || this.phone == "" || this.levelDict == "") {
        this.$message.error("请完整填写信息");
      } else if (!myreg.test(this.phone)) {
        this.$message.error("请按正确格式填写手机号");
      } else {
        addAccount({
          name: this.name,
          phone: this.phone,
          levelDict: this.levelDict
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: "新增成功",
              type: "success",
              onClose: () => {
                this.reset();
              }
            });
          }
        });
      }
    },
    // 查询层级
    initLevel() {
      console.log(this.agencyInfo.agencyId);
      this.searchLevel(`/${this.agencyInfo.agencyId}`);
    },
    reset() {
      this.name = "";
      this.phone = "";
      this.levelDict = "";
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
</style>