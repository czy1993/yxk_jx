<template>
  <div id="course_detai">
    <div class="detai_container">
      <div class="detail_main">
        <ul>
          <li>
            <span>课程名称：</span>
            {{courseDetails.name}}
          </li>
          <li>
            <ul class="item">
              <li>
                <span>科目：</span>
                {{courseDetails.otherSubject?courseDetails.otherSubject:courseDetails.subject}}
              </li>
              <li>
                <span>学习阶段：</span>
                {{courseDetails.teachAreas}}
              </li>
              <li>
                <span>开课时间：</span>
                {{courseDetails.startTime}}
              </li>
            </ul>
          </li>
          <li>
            <span>报名截止时间：</span>
            {{courseDetails.endTime}}
          </li>
          <li>
            <ul class="item">
              <li v-for="(item,index) of courseDetails.teacherList" :key="index">
                <span>教师{{index+1}}：</span>
                {{item.teacherName}}
                {{item.courseNum+'课时'}}
              </li>
            </ul>
          </li>
          <li>
            <span>合计：</span>
            {{sumCourseNum+'课时'}}
          </li>
          <li>
            <span>上课地址：</span>
            {{address}}
          </li>
          <li>
            <span>报名上限：</span>
            {{courseDetails.maxNumber+'人'}}
          </li>
          <li>
            <ul>
              <li v-for="(item,index) of activityList" :key="index">
                <span>活动{{index+1}}：{{item.name}}</span>
              </li>
            </ul>
          </li>
          <li v-if="courseDetails&&courseDetails.couponList.length>0">
            <ul>
              <li v-for="(item,index) of courseDetails.couponList" :key="item.couponId">
                <span>优惠券{{index+1}}：{{item.couponText}}</span>
              </li>
            </ul>
          </li>
          <li
            v-for="(item,index) of courseDetails.fileList"
            :key="index"
            class="_logo"
          >
          <img :src="item.path" alt=""></li>
          <li>
            <span>标准价格：</span>
            {{courseDetails.price+'元'}}
          </li>
          <li>
            <span>服务电话：</span>
            {{courseDetails.phone}}
          </li>
          <li>
            <span>课程介绍：</span>
            <p v-html="courseDetails.describes"></p>
          </li>
        </ul>
      </div>
      <footer>
        <button v-show="courseDetails.status==='1'" @click="continueEdit">继续编辑</button>
        <button v-show="courseDetails.status==='1'" @click="up('2')">上架</button>
        <ec-button v-show="showCancel" @click.native="cancel">取消</ec-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { city_list, country_list } from "@/utils/area";
import EcButton from "@/components/EducationButton";
export default {
  data() {
    return {
      cancelShow: false,
      showCancel: true
    };
  },
  computed: {
    ...mapState("course", ["courseDetails"]),
    //总课时
    sumCourseNum() {
      if (this.courseDetails.teacherList) {
        return this.courseDetails.teacherList.reduce((acc, cur) => {
          return acc + cur.courseNum;
        }, 0);
      }
    },
    //活动列表
    activityList() {
      let arr = [];
      for (let key of Object.keys(this.courseDetails)) {
        switch (key) {
          case "specialPrice":
            if (this.courseDetails[key]) {
              arr.push({
                name: "特价" + this.courseDetails[key] + "元"
              });
            }
            break;
          case "uniteCourseId":
            if (this.courseDetails[key]) {
              arr.push({
                name:
                  "联报" +
                  this.courseDetails["uniteCourseName"] +
                  " " +
                  this.courseDetails.uniteCoursePrice +
                  "元"
              });
            }
            break;
          case "couponId":
            if (this.courseDetails[key]) {
              arr.push({
                name: "优惠券" + this.courseDetails[key]
              });
            }
            break;
          default:
            break;
        }
      }
      return arr;
    },
    address() {
      return (
        city_list[this.courseDetails.city] +
        " " +
        country_list[this.courseDetails.area] +
        " " +
        this.courseDetails.address
      );
    }
    // showCancel() {
    //   return this.$route.matched[0].redirect === "/course";
    // }
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    ...mapActions("course", ["queryCourseDetails", "updateStatus"]),
    ...mapMutations("course", [
      "SET_COUPON_SHOW",
      "SET_AGAIN_EDIT",
      "SET_COURSE_ID"
    ]),
    init() {
      if (!this.$route.query.courseId) {
        this.$message.error({
          message: "未传入课程id",
          duration: 2000,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      } else {
        this.queryCourseDetails(`id=${this.$route.query.courseId}`);
      }
    },
    //继续编辑
    continueEdit() {
      // this.SET_COUPON_SHOW(true);
      this.SET_AGAIN_EDIT(true);
      this.SET_COURSE_ID(this.$route.query.courseId);
      this.$router.push("/addCourse");
    },
    up(status) {
      this.updateStatus(
        `courseIds=${this.$route.query.courseId}&status=${status}`
      ).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "上架成功！",
            type: "success",
            duration: 2 * 1000,
            onClose: () => {
              this.SET_AGAIN_EDIT(false);
              this.$router.push("/course");
            }
          });
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  components: {
    EcButton
  },
  watch: {
    $route(val, oldVal) {
      if (oldVal.name == "course") {
        this.showCancel = true;
      } else {
        this.showCancel = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#course_detai {
  width: 78%;
  height: calc(100% - 100px);
  margin-top: 20px;
  margin-left: 80px;
  border: 1px solid #e7edeb;
  border-radius: 5px;
  font-size: $font-size;
  overflow: hidden;
}
.detai_container {
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 15px;
  height: 100%;
  overflow: auto;
  @include scroll-bar;
  @include themify() {
    background-color: themed("add-course-bgcolor");
  }
  .detail_main {
    width: 70%;
    margin: auto;
    & > ul {
      & > li {
        margin-bottom: 30px;
        & > ul > li {
          margin-bottom: 30px;
        }
      }
    }
    .item {
      li {
        margin-right: 50px;
        margin-bottom: 0;
      }
      @include display() {
        flex-wrap: wrap;
      }
    }
    ._logo {
      width: 100%;
      // height: 350px;
      background: {
        // image: url(../../../static/img/_logo.png);
        size:100% ;
        repeat:no-repeat
      }
      img{
        width: 100%;
      }
    }
    li {
      color: #767676;
    }

    span {
      font-weight: 600;
      color: #272727;
    }
  }
  footer {
    position: fixed;
    bottom: 20px;
    left: 40%;
    & > button:nth-child(1) {
      @include buttonColor("g");
    }
    & > button:nth-child(2) {
      @include buttonColor("c");
    }
  }
}
</style>
