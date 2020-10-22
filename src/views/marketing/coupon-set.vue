<template>
  <div class="marketing-set">
    <div class="marketingSet-content">
      <!-- <EcRouterBack routerName="marketing"/> -->
      <h4>优惠券设定</h4>
      <div class="marketingSet-form">
        <div class="form-view">
          <div class="form-view-v">
            <span class="form-name">类型</span>
            <div class="form-inputs">
              <el-select v-model="types">
                <el-option value label="选择类型"></el-option>
                <el-option value="1" label="满减"></el-option>
                <el-option value="2" label="折扣"></el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="form-view-v">
            <span class="form-name">叠加使用</span>
            <div class="form-inputs">
              <el-select v-model="superposition">
                <el-option value label="是/否"></el-option>
                <el-option value="1" label="是"></el-option>
                <el-option value="2" label="否"></el-option>
              </el-select>
            </div>
          </div> -->
        </div>
        <div class="form-view">
          <div class="form-view-v">
            <span class="form-name">满减</span>
            <div class="form-inputs">
              <el-input-number
                v-model="satisfyPrice"
                type="number"
                :disabled="types=='1'?false:true"
                :min="subtractPrice"
                placeholder="1000"
                size="small"
                controls-position="right"
              ></el-input-number>
              <span>-</span>
              <el-input-number
                v-model="subtractPrice"
                size="small"
                type="number"
                :disabled="types=='1'?false:true"
                :max="satisfyPrice"
                :min="0"
                placeholder="200"
                controls-position="right"
              ></el-input-number>
            </div>
          </div>
          <div class="form-view-v">
            <span class="form-name">折扣</span>
            <div class="form-inputs">
              <el-input-number
                v-model="discoutTen"
                size="small"
                type="number"
                :disabled="types=='2'?false:true"
                :max="9.9"
                :min="0"
                placeholder
                controls-position="right"
              ></el-input-number>
              <!-- <span></span>
              <el-input v-model="discoutBit" type="number" :disabled="types=='2'?false:true" min="0" placeholder></el-input>-->
              <span>折</span>
            </div>
          </div>
        </div>
        <div class="form-view">
          <div class="form-view-v">
            <span class="form-name">数量</span>
            <div class="form-inputs">
              <el-input-number v-model="couponNum" step-strictly :min="1" class="from-nums"></el-input-number>
            </div>
          </div>
          <div class="form-view-v">
            <span class="form-name">过期时间</span>
            <div class="form-inputs">
              <el-date-picker
                v-model="expireDay"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
              <el-time-picker v-model="expireTime" value-format="HH:mm:ss" placeholder="任意时间点"></el-time-picker>
            </div>
          </div>
        </div>
        <div class="form-view">
          <div class="form-view-v">
            <span class="form-name">使用范围</span>
            <div class="form-inputs">
              <el-select v-model="areaIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in coursesData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <div class="buts" @click="form_verification()">确认</div>
    </div>
    <Popup v-show="show1" @event1="get_types($event)">
      <div slot="texts">
        <p>
          <span>类型:</span>
          <span>{{types=='1'?'满减':'折扣'}}</span>
        </p>
        <!-- <p>
          <span>叠加使用:</span>
          <span>{{superposition=='1'?'是':'否'}}</span>
        </p> -->
        <p v-if="types=='1'">{{`满${satisfyPrice}-${subtractPrice}`}}</p>
        <p v-else>{{`折扣：${discoutTen}折`}}</p>
        <p>
          <span>过期时间:</span>
          <span>{{this.expireDay+' '+this.expireTime}}</span>
        </p>
        <p>
          <span>使用范围:</span>
          <span>{{transformStatus(areaIds)}}</span>
        </p>
      </div>
      <div slot="buttom">
        <span @click="save_setCoupon()">发布</span>
      </div>
    </Popup>
  </div>
</template>
<script>
import { setCoupon, queryCourses } from "@/api/marketing";
import Popup from "@/components/Popup";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
export default {
  props:['isReset'],
  data() {
    return {
      types: "",
      superposition: "2",
      subtractPrice: 0,
      satisfyPrice: 0,
      areaIds: [],
      couponNum: 0,
      expireTime: "",
      expireDay: "",
      discoutTen: 0,
      discoutBit: 0,
      show1: false,
      coursesData: []
    };
  },
  components: {
    Popup,
    EcRouterBack
  },
  created() {
    this.save_queryCourses();
    this.reset()
  },
  methods: {
    save_queryCourses() {
      queryCourses("1").then(res => {
        // console.log( res);
        if (res.code == 200) {
          this.coursesData = res.data;
        }
      });
    },
    form_verification() {
      if (this.types == "") {
        this.$message.error("请选择优惠券类型");
      } else if (this.types == "1") {
        if (
          this.satisfyPrice == "" ||
          this.subtractPrice == "" ||
          this.expireDay == "" ||
          this.couponNum == 0 ||
          this.expireTime == ""
        ) {
          this.$message.error("请填写完整的优惠券信息");
        } else {
          this.show1 = true;
        }
      } else if (this.types == "2") {
        if (
          this.discoutTen == "" ||
          this.expireDay == "" ||
          this.couponNum == 0 ||
          this.expireTime == ""
        ) {
          this.$message.error("请填写完整的优惠券信息");
        } else {
          this.show1 = true;
        }
      }
    },
    save_setCoupon() {
      setCoupon({
        areaIds: this.areaIds.join(","), //使用范围 true	string
        couponNum: this.couponNum, //数量 true integer(int32)
        discout: Number(this.discoutTen), //折扣, 优惠券类型为折扣时必填 false number(double)
        expireTime: this.expireDay + " " + this.expireTime, // 过期时间 true string(date-time)
        satisfyPrice: Number(this.satisfyPrice), //满足金额, 优惠券类型为满减时必填	false number
        subtractPrice: Number(this.subtractPrice), // 满减金额, 优惠券类型为满减时必填 false number
        superposition: this.superposition, // 是否叠加 1-是 2-否 true string
        type: this.types // 优惠券类型 1-满减 2-折扣	true string
      }).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "设定成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.show1 = false;
              this.reset();
              this.$emit("event1", false);
            }
          });
        }
      });
    },
    get_types(data) {
      this.show1 = data;
    },
    discountChange(val) {
      if (val < 0) {
        this.discoutTen = 0;
      } else if (val > 10) {
        this.discoutTen = 9.9;
      }
    },
    transformStatus(statusArr) {
      return statusArr
        .reduce((acc, cur) => {
          acc.push(
            this.coursesData.find(item => {
              return item.id == cur;
            }).name
          );
          return acc;
        }, [])
        .join(",");
    },
    reset() {
      this.types = "";
      this.superposition = "2";
      this.satisfyPrice = 0;
      this.discoutTen = 0;
      this.couponNum = 0;
      this.expireDay = "";
      this.areaIds = [];
      this.expireTime=''
    }
  },
  watch:{
    isReset(val){
      val&&this.reset()
    }
  }
};
</script>
<style lang="scss" scoped>
.marketing-set {
  .form-view {
    margin-bottom: 20px;
    width: 800px;
    overflow: hidden;
    //   padding-left:150px ;
    .form-view-v {
      float: left;
      width: 50%;
      display: flex;
      margin-bottom: 15px;
      .form-name {
        width: 70px;
        text-align: justify;
        text-align-last: justify;
        line-height: 36px;
        margin-right: 10px;
        font-size: 14px;
      }
      .form-inputs {
        flex: 1;
        display: flex;
        align-items: center;
        .el-input {
          width: 85px;
        }
        .el-select {
          // width: 170px;
        }
        .from-nums {
          width: 170px;
        }
        .el-date-editor {
          width: 140px;
          margin-right: 10px;
        }
        .el-date-editor--time {
          width: 120px;
        }
        span {
          margin: 0 7px;
          color: #a6a6a6;
        }
      }
    }
    .form-view-v:nth-child(2) {
      width: 50%;
    }
  }
  .form-view:nth-child(5) {
    margin-bottom: 60px;
    .form-view-v:nth-child(2) {
      visibility: hidden;
    }
  }
}
</style>