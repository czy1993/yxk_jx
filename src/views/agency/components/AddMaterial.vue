<template>
  <div id="add_material">
    <div class="_main">
      <el-upload
        :action="uploadUrl"
        accept="image/*"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :headers="upLoadheader"
        :on-error="onError"
        :show-file-list="false"
      >
        <div
          :style="{'background-image':`url(${bgImage})`}"
          class="_add_bg_image"
        >{{bgImage?'':'点击添加封面图'}}</div>
      </el-upload>
      <h2 ref="title" :contenteditable="focus" class="_title">标题</h2>
      <div id="_addedit"></div>
      <footer>
        <button @click="submit">提交</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/utils/env";
import { getToken, getAccountInfo } from "@/utils/auth";
import { timeFormate } from "@/utils";
import { mapState, mapActions } from "vuex";
const Editor = require("wangeditor");
export default {
  props: ["focus", "type", "data"],
  data() {
    return {
      uploadUrl: "",
      editor: "",
      upLoadheader: "",
      bgImage: "",
      describes: "",
      imageUrl: "",
      title: ""
    };
  },
  created() {
    this.initUpload();
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    ...mapActions("agency", ["addOrEditImage", "queryMaterialDetail"]),
    //初始化富文本编辑器
    initEditor() {
      this.editor = new Editor("#_addedit");
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
    initData() {
      if (this.type === "edit") {
        this.bgImage = this.data.image;
        this.imageUrl = this.data.image;
        this.$refs.title.innerHTML = this.data.title;
        this.editor.txt.html(this.data.describes);
        this.$nextTick(() => {
          this.$refs.title.focus();
        });
      }
    },
    initFocus() {
      Promise.resolve().then(() => this.$refs.title.focus());
    },
    initUpload() {
      this.upLoadheader = { token: getToken() };
      this.uploadUrl = baseUrl + "agency/front/system/uploadSingle/agency";
    },
    beforeUpload() {},
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.$message.success({
        message: "封面图上传成功！",
        duration: 2000,
        onClose: () => {
          this.bgImage = response.data.host + response.data.url;
          this.imageUrl = response.data.url;
        }
      });
    },
    onError() {
      this.$message.error({
        message: err
      });
    },
    submit() {
      this.describes = this.editor.txt.text();
      if (!this.describes) {
        this.$message.error({
          message: "请输入相关描述"
        });
        return;
      }
      let data;

      if (this.type === "add") {
        data = {
          agencyId: getAccountInfo().agencyId,
          createLcu: getAccountInfo().id,
          describes: this.editor.txt.html(),
          image: this.imageUrl,
          title: this.$refs.title.innerHTML,
          status: "1"
        };
      } else if (this.type === "edit") {
        data = {
          agencyId: getAccountInfo().agencyId,
          describes: this.editor.txt.html(),
          id: this.data.id,
          image: this.imageUrl,
          title: this.$refs.title.innerHTML,
          status: "1"
        };
      }

      this.addOrEditImage(data).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: this.type === "add" ? "素材上传成功！" : "素材修改成功！",
            onClose: () => {
              this.bgImage = "";
              this.imageUrl = "";
              this.editor.txt.html("");
              this.$refs.title.innerHTML = "标题";
              this.$emit("closeDialog");
            }
          });
        }
      });
    }
  },
  watch: {
    focus(val) {
      if (val) {
        this.initData();
        this.$nextTick(() => {
          this.$refs.title.focus();
        });
      } else {
        if (this.type === "edit") {
          this.bgImage = "";
          this.imageUrl = "";
          this.editor.txt.html("");
          this.$refs.title.innerHTML = "标题";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#add_material {
  ._main {
    width: 70%;
    min-width: 700px;
    margin: auto;
    margin-top: 20px;
    & > div:not(#_addedit) {
      @include display(center);
    }
    ._add_bg_image {
      width: 500px;
      height: 200px;
      border: 1px solid #b1b1b1;
      cursor: pointer;
      margin: auto;
      @include display(center);
      margin-bottom: 30px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .el-icon-plus {
        font-size: 100px;
        color: #c6c6c6;
      }
    }
    ._title {
      text-align: center;
      padding: 10px;
      margin-bottom: 10px;
    }
    footer {
      margin-top: 30px;
      button {
        @include buttonColor("g") {
          width: 150px;
          display: block;
          margin: auto;
        }
      }
    }
  }
}
</style>
