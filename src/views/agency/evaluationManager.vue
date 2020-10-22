<template>
  <div id="evaluation_manager">
    <div class="manager_container">
      <!-- <i @click="back" class="el-icon-back"></i> -->
      <div class="_main">
        <agency-evaluation :manage="true"></agency-evaluation>
      </div>
    </div>
  </div>
</template>

<script>
import AgencyEvaluation from "./components/AgencyEvaluation";
export default {
  components: {
    AgencyEvaluation
  },
  methods:{
    back(){
      this.$router.push('/agency')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#evaluation_manager {
  height: 100%;
  background: #fafefd;
  overflow: auto;
  @include scroll-bar;
}
.manager_container {
  height: 100%;
  margin: auto;
  position: relative;
  .el-icon-back{
    font-size: 30px;
    position: absolute;
    left:10px;
    top:20px;
    cursor: pointer;

  }
  ._main {
    // margin-left: 200px;
    padding-bottom: 20px;
  }
}
</style>
