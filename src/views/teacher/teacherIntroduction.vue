<template>
  <div id="teacher_introduction">
    <div class="introduction_container">
      <EcRouterBack routerName="teacher"/>
      <div class="main">
        <h2>教师介绍</h2>
        <div class="poster">
          <div class="_left" :style="{backgroundImage:`url(${teacherObj.photo})`}">
          </div>
          <div class="_right">
            <h3>{{$route.query.name}}老师</h3>
            <!-- <p>英语专业学士,英语专业八级。从事少儿英语教育数年，有丰富的教学经验。性格开朗活泼，语感和表达能力较强。
              富有亲和力、耐心及责任感，课堂气氛活跃，讲课思路清晰，是一位极富表现力的好老师！“陪孩子们成长，给孩子
            们欢笑，传递给孩子们轻松高效的英语教育，愿孩子们喜欢我，喜欢英语~~”</p>-->
            <p v-if="show==false">{{teacherObj.introduce}}</p>
            <el-input
              v-else
              class="inputs"
              type="textarea"
              :rows="10"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
          </div>
        </div>
        <footer class="_footer">
          <button v-if="show==false" @click="show=true">编辑</button>
          <div v-else>
            <button @click="set_addDesc()">提交</button>
            <button @click="show=false">取消</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { teacherList, addDesc } from "@/api/teacher.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
export default {
  data() {
    return {
      teacherObj: {},
      show: false,
      textarea: ""
    };
  },
  components: {
    EcRouterBack
  },
  created() {
    this.save_teacherList(this.$route.query.name);
  },
  methods: {
    save_teacherList(name) {
      teacherList({
        current: 1,
        name: name ? name : "",
        phone: "",
        size: 10
      }).then(res => {
        if (res.code == 200) {
          this.teacherObj = res.data.records[0];
        } else {
          this.$message.error(res.message);
        }
      });
    },
    set_addDesc() {
      addDesc({
        desc: this.textarea,
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.save_teacherList(this.$route.query.name);
          this.show = false;
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#teacher_introduction {
  height: 100%;
  background-color: $view-bgcolor;
  overflow: hidden;
}

.introduction_container {
  width: 80%;
  height: 90%;
  margin-top: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-left: 120px;
  position: relative;
  background: $view-container-bgcolor;
  .main {
    // padding:60px 60px 0;
    width: 75%;
    height: 85%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    h2 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 50px;
    }
    .poster {
      display: flex;
      ._left {
        width: 240px;
        height: 300px;
        flex-shrink: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        // background: url(../../../static/img/poster.png) center/100% 100%
        //   no-repeat;
      }
      ._right {
        margin-left: 30px;
        h3 {
          margin-bottom: 20px;
        }
        p {
          color: $font-color-ass;
          line-height: 1.7;
        }
        .inputs {
          width: 500px;
        }
      }
    }
    ._footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      button {
        margin: 0 25px;
        @include buttonColor($type: "g") {
          font-size: $font-size;
          display: block;
          margin: auto;
        }
      }
      div {
        width: 300px;
        margin: 0 auto;
        display: flex;
        button:nth-child(2) {
          @include buttonColor($type: "c") {
            font-size: $font-size;
            display: block;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
