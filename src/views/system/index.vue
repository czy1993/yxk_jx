<template>
  <div id="education_system" class="education_views" ref="container">
    <div class="education_header" ref="top">
      <!-- <ec-button class="header-buts" @click.native="$router.push('/addAcount')">新增账号+</ec-button>
      <ec-button class="header-buts" @click.native="$router.push('/jurisdiction')">权限设置</ec-button>
      <ec-button class="header-buts" @click.native="$router.push('/changePassword')">修改密码</ec-button>-->
    </div>
    <div>
      <div class="account_view">
        <EcTable :tableData="tableData" :height="height">
          <el-table-column prop="id" label="序号">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="账号（手机号）">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织结构层">
            <template slot-scope="scope">
              <span v-if="scope.row.cjShow === false">{{transformName(scope.row.levelDict)}}</span>
              <el-select
                v-else
                v-model="scope.row.levelDict"
                @change="save_changeLevel"
                class="texts"
                placeholder="层级"
              >
                <el-option
                  v-for="item in levelList"
                  :key="item.levelDict"
                  :label="item.levelName"
                  :value="item.levelDict"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <img
                class="imgs"
                v-on:mouseover="changeActive('button_bianji',scope.row.id)"
                v-on:mouseout="removeActive('button_bianji',scope.row.id)"
                @click="operation('cjShow',scope.row)"
                :src="require('../../../static/img/system/button_bianji'+(scope.row.bianji==true?'2':'1')+'.png')"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column prop="date" label="设置" width="120">
            <template slot-scope="scope">
              <span class="blues" @click="pop_Show('重置密码',scope.row)">重置密码</span>
            </template>
          </el-table-column>
          <el-table-column label="删除" width="100">
            <template slot-scope="scope">
              <img
                class="imgs"
                v-on:mouseover="changeActive('button_shanchu',scope.row.id)"
                v-on:mouseout="removeActive('button_shanchu',scope.row.id)"
                @click="pop_Show('删除账号',scope.row)"
                :src="require('../../../static/img/system/button_shanchu'+(scope.row.sahnchu==true?'2':'1')+'.png')"
                alt
              >
            </template>
          </el-table-column>
        </EcTable>
      </div>
    </div>
    <div class="foot" ref="footer">
      <div>
        <ec-pagination
          v-show="total>10"
          :total="total"
          :currentPage="currentPage"
          @size-change="handleSizeChange($event)"
          @current-change="handleCurrentChange($event)"
        ></ec-pagination>
      </div>
      <div>
        <span class="about" @click="toPath()">关于平台</span>
        <span>{{`客户客服电话: ${phone}`}}</span>
      </div>
    </div>
    <Popup v-show="popShow" @event1="get_types($event)">
      <div slot="texts">{{`是否${popText}？`}}</div>
      <div slot="buttom">
        <span class="yeller" @click="popShow=false">否</span>
        <span @click="sure()">是</span>
      </div>
    </Popup>
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import EcPagination from "@/components/EducationPagination";
import {
  accountList,
  searchLevel,
  deleteUser,
  resetPass,
  changeLevel
} from "@/api/user.js";
import { mapState, mapMutations, mapActions } from "vuex";
import Utils from "@/utils/deep.js";
import Popup from "@/components/Popup";
import { getAccountInfo } from "@/utils/auth.js";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      popShow: false,
      total: 0,
      currentPage: 1,
      levelDict: "",
      phone: "",
      popText: "重置密码",
      userInfo: null,
      username: "",
      account: getAccountInfo(),
      height: "100px"
    };
  },
  components: {
    EcButton,
    EcTable,
    Popup,
    EcPagination
  },
  computed: {
    ...mapState(["accountInfo", "levelList", "about"])
  },
  created() {
    this.save_accountList(this.page, this.pageSize);
    this.save_searchLevel();
    this.save_systemAbout();
    this.initTableHeight();
  },
  mounted() {
    this.initTableHeight();
    window.addEventListener("resize", this.initTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initTableHeight);
  },
  methods: {
    ...mapMutations(["SAVE_about"]),
    ...mapActions(["searchLevel"]),
    ...mapActions("user", ["systemAbout"]),
    save_accountList(page, pageSize) {
      accountList(
        `?agencyId=${this.account.agencyId}&current=${page}&size=${pageSize}`
      ).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.tableData.forEach((item, index) => {
            item.bianji = false;
            item.sahnchu = false;
            item.cjShow = false;
          });
          // console.log(this.tableData)
        }
      });
    },
    initTableHeight() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.top.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight - 75 + "px";
      });
    },
    changeActive(name, id) {
      this.tableData = this.arrForeach(name, id);
    },
    removeActive(name, id) {
      this.tableData = this.arrForeach(name, id);
    },
    operation(name, data) {
      this.tableData = this.arrForeach(name, data.id);
      this.username = data.phone;
    },
    arrForeach(name, id) {
      let arr = Utils.deepCopy(this.tableData);
      arr.forEach((item, index) => {
        if (id === item.id) {
          if (name == "button_bianji") {
            item.bianji = !item.bianji;
          } else if (name == "button_shanchu") {
            item.sahnchu = !item.sahnchu;
          } else if (name == "cjShow") {
            item.cjShow = !item.cjShow;
          }
        }
      });
      return arr;
    },
    save_searchLevel() {
      // searchLevel(`/${this.account.agencyId}`).then(res => {
      //   if (res.code == 200) {
      //     this.Save_searchList(res.data);
      //   }
      // });

      this.searchLevel(`/${this.account.agencyId}`);
    },
    // 删除账号
    save_deleteUser(data) {
      deleteUser(`?id=${data.id}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.popShow = false;
          this.save_accountList(this.page, this.pageSize);
        }
      });
    },
    // 重置密码
    save_resetPass(data) {
      // console.log(data)
      resetPass(`?username=${data.phone}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "重置密码成功",
            type: "success"
          });
          this.popShow = false;
          // this.save_accountList();
        }
      });
    },
    // 修改用户层级
    save_changeLevel(selVel) {
      // console.log(selVel)
      changeLevel(`?username=${this.username}&levelDict=${selVel}`).then(
        res => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success",
              onClose: () => {
                this.save_accountList(this.page, this.pageSize);
              }
            });
          }
        }
      );
    },
    // agencyIdChange(selVel){
    //     this.save_changeLevel()
    // },
    get_types(type) {
      this.popShow = type;
    },
    handleSizeChange(e) {
      this.pageSize = e;
      this.save_accountList(this.page, this.pageSize);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.save_accountList(this.page, this.pageSize);
    },
    save_systemAbout() {
      this.systemAbout().then(res => {
        if (res.code == 200) {
          this.SAVE_about(res.data);
          this.phone = this.getPhone(res.data);
        }
      });
    },
    getPhone(arr) {
     return  arr.find(item => {
        return item.confId === "tel_phone";
      }).confValue
    },
    toPath() {
      this.$router.push({ name: "about" });
    },
    pop_Show(name, userInfo) {
      this.popShow = true;
      this.popText = name;
      this.userInfo = userInfo;
    },
    sure() {
      if (this.popText == "重置密码") {
        this.save_resetPass(this.userInfo);
      } else {
        this.save_deleteUser(this.userInfo);
      }
    },
    transformName(id) {
      return this.levelList.find(item => {
        return id == item.levelDict;
      }).levelName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_system {
  .header {
    display: flex;
    align-items: center;
    padding-left: 30px;
    margin-bottom: 20px;
    .header-buts {
      margin: 0 20px;
    }
  }
  .account_view {
    // width: 1075px;
    // margin: 0 auto;
    // border: 1px solid #e8eae9;
    // border-bottom: 0;
  }
  .imgs {
    height: 30px;
    cursor: pointer;
  }
  .blues {
    @include themify() {
      color: themed("title-active");
      cursor: pointer;
    }
  }
  .noData {
    text-align: center;
    line-height: 150px;
  }
  .foot {
    // width: 1075px;
    // height: 70px;
    // margin-bottom: 40px;
    box-sizing: border-box;
    padding-right: 15px;
    padding-top: 20px;
    // margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6c6e6d;
    .about {
      @include themify() {
        color: themed("title-active");
        cursor: pointer;
      }
      text-decoration: underline;
      margin: 0 20px;
      font-size: 17px;
    }
  }
}
</style>
