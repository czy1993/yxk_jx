<template>
  <div id="education_input" :class="themeName">
    <div class="ec_input_container">
      <el-input @change="search" :type="type" @input="_input" v-model="input" :placeholder="placeholder">
        <template v-slot:suffix>
          <i   @click="search" class="iconfont icon-sousuo"></i>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "ec_input",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    _input(value) {
      this.$emit("input", value);
    },
    search(){
      this.$emit('search',this.input)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_input {
  width: 280px;
  display: inline-block;
}
.ec_input_container {
  width: 100%;
  .el-input,
  .el-textarea {
    .el-input__inner,
    .el-textarea__inner {
      &:focus {
        @include themify() {
          border-color: themed("title-active");
        }
      }
      i {
        display: inline-block;
        height: 100%;
      }
    }
    .el-input__suffix {
      width: 30px;
      cursor: pointer;
      @include display($hor: center);
      .icon-sousuo {
        @include themify() {
          color: themed("title-active");
        }
      }
    }
  }
}
</style>
