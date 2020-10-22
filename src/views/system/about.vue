<template>
  <div class="about">
    <div class="about-top">
      <h2>平台介绍</h2>
      <div>
        <p>{{platformMessage&&platformMessage.confValue}}</p>
      </div>
    </div>
    <div class="about-center">
      <div class="about-list" v-for="(item,index) in qRCodeList" :key="index">
        <div>
          <div :ref="`qrcode_${index+1}`" class="_qrcode"></div>
        </div>
        <h4>{{item.name}}</h4>
        <p>{{item.text}}</p>
      </div>
    </div>
    <p class="platform_telphone">平台联系方式：{{telphone&&telphone.confValue}}</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      qrcode: "",
      filterData: ["tel_phone", "system_desc"]
    };
  },
  computed: {
    ...mapState("user", ["aboutUs"]),
    qRCodeList() {
      return this.aboutUs.reduce((acc, cur) => {
        if (!this.filterData.includes(cur.confId) && !!(cur.confValue)) {
          acc.push({
            name: cur.label,
            url: cur.confValue
          });
        }
        return acc;
      }, []);
    },
    platformMessage() {
      return this.aboutUs.find(item => {
        return "system_desc" === item.confId;
      });
    },
    telphone() {
      return this.aboutUs.find(item => {
        return "tel_phone" === item.confId;
      });
    }
  },
  created() {
    this.initAboutUS();
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initQrCode();
    // });
  },
  methods: {
    ...mapActions("user", ["systemAbout"]),
    initAboutUS() {
      this.systemAbout();
    },
    generateQrcode(dom, url) {
      this.qrcode = new QRCode(dom, {
        text: url,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    },
    initQrCode() {
      for (let [index, qr] of Object.keys(this.$refs).entries()) {
        this.generateQrcode(this.$refs[qr][0], this.qRCodeList[index].url);
      }
    }
  },
  watch: {
    qRCodeList(val) {
      this.$nextTick(() => {
        this.initQrCode();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.about {
  width: 1000px;
  // min-width: 980px;
  margin: 40px auto;
  // padding: 40px;
  .about-top {
    min-height: 260px;
    border: 1px solid #e8eae9;
    h2 {
      text-align: center;
      line-height: 80px;
    }
    div {
      padding: 50px;
      color: #757575;
    }
  }
  .about-center {
    width: 1000px;
    padding-top: 60px;
    overflow: hidden;
    // div {
    //   width: 50%;
    //   float: left;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   padding-left: 50px;
    //   margin-bottom: 40px;
    //   img {
    //     height: 170px;
    //     width: 400px;
    //   }
    //   h4 {
    //     line-height: 50px;
    //     padding-left: 10px;
    //   }
    //   p {
    //     font-size: 14px;
    //     color: #757575;
    //     padding-left: 10px;
    //   }
    // }

    .about-list {
      float: left;
      width: 240px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      box-sizing: border-box;
      border: 1px solid #e9e9e9;
      border-radius: 6px;
      margin: 20px;
      background: #fff;
      div:not(._qrcode) {
        height: 170px;
        width: 240px;
        box-sizing: border-box;
        padding: 25px 60px;
        border-bottom: 1px solid #e9e9e9;
        margin-bottom: 10px;
        img {
          height: 120px;
        }
      }
      ._qrcode {
      }
      h4 {
        margin: 0;
        padding: 0 15px 10px 15px;
        font-size: 16px;
      }
      p {
        padding: 0 15px;
        font-size: 14px;
        color: #a6a6a6;
        margin-bottom: 15px;
      }
    }
  }
  .platform_telphone{
    margin-top: 20px;
    text-align: center;
  }
}
</style>