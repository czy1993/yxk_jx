<template>
  <div class="marketing-set">
    <div class="marketingSet-content">
      <!-- <EcRouterBack  routerName='marketing'  /> -->
      <h4>广告投放</h4>
      <div class="marketingSet-form">
        <div class="form-views">
          <span class="form-name">期望投放范围</span>
          <div class="form-value">
            <el-select @change="proChange" v-model="province" class="city" placeholder="请选择">
              <el-option
                v-for="(item,index) in provinceList"
                :key="`province_${index}`"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="_tip">省</span>
            <el-select @change="cityChange" v-model="city" class="city" placeholder="请选择">
              <el-option
                v-for="(item,index) in cityList"
                :key="`city_${index}`"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="_tip">市</span>
            <!-- <el-select v-model="country" class="city" placeholder="请选择">
              <el-option
                v-for="(item,index) of countryList"
                :key="`country_${index}`"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="_tip">区</span>-->
          </div>
        </div>
        <div class="form-views">
          <span class="form-name">期望投放课程</span>
          <div class="form-value">
            <el-select v-model="teachAreasDict" multiple placeholder="请选择">
              <el-option
                v-for="item in coursesData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-views">
          <span class="form-name">期望投放素材</span>
          <div class="from-value sourceMaterial">
            <!-- <img class="imgFile" @click="file()" :src="logoImg" alt>
            <input class="inputFile" ref="inputFile" @change="imgFile()" type="file">
            <p>素材大小不得超过10MB</p>
            <p>不得包含违法内容...</p>-->
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :before-upload="adviseRestriction"
              :on-preview="handleImage"
              :on-success="handleAdviseList"
              :on-remove="handleRemove"
              :file-list="adviseList"
              :headers="upLoadheader"
            >
              <div>
                <img
                  v-show="adviseFiles.length<1"
                  src="../../../static/img/marketing/button_sczp.png"
                  alt="upload"
                >
               
              </div>
               <!-- <p slot="tip">不得包含违法内容...</p> -->
            </el-upload>
            <el-dialog :modal-append-to-body="false" :visible.sync="imgVisible">
              <img width="100%" :src="imageUrl" alt>
            </el-dialog>
          </div>
        </div>
        <div class="form-views">
          <span class="form-name">期望科目报价</span>
          <div class="form-value">
            <el-input-number class="subject" controls-position="right" :min="0" type="number" placeholder clearable v-model="price"></el-input-number>
            <span class="_tip _phone">联系方式</span>
            <el-input
              class="subject"
              type="number"
              @blur="phoneBoll=true"
              placeholder
              clearable
              v-model="phone"
            ></el-input>
            <span class="warning" v-if="phoneBoll==false">输入11位号码</span>
          </div>
        </div>
      </div>
      <div class="buts" @click="save_advertising()">提交</div>
    </div>
  </div>
</template>
<script>
import { province_list, city_list, country_list } from "@/utils/area";
import { advertising, queryCourses } from "@/api/marketing.js";
import { uploadSingle } from "@/api/user.js";
import { queryRegion } from "@/api/course.js";
import Utils from "@/utils/deep.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { getToken } from "@/utils/auth";
import { baseUrl } from "@/utils/env";
export default {
  props: ["isReset"],
  data() {
    return {
      address: "",
      logoImg: "../../../static/img/marketing/button_sczp.png",
      coursesData: [],
      city: "", // true  市
      id: "", // false  广告id
      image: "", // true 投放素材'
      phone: null, // true 联系方式
      price: 0, // true  报价'
      province: "", // true  省'
      teachAreasDict: [], // true 投放范围',
      provinceData: [],
      cityList: [],
      countryList: [],
      cityId: "11",
      countryId: "1101",
      phoneBoll: true,
      adviseList: [],
      uploadUrl: "",
      upLoadheader: "",
      adviseFiles: [],
      type: ["image/png", "image/jpeg", "image/jpg"],
      imgVisible: false,
      imageUrl: ""
    };
  },
  components: {
    EcRouterBack
  },
  computed: {
    provinceList() {
      let arr = [];
      let arrProvince = Array.from(
        this.cityList.reduce((acc, cur) => {
          acc.add(cur.pid);
          return acc;
        }, new Set())
      );

      for (let pro of arrProvince) {
        arr = this.provinceData.filter(area => {
          return area.id === pro;
        });
      }
      return arr;
    }
  },
  created() {
    this.initUploadUrl();
    this.initArea();
    this.save_queryCourses();
  },
  methods: {
    initUploadUrl() {
      this.upLoadheader = { token: getToken() };
      this.uploadUrl = baseUrl + "agency/front/system/uploadSingle/agency";
    },
    proChange(val) {
      queryRegion({
        level: "2",
        pid: val
      }).then(res => {
        this.cityList = res.data;
      });
    },
    cityChange(val) {
      queryRegion({
        level: "3",
        pid: val
      }).then(res => {
        this.countryList = res.data;
      });
    },
    initArea() {
      queryRegion({
        level: "2"
      })
        .then(res => {
          this.cityList = res.data;
        })
        .then(() => {
          queryRegion({
            level: "1"
          }).then(res => {
            this.provinceData = res.data;
          });
        });
    },
    // img类型判断I
    imgFile() {
      let dataFoles, files;
      let REG = /\\/g;
      dataFoles = this.$refs.inputFile.files;
      if (dataFoles.length != 0) {
        files = dataFoles[0];
        // if (files.type !== 'image/png') {
        //   this.$message.error('图片格式必须为 .png 格式')
        // } else
        console.log(files);
        if (files.size / 1000 / 1000 > 10) {
          this.$message.error("请选择10MB以内的图片！");
        } else {
          let formData = new FormData();
          formData.append("file", files);
          uploadSingle(formData, "agency").then(res => {
            if (res.code == 200) {
              this.logoImg = Utils.getObjectURL(this.$refs.inputFile.files[0]);
              this.image = res.data.url;
            } else {
              this.$message.error("上传失败");
            }
          });
        }
      }
    },
    save_uploadSingle(file) {},
    save_queryCourses() {
      queryCourses("1").then(res => {
        // console.log( res);
        if (res.code == 200) {
          this.coursesData = res.data;
        }
      });
    },
    save_advertising() {
      advertising({
        city: this.city, // true  市
        launchCourseId:
          this.teachAreasDict.length > 0 ? this.teachAreasDict.join(",") : "", // false  广告id
        image: String(this.adviseFiles), // true 投放素材'
        phone: this.phone, // true 联系方式
        price: this.price, // true  报价'
        province: this.province // true  省'
        // teachAreasDict:this.teachAreasDict.length>0?this.teachAreasDict.join(','):'', // true 投放范围'
      }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$message({
            message: "您的投放申请已提交，平台运营人员会尽快与您联系核对！",
            type: "success",
            duration: 3000,
            onClose: () => {
              this.$emit("put");
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    reset() {
      this.image = ""; // true 投放素材'
      this.phone = ""; // true 联系方式
      this.price = 0; // true  报价'
      this.province = ""; // true  省'
      this.teachAreasDict = []; // true 投放范围',
      this.city = "";
    },
    adviseRestriction(file) {
      const isJPG = this.type.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传广告素材图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传广告素材图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleImage(file) {
      this.imageUrl = file.url;
      this.imgVisible = true;
    },
    handleAdviseList(response, file, fileList) {
      this.adviseFiles.push(response.data.url);
    },
    handleRemove() {
      this.adviseFiles = [];
    }
  },
  watch: {
    province(val) {
      queryRegion({
        level: "2",
        pid: val
      }).then(res => {
        this.cityList = res.data;
      });
    },
    isReset(val) {
      val && this.reset();
    }
  }
};
</script>

<style lang="scss">
.form-views {
  .sourceMaterial {
    .el-upload--picture-card {
      width: 110px;
      height: 110px;
      border: none;
    }
    .el-upload-list__item {
      width: 110px;
      height: 110px;
    }
  }
}
</style>

<style lang="scss" scoped>
.form-views {
  min-width: 700px;
  min-height: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  .form-name {
    width: 180px;
    margin-right: 20px;
    line-height: 30px;
    text-align: right;
  }
  .form-value {
    width: 600px;
    display: flex;
    ._tip {
      line-height: 30px;
      padding: 0 6px;
    }
    ._phone {
      margin-left: 50px;
    }
    .city {
      width: 150px !important;
    }
    .subject {
      width: 150px !important;
    }
    .address {
      width: 200px !important;
    }
    .warning {
      color: red;
      line-height: 34px;
      font-size: 13px;
      padding-left: 5px;
    }
  }
  .sourceMaterial {
    width: 400px;
    display: flex;
    flex-direction: column;
    // align-content:center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    position: relative;
    img[alt="upload"] {
      height: 110px;
      margin: 0 auto;
      margin-bottom: 15px;
      cursor: pointer;
      z-index: 1;
    }

    // img:hover {
    //   content: url('../../../static/img/marketing/button_sczp2.png');
    // }
    p {
      // width: 400px;
      text-align: center;
      color: #a6a6a6;
      font-size: 14px;
      line-height: 20px;
    }
    .inputFile {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 50%;
      height: 110px;
      width: 110px;
      z-index: 1;
      margin-left: -55px;
      background: url("../../../static/img/marketing/button_sczp.png") no-repeat;
      background-size: cover;
      opacity: 0;
    }
    // .inputFile:hover {
    //   background: url('../../../static/img/marketing/button_sczp2.png')
    //     no-repeat;
    //   background-size: cover;
    //   opacity: 0;
    // }
  }
}
</style>