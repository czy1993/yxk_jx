<template>
  <div id="jurisdiction" class="system_component">
    <div class="system_view">
      <!-- <EcRouterBack routerName="system"/> -->
      <h4>权限设置</h4>
      <div class="views">
        <span class="names">层级</span>
        <el-select v-model="levelDict" class="texts" @change="levelDictChange" placeholder="请选择">
          <!-- <el-option label="请选择" value key></el-option> -->
          <el-option label="新增层级" value="new" key="new"></el-option>
          <el-option
            v-for="item in levelList"
            :key="item.levelDict"
            :label="item.levelName"
            :value="item.levelDict+'-'+item.levelName"
          ></el-option>
        </el-select>
      </div>
      <div class="views" v-show="show2">
        <span class="names">层级名称</span>
        <el-input class="texts" v-model="newlevelName" placeholder="请输入层级名称"></el-input>
      </div>
      <div class="views">
        <span class="names">管理权限</span>
        <el-cascader
          ref="cascader"
          class="texts"
          :options="alllevelList"
          :props="{ multiple: true, checkStrictly: true,children:'children',label:'title',value:'id',emitPath:false }"
          filterable
          :show-all-levels="false"
          @change="jurisdictionChange"
          v-model="jurisdiction"
        >
          <template slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
          </template>
        </el-cascader>
      </div>
      <div class="views"></div>
      <div class="buts" @click="set_levelUpdate()">设置完成</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations,mapActions } from "vuex";
import { levelList, levelUpdate, levelAdd } from "@/api/user.js";
import Utils from "@/utils/deep.js";
import { getAccountInfo } from "@/utils/auth.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
export default {
  data() {
    return {
      show2: false,
      options: [],
      alllevelList: [],
      levelDict: "",
      levelName: "",
      newlevelName: "",
      value: "",
      jurisdiction: [],
      menus: [],
      accountInfo: getAccountInfo()
    };
  },
  components: {
    EcRouterBack
  },
  computed: {
    ...mapState(["levelList"])
  },
  created() {
    this.save_levelList();

    this.save_searchLevel();
  },
  methods: {
    ...mapActions(["searchLevel"]),
    ...mapMutations(["Save_searchList", "SAVE_about"]),
    levelDictChange(value) {
      console.log(value);
      this.jurisdiction = [];
      if (this.levelDict != "") {
        if (this.levelDict == "new") {
          this.show2 = true;
        } else {
          this.show2 = false;
          this.levelName = this.levelDict.split("-")[1];
          this.save_levelList();
        }
      }
    },
    save_levelList() {
      levelList(`?levelDict=${this.levelDict.split("-")[0]}`).then(res => {
        if (res.code == 200) {
          if (this.levelDict == "") {
            this.alllevelList = res.data;
          } else {
            this.jurisdiction = Utils.getId(res.data, []);

            console.log(this.jurisdiction);
          }
        }
      });
    },
    save_searchLevel() {
      this.searchLevel(`/${this.accountInfo.agencyId}`)
    },

    //
    set_levelUpdate() {
      let nodeList = this.$refs.cascader.getCheckedNodes();
      let menuIds = [];

      for (let node of nodeList) {
        let idArr = node.data.parentIds
          .split(",")
          .map(id => {
            return Number(id);
          })
          .filter(id => {
            return id !== 0 && id !== -1;
          });

        menuIds = Array.from(new Set(menuIds.concat([...idArr, node.data.id])));
      }

      // let menus = [];
      // if (this.jurisdiction.length == 1 && this.jurisdiction[0].length > 0) {
      //   menus.push(this.jurisdiction[0][this.jurisdiction[0].length - 1]);
      // } else {
      //   menus = Utils.uniq(this.jurisdiction);
      // }
      let data = {
        level: {
          agencyId: this.accountInfo.agencyId,
          levelDict:
            this.levelDict == "new" ? "" : this.levelDict.split("-")[0],
          levelName:
            this.levelDict == "new" ? this.newlevelName : this.levelName
        },
        menus: menuIds
      };
      if (this.levelDict === "new") {
        // 新增层级
        levelAdd(data).then(res => {
          this.mess(res);
        });
      } else {
        // 修改层级
        levelUpdate(data).then(res => {
          this.mess(res);
        });
      }
    },
    mess(res) {
      if (res.code == 200) {
        this.$message({
          message: "设置成功",
          type: "success",
          onClose: () => {
            this.levelDict = "";
            this.jurisdiction = [];
            this.show2 = false;
            this.save_searchLevel();
          }
        });
      } else {
        this.$message(res.message);
      }
    },
    jurisdictionChange(value) {
      console.log(value);
      // console.log(this.jurisdiction)
      // console.log(Utils.uniq(this.jurisdiction))
    },
    arrpeed(arr) {
      let data = Utils.deepCopy(arr);
    },
    traverse(obj) {
      for (var a in obj) {
        if (typeof obj[a] == "object") {
          this.traverse(obj[a]); //递归遍历
        } else {
        }
      }
    }
  }
};
</script>
