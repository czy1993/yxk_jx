<template>
  <div id="agency_evaluation">
    <div class="evaluation_container">
      <div class="_main">
        <div class="_rate_left" v-if="$route.name!=='evaluationManager'">
          <h3>全部评价</h3>
          <el-rate
            :score-template="String(avaLevel)"
            :value="Math.round(avaLevel)"
            disabled
            show-score
            text-color="#ff9900"
          ></el-rate>
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

        <div v-if="commentList.length>0" class="_rate_meaasge">
          <div class="_type_search">
            <el-select @change="changeType" v-model="evaluationType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <rate-message
            :key="item.id"
            v-for="item in commentList"
            :name="item.memberName"
            :rate="item.starLevel"
            :content="item.comment"
            :expand="mark.includes(item.id)"
            :icon="item.memberImage"
          >
            <template v-slot:right>
              <span class="time">{{item.createTime}}</span>
            </template>
            <template v-slot:bottom>
              <div class="_bottom">
                <p>
                  <span>来自：{{item.courseName}} &nbsp;&nbsp;&nbsp;教师：{{item.teacherName}}</span>
                </p>
                <p>
                  <span
                    v-show="manage&&sign!==item.id"
                    @click="_replyAction(item.id)"
                    class="_reply_btn"
                  >回复</span>
                  <span class="cancel" @click="sign=''" v-show="manage&&sign===item.id">取消</span>
                  <span v-show="item.sonCnt>0">
                    ({{item.sonCnt}}条回复)
                    <span
                      @click="queryDetail(item)"
                      class="_reply"
                    >{{!mark.includes(item.id)?'展开':'收缩'}}</span>
                  </span>
                </p>
              </div>
              <!-- 父评论回复文本框 -->
              <div v-if="manage&&sign===item.id" class="txtEdit">
                <div :ref="`input_${item.id}`" :contenteditable="true">
                  <button
                    class="_reply_tip"
                    tabindex="“-1”"
                    :contenteditable="false"
                  >{{'回复 '+item.memberName+":"}}</button>&nbsp;
                </div>
                <div class="_bottom">
                  <button @click="publish_reply(item)">发表</button>
                </div>
              </div>
            </template>
            <template v-slot:expand>
              <ul class="_children">
                <li v-for="(item,index) of messageChilds[item.id].records" :key="item.id">
                  <div class="_replay">
                    <div class="replay_content">
                      <span>
                        <i class="reply_sty">{{item.memberName||item.agencyName}}</i>&nbsp;&nbsp;回复：
                        <i class="reply_sty">{{item.replyMemberName}}</i>
                      </span>
                      <p>{{item.comment}}</p>
                    </div>
                    <span
                      v-show="item.isAgencyReply==='2'&&manage&&sign!==item.id"
                      class="_revise"
                      @click="revise(item.id)"
                    >修改</span>
                    <span
                      class="cancel"
                      @click="sign=''"
                      v-show="item.isAgencyReply==='2'&&manage&&sign===item.id"
                    >取消</span>

                    <span
                      v-show="item.isAgencyReply!=='2'&&manage&&sign!==item.id"
                      @click="_replyAction(item.id)"
                      class="_reply_btn"
                    >回复</span>
                    <span
                      class="cancel_reply"
                      @click="sign=''"
                      v-show="item.isAgencyReply!=='2'&&manage&&sign===item.id"
                    >取消</span>
                  </div>
                  <div class="_child_time">
                    <span>{{item.createTime}}</span>
                  </div>
                  <!-- 回复文本框 -->
                  <div v-if="item.isAgencyReply!=='2'&&manage&&sign===item.id" class="txtEdit">
                    <div :ref="`input_${item.id}`" :contenteditable="true">
                      <button
                        class="_reply_tip"
                        :contenteditable="false"
                      >{{'回复 '+item.memberName+":"}}</button>&nbsp;
                    </div>
                    <div class="_bottom">
                      <button @click="publish_reply_son(item)">发表</button>
                    </div>
                  </div>
                  <!-- 修改文本框 -->
                  <div v-if="item.isAgencyReply==='2'&&manage&&sign===item.id" class="txtEdit">
                    <div :ref="`input_${item.id}_revise`" :contenteditable="true">{{item.comment}}</div>
                    <div class="_bottom">
                      <button @click="publish_revise(item,index)">发表</button>
                    </div>
                  </div>
                </li>

                <footer v-show="messageChilds[item.id].total>10">
                  <ec-pagination
                    :small="true"
                    layout="prev, pager, next"
                    :pagerCount="5"
                    :total="messageChilds[item.id].total"
                    :currentPage="messageChilds[item.id].current"
                    @current-change="currentChange($event,'2',item)"
                  ></ec-pagination>
                </footer>
              </ul>
            </template>
          </rate-message>
          <div></div>
          <footer>
            <ec-pagination
              v-if="total>0"
              :small="true"
              layout="prev, pager, next"
              :pagerCount="5"
              :total="total"
              :currentPage="currentPage"
              @current-change="currentChange($event,'1')"
            ></ec-pagination>
          </footer>
        </div>

        <div class="no_message" v-else>
          <img src="../../../../static/img/no.png" alt>
          <p>暂无评论</p>
        </div>
      </div>

      <!-- <div v-if="$route.name!=='evaluationManager'" class="rate_manager">
        <button @click="$router.push('/evaluation-manager')">评价管理</button>
      </div>-->
    </div>
  </div>
</template>

<script>
import RateMessage from "../../teacher/components/RateMessage.vue";
import EcPagination from "@/components/EducationPagination";
import { getAccountInfo } from "@/utils/auth";
import { mapState, mapActions } from "vuex";
export default {
  props: ["manage"],
  data() {
    return {
      currentPage: 1,
      evaluationType: "1",
      rate: 4,
      total: 0,
      mark: [],
      messageChilds: {},
      options: [
        {
          value: "1",
          label: "最新评价"
        },
        {
          value: "2",
          label: "最高评价"
        },
        {
          value: "3",
          label: "最低评价"
        }
      ],
      stars: [],
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
      ],
      sign: ""
    };
  },
  computed: {
    ...mapState("agency", ["commentList", "starCnt"]),
    starLevelList() {
      for (let star1 of this.starLevels) {
        for (let star of this.stars) {
          if (star.starLevel === star1.starLevel) {
            Object.assign(star1, star);
          }
        }
      }
      console.log(this.starLevels);
      return this.starLevels;
    },
    //总评论数
    starTotal() {
      if (this.stars.length > 0) {
        return this.stars.reduce((acc, cur) => {
          return acc + cur.cnt;
        }, 0);
      } else {
        return 0;
      }
    },
    //总星级数
    levelTotal() {
      if (this.stars.length > 0) {
        return this.stars.reduce((acc, cur) => {
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
    this.initComment(1, this.evaluationType);
    this.initStarCnt();
  },
  methods: {
    ...mapActions("agency", [
      "queryAgencyComment",
      "searchSonComment",
      "searchStarCnt",
      "updateComment",
      "replyComment"
    ]),
    initComment(page, type) {
      this.queryAgencyComment({
        agencyId: getAccountInfo().agencyId,
        current: page,
        searchType: type,
        size: 10
      }).then(res => {
        if (res.code == 200) {
          this.total = res.data.total;
        }
      });
    },
    initStarCnt() {
      this.searchStarCnt(`id=${getAccountInfo().agencyId}&type=2`).then(res => {
        if (res.code === 200) {
          this.stars = res.data;
        }
      });
    },
    queryChildComment(page, obj) {
      this.searchSonComment({
        current: page,
        parentId: obj.id,
        size: 10
      }).then(res => {
        if (res.code === 200) {
          this.messageChilds[obj.id] = res.data;

          this.mark = [...new Set(this.mark).add(obj.id)];
        }
      });
    },
    //点击展开收起
    queryDetail(obj) {
      if (this.mark.includes(obj.id)) {
        let index = this.mark.indexOf(obj.id);
        this.mark.splice(index, 1);
      } else {
        if (!Object.keys(this.messageChilds).includes(String(obj.id))) {
          this.queryChildComment(1, obj);
        } else {
          this.mark.push(obj.id);
        }
      }
    },
    changeType(type) {
      this.initComment(1, type);
      this.currentPage = 1;
      this.mark = [];
    },
    currentChange(page, type, obj) {
      if (type === "1") {
        this.initComment(page, this.evaluationType);
        this.currentPage = page;
      } else if (type === "2") {
        this.queryChildComment(page, obj);
        this.messageChilds[obj.id].current = page;
      }
    },
    //修改回复
    revise(id) {
      this.sign = id;
    },
    //发布回复(修改)
    publish_revise(obj, index) {
      this.updateComment({
        comment: this.$refs[`input_${obj.id}_revise`][0].textContent,
        id: obj.id,
        memberId: getAccountInfo().id,
        isAgencyReply: "2"
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "修改成功！",
            duration: 1500,
            onClose: () => {
              this.sign = "";
              this.messageChilds[obj.parentId].records[
                index
              ].comment = this.$refs[`input_${obj.id}_revise`][0].textContent;
            }
          });
        }
      });
    },
    _replyAction(id) {
      this.sign = id;
    },
    publish_reply(obj) {
      console.log(this.messageChilds[obj.id]);
      let comment =
        this.$refs[`input_${obj.id}`][0].childNodes[1].nodeValue ||
        this.$refs[`input_${obj.id}`][0].childNodes[0].nodeValue;
      this.replyComment({
        agencyId: getAccountInfo().agencyId,
        comment: comment,
        isAgencyReply: "2",
        parentId: obj.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "回复成功！",
            duration: 1500,
            onClose: () => {
              this.sign = "";
              this.initComment(this.currentPage, this.evaluationType);

              this.queryChildComment(
                this.messageChilds[obj.id].current || 1,
                obj
              );
            }
          });
        }
      });
    },
    //回复子菜单
    publish_reply_son(obj) {
      console.log(this.messageChilds[obj.id]);
      let comment =
        this.$refs[`input_${obj.id}`][0].childNodes[1].nodeValue ||
        this.$refs[`input_${obj.id}`][0].childNodes[0].nodeValue;
      this.replyComment({
        agencyId: getAccountInfo().agencyId,
        comment: comment,
        isAgencyReply: "2",
        parentId: obj.parentId,
        replyMemberId: obj.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "回复成功！",
            duration: 1500,
            onClose: () => {
              this.sign = "";
              this.initComment(this.currentPage, this.evaluationType);
              this.queryChildComment(
                this.messageChilds[obj.parentId].current || 1,
                {
                  id: obj.parentId
                }
              );
            }
          });
        }
      });
    }
  },
  components: {
    RateMessage,
    EcPagination
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#agency_evaluation {
  .txtEdit {
    margin-top: 10px;
    & > div:nth-child(1) {
      border: 1px solid #ddd;
      height: 90px;
      padding: 10px;
      overflow-y: auto;
      @include scroll-bar;
      margin-bottom: 10px;
    }
    ._bottom {
      @include display(flex-end);
      button {
        @include buttonColor("g") {
          margin: 0;
        }
      }
    }
    ._reply_tip {
      background: transparent;
      border: 0;
      color: #757575;
    }
    ._reply_btn,
    .cancel {
      color: #00ae78;
      cursor: pointer;
    }
  }
}

.evaluation_container {
  width: 80%;
  border-radius: 5px;
  margin-left: 150px;
  padding-top: 20px;
  // margin:20px auto;

  ._main {
    @include display(space-between) {
      align-items: flex-start;
    }
    ._rate_left {
      flex: 0 0 280px;
      h3 {
        margin-bottom: 20px;
      }

      .evaluation_level {
        margin-top: 20px;

        li {
          width: 85%;
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
      // max-height: 700px;
      overflow: auto;
      font-size: $font-size - 2px;
      padding-right: 7px;
      @include scroll-bar;
      ._type_search {
        @include display(flex-start);
        margin-bottom: 30px;
      }
      .time {
        color: rgb(117, 117, 117);
      }
      ._bottom {
        @include display(space-between);
        ._reply {
          color: blue;
          cursor: pointer;
        }
        ._reply_btn,
        .cancel {
          color: #00ae78;
          cursor: pointer;
        }
      }
      ._children {
        padding: 20px 30px;
        color: rgb(117, 117, 117);
        li {
          margin-bottom: 20px;
          ._replay {
            @include display(space-between);
            margin-bottom: 15px;
            ._revise,
            ._reply_btn,
            .cancel_reply,
            .cancel {
              flex-basis: 50px;
              flex-shrink: 0;
              color: #0f80ff;
              cursor: pointer;
              text-align: center;
              user-select: none;
            }
            ._reply_btn,
            .cancel_reply {
              color: #00ae78;
            }
            .replay_content {
              @include display() {
                align-items: flex-start;
              }
              span {
                flex-shrink: 0;
                margin-right: 10px;
              }
              p {
                word-break: break-all;
              }
              .reply_sty {
                font-weight: 600;
                color: black;
                font-style: normal;
              }
            }
          }

          & > div:nth-child(2) {
          }
          ._child_time {
            @include display(flex-end);
          }
        }
      }
    }
    .no_message {
      flex: 1;
      text-align: center;
      img {
        width: 200px;
      }
      p{
        color: #757575;
      }
    }
  }
  footer {
    @include display(flex-end);
  }
  .rate_manager {
    button {
      @include buttonColor("g") {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
