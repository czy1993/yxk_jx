<template>
  <div id="extension" class="education_views">
    <div class="education_header">
      <ec-button class="header-buts" @click.native="showEdite=true">新增推广</ec-button>
    </div>
    <div class="education_centont" v-if="extensionData.length>0">
      <div class="extension-view" v-for="(item,index) in extensionData" :key="index">
        <!-- <img :src="item.image" alt=""> -->
        <div class="_img">
          <img :src="item.image" alt>
        </div>
        <h3>{{item.title}}</h3>
      </div>
    </div>
    <div class="no_data" v-else>
      <i class="iconfont icon-zanwujilu"></i>
      <p>暂无广告</p>
    </div>

    <ec-dialog v-model="showEdite">
      <SetExtension :isReset="showEdite" @put="onChild"/>
    </ec-dialog>
  </div>
</template>
<script>
import EcButton from "@/components/EducationButton";
import { adverts } from "@/api/marketing.js";
import SetExtension from "./extension-set";
import EcDialog from "../../components/EducationDialog";
export default {
  components: {
    EcButton,
    SetExtension,
    EcDialog
  },
  data() {
    return {
      extensionData: [],
      showEdite: false
    };
  },
  created() {
    this.save_adverts();
  },
  methods: {
    save_adverts() {
      adverts().then(res => {
        this.extensionData = res.data;
      });
    },
    onChild(e) {
      this.showEdite = false;
      this.save_adverts();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";

#extension {
  position: relative;
  .no_data {
    text-align: center;
      color:#9c9e9d;
      margin-top: 40px;
    .icon-zanwujilu {
      font-size: 200px; 
    }
  }
}
.education_centont {
  padding: 20px 30px;
  @include display(space-around) {
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .extension-view {
    margin-bottom: 20px;
    position: relative;
    margin-right: 15px;
    top: 0;
    // @include unitBlockHover;
    ._img {
      width: 1000px;
      // height: 400px;
      // overflow: hidden;
      transition: all 0.3s;
      // cursor: pointer;
      img {
        max-width: 100%;
        // height: 100%;
        // height: 200px;
        transition: all 0.3s;
      }
    }
    h3 {
      margin-top: 20px;
    }
  }
}
</style>