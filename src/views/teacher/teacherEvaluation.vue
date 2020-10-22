<template>
  <div id="education_teacher_evaluation">
    <div class="teacher_evaluation_container">
      <EcRouterBack routerName="teacher"/>
      <div class="evaluation_main">
        <h2>评价详情</h2>
        <div class="evaluation_container">
          <div class="_rate">
            <h3>{{$route.query.name}}老师</h3>
            <el-rate :value="avaLevel"  show-score disabled text-color="#ff9900"></el-rate>
            <ul class="evaluation_level">
              <li>
                <span>5星</span>
                <p :style="{width:starLevelList[4].cnt/starTotal*100+'%'}"></p>
                &nbsp;{{starLevelList[4].cnt}}
              </li>
              <li>
                <span>4星</span>
                <p :style="{width:starLevelList[3].cnt/starTotal*100+'%'}"></p>
                &nbsp;{{starLevelList[3].cnt}}
              </li>
              <li>
                <span>3星</span>
                <p :style="{width:starLevelList[2].cnt/starTotal*100+'%'}"></p>
                &nbsp;{{starLevelList[2].cnt}}
              </li>
              <li>
                <span>2星</span>
                <p :style="{width:starLevelList[1].cnt/starTotal*100+'%'}"></p>
                &nbsp;{{starLevelList[1].cnt}}
              </li>
              <li>
                <span>1星</span>
                <p :style="{width:starLevelList[0].cnt/starTotal*100+'%'}"></p>
                &nbsp;{{starLevelList[0].cnt}}
              </li>
            </ul>
          </div>
          <div class="_rate_meaasge">
            <div class="no_message" v-if="educationData.length==0">
              <img src="../../../static/img/no.png" alt>
              <p>暂无评论</p>
            </div>
            <div v-else>
              <rate-message
                :key="index"
                v-for="(item,index) in educationData"
                :rate="item.starLevel"
                :content="item.comment"
                :name="item.memberName"
                :icon="item.memberImage"
              >
                <template v-slot:right>
                  <span class="time">{{item.createTime}}</span>
                </template>
                <template v-slot:bottom>
                  <span>{{`来自：${item.courseName} 教师：${item.teacherName}`}}</span>
                </template>
              </rate-message>
              <footer v-show="total>0">
                <ec-pagination
                  :small="true"
                  layout="prev, pager, next"
                  :pagerCount="5"
                  :total="total"
                  :currentPage="currentPage"
                  @size-change="handleSizeChange($event)"
                  @current-change="handleCurrentChange($event)"
                ></ec-pagination>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RateMessage from "./components/RateMessage.vue";
import EcPagination from "@/components/EducationPagination";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { searchComment } from "@/api/teacher.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      rate: 1,
      currentPage: 1,
      size: 10,
      teacherId: "",
      searchType: "1", //排序 1：时间 2：最高 3：最低
      educationData: [],
      total: 1,
      starLevels: [
        {
          starLevel: "1",
          cnt: 0
        },
        {
          starLevel: "2",
          cnt: 0
        },
        {
          starLevel: "3",
          cnt: 0
        },
        {
          starLevel: "4",
          cnt: 0
        },
        {
          starLevel: "5",
          cnt: 0
        }
      ]
    };
  },
  computed: {
    ...mapState("teacher", ["starData"]),
    starLevelList() {
      for (let star1 of this.starLevels) {
        for (let star of this.starData) {
          if (star.starLevel === star1.starLevel) {
            Object.assign(star1, star);
          }
        }
      }
      return this.starLevels;
    },
    //总评论数
    starTotal() {
      if (this.starData.length > 0) {
        return this.starData.reduce((acc, cur) => {
          return acc + cur.cnt;
        }, 0);
      } else {
        return 0;
      }
    },
    //总星级数
    levelTotal() {
      if (this.starData.length > 0) {
        return this.starData.reduce((acc, cur) => {
          return acc + cur.cnt * cur.starLevel;
        }, 0);
      }
      return 0;
    },
    //平均星级
    avaLevel() {
      if (this.starTotal > 0) {
        return Number((this.levelTotal / this.starTotal).toFixed(1));
      } else {
        return 0;
      }
    }
  },
  created() {
    this.init();
    this.initStar();
    this.save_searchComment(this.currentPage, this.size);
       console.log(this.starTotal,this.starLevelList[4].cnt)
  },
  methods: {
    ...mapActions("teacher", ["searchStarCnt"]),
    init() {
      this.rate = Number(this.$route.query.rate);
      this.teacherId = this.$route.query.id;
    },
    initStar() {
      this.searchStarCnt(this.teacherId);
    },
    save_searchComment(current, size) {
      searchComment({
        current: current,
        searchType: "1",
        size: size,
        teacherId: this.teacherId
      }).then(res => {
        if (res.code == 200) {
          this.educationData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(e) {
      this.size = e;
      this.save_searchComment(this.currentPage, this.size);
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.save_searchComment(this.currentPage, this.size);
    }
  },
  components: {
    RateMessage,
    EcPagination,
    EcRouterBack
  }
};
</script>

<style lang="scss" >
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_teacher_evaluation {
  height: 100%;
  background-color: $view-bgcolor;
  overflow: hidden;
}

.teacher_evaluation_container {
  width: 80%;
  height: 100%;
  margin-top: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-left: 120px;
  position: relative;
  background: $view-container-bgcolor;

  .evaluation_main {
    width: 75%;
    height: 95%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding-bottom: 40px;
    position: relative;
    h2 {
      text-align: center;
      margin-bottom: 50px;
      padding-top: 30px;
    }
    .evaluation_container {
      height: 100%;
      @include display(space-between) {
        align-items: flex-start;
      }
      ._rate {
        width: 30%;
        .el-icon-star-on {
          font-size: 24px;
        }
        h3 {
          margin-bottom: 20px;
        }

        .evaluation_level {
          margin-top: 20px;
          li {
            width: 80%;
            color: rgb(117, 117, 117);
            @include display();
            margin-bottom: 10px;
            span {
              min-width: 30px;
            }
            p {
              background: #ffd698;
              // width: 150px;
              height: 25px;
              margin-left: 15px;
            }
          }
        }
      }
      ._rate_meaasge {
        width: 65%;
        height: 90%;
        overflow: auto;
        font-size: $font-size - 2px;
        padding-right: 7px;
        @include scroll-bar;
        .time {
          color: rgb(117, 117, 117);
        }
        .no_message {
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-content: center;
          img {
            width: 200px;
            margin: 60px auto 20px;
          }
          p {
            text-align: center;
            color: #757575;
          }
        }
      }
    }
    footer {
      width: 100%;
      @include display(flex-end);
      // position: absolute;
      // bottom: 0px;
      // right: 0;
      background: $view-container-bgcolor;
    }
  }
}
</style>
