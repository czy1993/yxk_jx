
<template>
  <div id="education_radio" :class="themeName">
    <div class="radio_container">
      <input
        :checked="checked"
        name="number"
        :id="`_se_${id}`"
        v-show="false"
        type="checkbox"
        @input="change"
      >
      <label :for="`_se_${id}`"></label>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    valueArr: {
      type: [Array, Boolean],
      required: true
    },
    label: {
      type: [String, Number]
    }
  },
  model: {
    prop: "valueArr",
    event: "input"
  },
  computed: {},
  data() {
    return {
      id: Math.random(),
      checked: false
    };
  },
  mounted() {
    this.update(this.valueArr);
  },
  methods: {
    update(val) {
      if (val instanceof Array) {
        if (val.includes(this.label)) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      } else {
        this.checked = val;
      }
    },
    change(event) {
      if (this.valueArr instanceof Array) {
        if (event.target.checked) {
          if (!this.valueArr.includes(this.label)) {
            this.valueArr.push(this.label);
          }
        } else {
          if (this.valueArr.includes(this.label)) {
            let index = this.valueArr.indexOf(this.label);
            this.valueArr.splice(index, 1);
          }
        }
        this.$emit("input", this.valueArr);
      } else {
        if (event.target.checked) {
          this.$emit("input", true);
        } else {
          this.$emit("input", false);
        }
      }
    }
  },
  watch: {
    valueArr(newVal) {
      this.update(newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.radio_container {
  @include display($hor: center);
  label {
    cursor: pointer;
    display: block;
    width: 28px;
    height: 28px;
    background-image: url(../../static/img/course/kuangxuan.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 0.3s;
  }
  input {
    &:checked {
      & + label {
        background-image: url(../../static/img/course/kuangxuan_2.png);
      }
    }
  }
}
</style>
