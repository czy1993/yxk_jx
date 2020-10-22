<template>
  <div id="education_agency" :class="themeName">
    <div class="agency_container">
      <agency-introduction></agency-introduction>
      <agency-evaluation></agency-evaluation>
      <agency-material></agency-material>
    </div>
  </div>
</template>

<script>
import AgencyIntroduction from "./components/AgencyIntroduction";
import AgencyEvaluation from './components/AgencyEvaluation';
import AgencyMaterial from './components/AgencyMaterial';
export default {
  components: {
    AgencyIntroduction,
    AgencyEvaluation,
    AgencyMaterial
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_agency{
  height: 100%;
  position: relative;
}

.agency_container{
  height: 100%;
  overflow: auto;
  background: #fafefd;
  padding-bottom: 30px;
  @include scroll-bar;
}
</style>
