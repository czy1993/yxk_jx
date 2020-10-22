<template>
  <div class="marketing-set">
    <div class="marketingSet-content">
      <!-- <EcRouterBack  routerName='marketing'  /> -->
      <h4>{{title}}</h4>
      <div class="marketingSet-form">
        <div class="form-views">
          <span class="form-name">通知标题</span>
          <el-input class="form-value form-input" v-model="formData.title" placeholder="请输入内容"></el-input>
        </div>
        <div class="form-views">
          <span class="form-name">通知范围</span>
          <el-select v-model="source" multiple placeholder="请选择层级">
            <el-option :label="'学员'" :value="'学员'"></el-option>
            <el-option
              v-for="(item,index) in searchList"
              :key="index"
              :label="item.levelName"
              :value="item.levelDict"
            ></el-option>
          </el-select>
        </div>
        <div class="form-views">
          <span class="form-name">通知内容</span>
          <el-input
            class="form-value"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            :rows="2"
            placeholder="请输入内容"
            v-model="formData.content"
          ></el-input>
        </div>
      </div>
      <div class="buts" @click="set_setNotice()">发布</div>
    </div>
  </div>
</template>
<script>
import { setNotice } from "@/api/marketing.js";
import { mapState } from "vuex";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { deepCopy } from "@/utils";

export default {
  props: {
    dataObj: {
      type: Object,
      required: true
    },
    title: String,
    searchList: Array
  },
  components: {
    EcRouterBack
  },
  data() {
    return {
      formData: {
        title: "",
        content: "",
        // source: [],
        id: "",
        levelDict: []
      },
      source: []
    };
  },
  created() {},
  computed: {},
  watch: {
    dataObj: {
      handler() {
        this.source = this.dataObj.area
          .split(",")
          .map(id => {
            return Number(id);
          })
          .filter(id => {
            return !!id;
          });
        this.formData = deepCopy(this.dataObj);
      },
      deep: true
    }
  },
  methods: {
    set_setNotice() {
      setNotice({
        area: this.source.join(","),
        content: this.formData.content,
        id: this.formData.id,
        launchChannel: "",
        publishTime: "",
        title: this.formData.title
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "发布成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.$emit("publish");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-views {
  width: 600px;
  min-height: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  .form-name {
    width: 180px;
    margin-right: 20px;
    line-height: 30px;
    text-align: right;
  }
  .form-value {
    width: 400px;
  }
  .form-input {
    width: 260px;
  }
}
</style>