<template>
  <div id="specialPrice" :class="themeName">
    <div class="price_container">
      <el-input type="number" v-model="special" placeholder="请输入特价价格"></el-input>
      <footer>
        <button @click="submit">提交</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specialPrice: [Number, String]
  },
  data() {
    return {
      special: ""
    };
  },
  created() {},
  mounted() {
    this.special = this.specialPrice;
    console.log(this.specialPrice);
  },
  methods: {
    submit() {
      this.$emit("submit");
    }
  },
  watch: {
    special(val) {
      this.$emit("special-price", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.price_container {
  padding: 40px;
  footer {
    margin-top: 30px;
    button {
      @include buttonColor("g") {
        display: block;
        margin: auto;
      }
    }
  }
}
</style>
