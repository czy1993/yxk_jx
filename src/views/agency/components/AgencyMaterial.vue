<template>
  <div id="agency_material">
    <ec-dialog v-model="showDialog">
      <add-material :data="obj" :type="type" :focus="showDialog" @closeDialog="close"></add-material>
    </ec-dialog>

    <ec-dialog v-model="showDetail">
      <material-detail :show="showDetail" :id="id"></material-detail>
    </ec-dialog>

    <div class="material_container">
      <h2>我的素材</h2>
      <div class="_main">
        <ul class="material_list">
          <li @click="showContent(item)" class="_unit" v-for="item of materialList" :key="item.id">
            <div class="_img">
              <img :src="item.image" alt>
            </div>
            <h3>{{item.title}}</h3>
            <p class="_color">{{item.createLcuName}}</p>
            <span class="_color">{{item.createTime}}</span>
            <ul class="_bottom">
              <li :class="`status_${item.status}`">{{status[item.status]}}</li>
              <li>
                <span
                  v-show="item.status==='3'"
                  @click.stop.prevent="editImage(item)"
                  class="_edit"
                >编辑</span>
                <span @click.stop="deleteImage(item.id)" class="_delete">删除</span>
              </li>
            </ul>
          </li>
          <li @click="showDialog=true;type='add'" class="_add">
            <i class="el-icon-plus"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAccountInfo } from "@/utils/auth";
import { mapState, mapActions } from "vuex";
import EcDialog from "../../../components/EducationDialog";
import AddMaterial from "./AddMaterial.vue";
import MaterialDetail from "./MaterialDetail.vue";
export default {
  data() {
    return {
      showDialog: false,
      status: {
        "1": "已提交",
        "2": "审核通过",
        "3": "审核失败"
      },
      type: "add",
      showDetail: false,
      id: "",
      obj: ""
    };
  },
  computed: {
    ...mapState("agency", ["materialList"])
  },
  created() {
    this.initMaterial();
  },
  methods: {
    ...mapActions("agency", ["queryImageList", "delImage"]),
    initMaterial() {
      this.queryImageList(`agencyId=${getAccountInfo().agencyId}`);
    },
    close() {
      this.showDialog = false;
      this.initMaterial();
    },
    showContent(obj) {
      this.id = obj.id;
      this.showDetail = true;
    },
    deleteImage(id) {
      this.$confirm("此操作将永久删除该素材, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delImage(`id=${id}`).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功！",
                duration: 2000,
                onClose: () => {
                  this.initMaterial();
                }
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editImage(obj) {
      this.obj = obj;
      this.showDialog = true;
      this.type = "edit";
    }
  },
  components: {
    EcDialog,
    AddMaterial,
    MaterialDetail
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

$color: #757575;
.material_container {
  width: 80%;
  margin-left: 150px;
  border-top: 1px solid #c2c2c2;
  padding-top: 30px;
  margin-top: 30px;
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  ._main {
    padding: 20px 30px;
    .material_list {
      @include display(space-between) {
        flex-wrap: wrap;
      }
      ._unit {
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 10px;
        transition: all 0.6s;
        position: relative;
        top: 0;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover {
          top: -10px;
          box-shadow: 1px 1px 9px 1px rgb(172, 172, 172);
          & img {
            transform: scale(1.2);
          }
        }
        ._img {
          width: 500px;
          height: 200px;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
          img {
            width: 500px;
            height: 200px;
            transition: all 0.3s;
          }
        }
        ._color {
          color: $color;
        }
        h3,
        p,
        span {
          display: block;
          margin: 15px 0;
        }
        ._bottom {
          @include display(space-between);
          li {
            @include display();
            color: $color;

            .el-icon-star-on {
              font-size: 24px;
            }
            .el-icon-s-flag {
              font-size: 20px;
              margin-left: 10px;
            }
            ._edit {
              color: #00ae78;
              margin-right: 20px;
            }
            ._delete {
              color: #0f80ff;
            }
          }
          @each $key, $val in ("1": #0f80ff, "2": #00ae78, "3": red) {
            .status_#{$key} {
              color: $val;
            }
          }
        }
      }
      ._add {
        flex-basis: 400px;
        height: 200px;
        border: 1px solid #b1b1b1;
        cursor: pointer;
        @include display(center);
        .el-icon-plus {
          font-size: 100px;
          color: #c6c6c6;
        }
      }
    }
  }
}
</style>
