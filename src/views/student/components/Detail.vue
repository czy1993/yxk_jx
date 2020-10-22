<template>
  <div id="_detail" :class="themeName">
    <div class="detail_container">
      <div class="table_head">
        <ul>
          <li>课时</li>
          <li>授课老师</li>
          <li>考勤状态</li>
        </ul>
      </div>
      <div class="table_body">
        <ul v-if="courseStatusList.length>0">
          <li v-for="(item,index) of courseStatusList" :key="index">
            <ul>
              <li>{{item.currentNum+'课时'}}</li>
              <li>{{item.teacherName}}</li>
              <li>
                <span class="common_class" :class="`status_${item.status}`">{{status[item.status]}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="_tip" v-else>暂无课程安排</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props:['courseId','studentId'],
  data() {
    return {
      status: {
        "1": "正常",
        '2':'请假',
        "3": "缺课",
      }
    };
  },
  computed:{
    ...mapState('student',['courseStatusList'])

  },
  mounted(){
    this.init()
  
  },
  methods:{
    ...mapActions('student',['queryCourseStatus']),
    init(){
      this.queryCourseStatus(`courseId=${this.courseId}&studentId=${this.studentId}`)

    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.detail_container {
  height: 150px;
  @include display();
  .table_head {
    width: 100px;
    height: 100%;
    ul {
      height: 100%;
      @include display(center) {
        flex-direction: column;
      }
      @include themify() {
        background: themed("table-header");
      }
      li {
        width: 100%;
        flex: 1;
        @include display(center);
      }
    }
  }
  .table_body {
    height: 100%;
    flex: 1;
    overflow-x: auto;
    @include scroll-bar;
    & > ul {
      height: 100%;
      @include display(flex-start);
      & > li {
        flex: 0 0 70px;
        height: 100%;
        & > ul {
          height: 100%;
          @include display(center) {
            flex-direction: column;
          }
          & > li {
            width: 100%;
            flex: 1;
            @include display(center);
          }
          & > li:nth-child(odd) {
            @include themify() {
              background: themed("table-odd-row");
            }
          }
          & > li:nth-child(even) {
            @include themify() {
              background: themed("table-even-row");
            }
          }

          & > li:nth-child(2) {
            color: $font-color-ass;
          }
        }
      }
    }

    @each $i, $color in (1:#dddddd  ,2: #ede1cb, 3: #c4e6f2, 4: #d0dff6) {
      .status_#{$i} {
        background: $color;
      }
    }

    .common_class {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 4px;
      color: $font-color;
    }
    ._tip{
      height: 100%;
      @include display(center);
    }
  }
}
</style>
