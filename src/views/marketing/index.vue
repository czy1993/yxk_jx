<template>
  <div id="education_marketing" class="education_views">
    <div class="education_header">
      <!-- <ec-button class="header-buts" @click.native="$router.push('/coupon')">优惠券管理</ec-button>
      <ec-button class="header-buts" @click.native="$router.push('/notice')">通知管理</ec-button>-->
      <!-- <ec-button class="header-buts" @click.native="$router.push('/extension')">营销推广</ec-button> -->
    </div>
    <div class="marketing_content education_centont">
      <div
        class="marketing_li"
        v-for="(item,index) in marketingList"
        :key="index"
        @click="lookCard(item)"
      >
        <img :src="item.image" alt>
        <!-- <img src="../../../static/img/marketing/guanggao4_1.png" alt> -->
      </div>
    </div>

    <footer>
      <ec-pagination
        :small="true"
        layout="prev, pager, next"
        :pagerCount="5"
        :total="total"
        :currentPage="currentPage"
        @current-change="currentChange"
      ></ec-pagination>
    </footer>

    <ec-dialog v-model="showDetail">
      <Activitycard @cancel="showDetail=false" :cardData="cardData"></Activitycard>
    </ec-dialog>

    <!-- <div v-else class="marketing_content education_centont">
      <Activitycard :cardData="cardData" @event1="change($event)"></Activitycard>
    </div>-->
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcPagination from "@/components/EducationPagination";
import Activitycard from "./activity-card";
import { queryActivity } from "@/api/marketing.js";
import { searchLevel } from "@/api/user.js";
import { mapState, mapMutations } from "vuex";
import { getAccountInfo } from "@/utils/auth.js";

import EcDialog from "@/components/EducationDialog";
export default {
  data() {
    return {
      marketingList: [],
      cardData: {},
      account: getAccountInfo(),
      currentPage: 1,
      total: 0,
      showDetail: false
    };
  },
  components: {
    EcButton,
    Activitycard,
    EcPagination,
    EcDialog
  },
  created() {
    this.save_queryActivity(1);
    // this.save_searchLevel();
  },
  methods: {
    save_queryActivity(page) {
      queryActivity(`?size=${10}&current=${page}`).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.marketingList = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    lookCard(data) {
      console.log(data);
      this.showDetail = true;
      this.cardData = data;
    },
    change(data) {
      this.show1 = data;
    },
    save_searchLevel() {
      searchLevel(`/${this.account.agencyId}`).then(res => {
        if (res.code == 200) {
          this.Save_searchList(res.data);
        }
      });
    },
    currentChange(page) {
      this.save_queryActivity(page);
      this.currentPage = page;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_marketing {
  position: relative;
  .marketing_content {
    // width: 1010px;
    margin: 0 auto;
    // overflow: auto;
    position: relative;
    @include scroll-bar;
    @include display(space-around) {
      flex-wrap: wrap;
    }
    .marketing_li {
      // float: left;
      height: 200px;
      flex-basis: 450px;
      padding: 20px;
      border: 1px solid #d8d8d8;
      border-radius: 8px;
      margin-bottom: 30px;
      @include unitBlockHover;
      img {
        height: 150px;
        width: 400px;
        cursor: pointer;
      }
    }
  }
  footer {
    margin-left: 130px;
  }
}
</style>
