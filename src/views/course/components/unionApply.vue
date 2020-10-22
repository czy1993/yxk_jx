<template>
  <div id="unionApply" :class="themeName">
    <div class="apply_container">
      <div>
        <!-- <el-input v-model="courseName" placeholder="请输入联报课程名称"></el-input> -->
        <el-select v-model="id" placeholder="请选择联报课程">
          <el-option :label="'无'" :value="''"></el-option>
          <el-option v-for="item of unionCourse" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div>
        <el-input placeholder="联报课程价格" :disabled="true" :value="price"></el-input>
      </div>

      <footer>
        <button @click="submit">提交</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    courseId: [String, Number]
  },
  data() {
    return {
      id: ""
    };
  },
  created() {
 
  },
  mounted() {
    
    this.init();
  },
  computed: {
    ...mapState("course", ["unionCourse"]),
    price() {
      for (let course of this.unionCourse) {
        if (course.id === this.id) {
          return course.price + "元";
        }
      }
    }
  },
  methods: {
    ...mapActions("course", ["queryCourses"]),
    init() {
      this.queryCourses(`2`).then(() => {
        console.log(this.courseId);
        this.id =this.courseId==null?'': this.courseId;
      });
    },
    submit(){
      this.$emit('submit')
    }
  },
  watch: {
    id(val) {
      this.$emit("course-id", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.apply_container {
  padding: 40px;
  & > div:nth-child(1) {
    margin-bottom: 30px;
  }
  .el-select {
    width: 100%;
  }
  footer {
    margin-top: 30px;
    button {
      @include buttonColor("g") {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
