<template>
  <div id="agency_introduction">
    <div class="introduction_container">
      <div class="main">
        <h2 ref="name" :contenteditable="isEdite">{{name}}</h2>
        <!-- <img :src="describesImg" alt> -->
        <div class="_troduction">
          <div v-show="!isEdite" v-html="describes"></div>
          <div v-show="isEdite" id="_edit"></div>
          <div class="_btn">
            <div v-if="!isEdite">
              <button @click="revise">修改</button>
            </div>

            <div v-else>
              <button @click="submit">提交</button>
              <button class="cancel_btn" @click="isEdite=false">取消</button>
            </div>
          </div>
          <div class="add_logo">
            <el-upload
              :action="uploadUrl"
              accept="image/*"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :headers="upLoadheader"
              :on-error="onError"
              :show-file-list="false"
            >
              <div class="_upload"></div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/utils/env";
import { getToken, getAccountInfo } from "@/utils/auth";
import { mapState, mapActions } from "vuex";
const Editor = require("wangeditor");
export default {
  data() {
    return {
      upLoadheader: {},
      uploadUrl: "",
      editor: "",
      isEdite: false,
      name: "",
      describes: "",
      describesImg: "",
      logo: "",
      type:'1'//1是上传图片，2是编辑
    };
  },
  computed: {
    ...mapState("agency", ["agencyMessage"])
  },
  mounted() {
    this.initUpload();
    this.initEditor();
    this.initTroduction();
  },
  methods: {
    ...mapActions("agency", ["queryAgency", "editMyAgency"]),
    //初始化富文本编辑器
    initEditor() {
      this.editor = new Editor("#_edit");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "image",
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "table", // 表格
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.customConfig.uploadImgServer = this.uploadUrl;
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
      this.editor.customConfig.uploadImgMaxLength = 1;
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgHeaders = {
        token: getToken()
      };
      this.editor.customConfig.uploadImgTimeout = 5000;
      this.editor.customConfig.uploadImgHooks = {
        error: function(xhr, editor) {
          this.$message.error({
            message: "图片上传出错，请稍后再试！",
            duration: 2000
          });
        },
        customInsert: function(insertImg, result, editor) {
          let url = result.data.host + result.data.url;
          console.log(result.data);
          this.describesImg = result.data.url;
          insertImg(url);
        },
        timeout: function(xhr, editor) {
          this.$message.error({
            message: "图片上传超时",
            duration: 2000
          });
        }
      };
      this.editor.create();
    },
    initTroduction() {
      return new Promise(resolve => {
        this.queryAgency(`agencyId=${getAccountInfo().agencyId}`).then(() => {
          this.name = this.agencyMessage.name;
          this.describes = this.agencyMessage.describes;
          this.describesImg = this.agencyMessage.describesImg;
          this.logo = this.agencyMessage.logo;
          resolve();
        });
      });
    },
    //修改
    revise() {
      this.editor.txt.html(this.describes);
      this.isEdite = true;
      Promise.resolve().then(() => this.$refs.name.focus());
    },
    submit() {
      this.type='2';
      this.describes = this.editor.txt.html();
      this.editMessage().then(() => {
        this.isEdite = false;
      });
    },
    editMessage() {
      return new Promise(resolve => {
        this.name = this.$refs.name.innerHTML;
        this.editMyAgency({
          describes: this.describes,
          name: this.name,
          id: getAccountInfo().agencyId,
          logo: this.logo,
          describesImg: this.describesImg
        }).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message:this.type==='1'?'机构logo上传成功！':"机构信息修改成功！",
              duration: 1000,
              onClose: () => {
                this.initTroduction().then(() => {
                  resolve();
                });
              }
            });
          }
        });
      });
    },
    initUpload() {
      this.upLoadheader = { token: getToken() };
      this.uploadUrl = baseUrl + "agency/front/system/uploadSingle/agency";
    },
    onError(err, file, fileList) {
      this.$message.error({
        message: "图片上传失败！"
      });
    },
    beforeUpload() {},
    handleSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.type='1';
        this.logo = response.data.url;
        this.editMessage();
      } else {
        this.$message.error({
          message: response.message,
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#agency_introduction {
  background-color: $view-bgcolor;
  padding-top: 20px;
  padding-bottom: 20px;
  //   overflow: hidden;
}

.introduction_container {
  width: 80%;
  //   height: 90%;

  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-left: 150px;
  position: relative;
  background: $view-container-bgcolor;
  .main {
    width: 80%;
    height: 90%;
    padding: 30px;
    // position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    margin: auto;
    h2 {
      text-align: center;
      padding: 15px;
      &:focus {
        border: 1px solid #dddddd;
      }
    }
    ._troduction {
      color: #757575;
      margin-top: 30px;
      ._btn {
        margin-top: 50px;
        text-align: center;
        margin-bottom: 30px;
        button {
          @include buttonColor("g") {
            width: 150px;
          }
        }
        button.cancel_btn {
          @include buttonColor("c") {
            width: 150px;
          }
        }
      }
      .add_logo {
        @include display(center);
        ._upload {
          width: 100px;
          height: 100px;
          //   margin-top: 30px;
          //   cursor: pointer;
          background: {
            image: url(../../../../static/img/agency/scxlogo.png);
            size: cover;
            repeat: no-repeat;
          }
          &:hover {
            background-image: url(../../../../static/img/agency/scxlogo2.png);
          }
        }
      }
    }
  }
}
</style>
