<template>
  <div id="material_detail">
    <div class="detail_container">
      <article>
        <img :src="bgImage" alt>
        <h2>{{title}}</h2>
        <div class="_content" v-html="describes"></div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["id", "show"],
  data() {
    return {
      bgImage: "",
      title: "",
      describes: ""
    };
  },
  methods: {
    ...mapActions("agency", ["queryMaterialDetail"])
  },
  watch: {
    show(val) {
      if (val) {
        this.queryMaterialDetail(`id=${this.id}`).then(res => {
          if (res.code === 200) {
            this.bgImage = res.data.image;
            this.title = res.data.title;
            this.describes = res.data.describes;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#material_detail {
  .detail_container {
    padding: 30px;
    article {
        width: 700px;
        margin: auto;
        border:1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        // @include display(center){
        //     flex-direction: column;
        // };
        img{
            width: 600px;
            height: 250px;
            display: block;
            margin:10px auto;
        }
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
      ._content{
          width:700px;
      }
    }
  }
}
</style>
