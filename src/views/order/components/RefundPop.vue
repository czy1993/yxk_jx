<template>
  <div id="refund_pop" :class="themeName">
    <div class="refund_container">
      <ul>
        <li>
          剩余课时：
          <span>{{remainCourse}}</span>
        </li>
        <li>
          剩余费用：
          <span class="money">{{residueMoney.toFixed(2)}}元</span>
        </li>
      </ul>
      <div class="_input">
        <el-input @change="change" type="number" v-model="money" placeholder="请输入退款金额"></el-input>
      </div>
      <div class="_input">
        <el-input v-model="reason" placeholder="请输入退款原因"></el-input>
      </div>
      <footer>
        <button @click="submit">发起退款</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import bus from '@/utils/bus';
export default {
  props: ["orderNo", "remainCourse", "residueMoney"],
  data() {
    return {
      money: "",
      reason: ""
    };
  },
  methods: {
    ...mapActions("order", ["orderRefund"]),
    submit() {
      if (!this.money) {
        this.$message.error({
          message: "请输入退款金额"
        });
      } else if (!this.reason) {
        this.$message.error({
          message: "请输入退款原因"
        });
      } else {
        this.orderRefund({
          orderNo: this.orderNo,
          refundCause: this.reason,
          refundMoney: this.money
        }).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message: "退款成功！",
              duration: 1500,
              onClose: () => {
                bus.$emit("initOrder");
              }
            });
          }
        });
      }
    },
    change(val) {
      if (val > this.residueMoney) {
        this.money = this.residueMoney.toFixed(2);
      }
      if (val < 0) {
        this.money = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#refund_pop {
  padding: 40px;
}
.refund_container {
  & > ul {
    @include display(space-between);
    li {
      .money {
        @include themify() {
          color: themed("money-color");
        }
      }
    }
  }
  ._input {
    margin: 20px 0;
  }
  footer {
    button {
      @include buttonColor($type: "ge") {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
