<template>
  <div class="activity_card">
    <img :src="cardData.image" alt>
    <!-- <img src="../../../static/img/marketing/guanggao4_1.png" alt="" /> -->
    <ul class="content">
      <li class="blod">活动标题：{{cardData.title}}</li>
      <li>活动时间：{{cardData.startTime}} - {{cardData.endTime}}</li>
      <li>活动介绍：{{cardData.introduce}}</li>
      <li>活动内容：{{cardData.content}}</li>
      <li>活动玩法：{{cardData.playMethod}}</li>
      <li class="blod">活动奖励：{{cardData.award}}</li>
      <li class="blod">参与方式：{{cardData.participateMethod}}</li>
    </ul>

    <div class="footer">
      <span @click="save_joinActivity()">参与</span>
      <span @click="refuse()">拒绝</span>
    </div>
  </div>
</template>
<script>
import { joinActivity } from "@/api/marketing.js";
export default {
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },
  methods: {
    refuse() {
      this.$emit("cancel");
    },
    save_joinActivity() {
      joinActivity(`?activityId=${this.cardData.id}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "恭喜您，参与成功！",
            type: "success"
          });
          setTimeout(() => {
            this.refuse();
          }, 1500);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import  '@/styles/mixin.scss';
.activity_card {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 550px;
  padding: 20px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  @include unitBlockHover;
  img {
  margin-bottom: 30px;
    height: 180px;
    width: 100%;
  }
  .content {
    margin-bottom: 30px;
    .blod {
      font-weight: bold;
    }
    li{
        margin-bottom: 20px;
    }
  }

  .footer {
    // width: 36%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    span {
      width: 120px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      background: #ff9b56;
      border-radius: 2px;
      cursor: pointer;
      font-size: 15px;
      margin: 0 20px;
    }
    span:nth-child(2) {
      background: #00ae78;
    }
  }
}
</style>>