<template>
  <div id="education_rate_message">
    <div class="rate_message_container">
      <section>
        <h3>
          <div class="rate_header_left">
            <div :style="{backgroundImage:`url(${icon})`}" class="_icon"></div>
            <span class="name">{{name}}</span>
            <el-rate v-model="rate" disabled show-score text-color="#ff9900"></el-rate>
          </div>
          <div class="rate_header_right">
            <slot name="right"></slot>
          </div>
        </h3>
        <div class="content">
          <p>{{content}}</p>
        </div>
        <div class="_bottom">
          <slot name="bottom"></slot>
        </div>
        <!-- <collapse-transition> -->
          <div v-if="expand" class="_expand">
            <slot name="expand"></slot>
          </div>
        <!-- </collapse-transition> -->
      </section>
    </div>
  </div>
</template>

<script>
import CollapseTransition from "@/transition/CollapseTransition.vue";
export default {
  props: {
    rate: {
      type: [String, Number],
      required: true
    },
    content: {
      type: String
    },
    name: [String],
    expand: {
      type: Boolean,
      default: true
    },
    icon:String
  },
  components: {
    CollapseTransition
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_rate_message {
  width: 100%;
}
.rate_message_container {
  section {
    border-bottom: 1px solid #c2c2c2;
    padding-bottom: 10px;
    margin-bottom: 30px;
    h3 {
      font-size: $font-size - 1px;
      @include display(space-between);
      font-weight: 600;
      margin-bottom: 30px;
      .rate_header_left {
        @include display();
        ._icon {
          width: 45px;
          height: 45px;
          margin-right: 15px;
          background-repeat: no-repeat;
          background-size:cover;
        }
        .name {
          margin-right: 40px;
        }
        .el-rate {
          line-height: 1.1;
        }
      }
      .rate_header_right {
        font-weight: 500;
      }
    }
    .content,
    ._bottom {
      color: rgb(117, 117, 117);
      margin-bottom: 10px;
    }
    ._expand {
    }
  }
}
</style>
