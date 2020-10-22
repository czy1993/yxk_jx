<template>
  <div id="education_add_teacher">
    <el-dialog :visible.sync="imgVisible">
      <img width="100%" :src="imageUrl" alt>
    </el-dialog>
    <div class="add_teacher_container">
      <EcRouterBack routerName="teacher"/>
      <div class="main">
        <el-form ref="form" :model="teacherMessage" label-width="80px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="姓名">
                <el-input v-model="teacherMessage.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :push="9" :span="7">
              <el-form-item label="性别">
                <div style="width:60%">
                  <el-select v-model="teacherMessage.sex">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="手机号码">
                <el-input type="number" v-model="teacherMessage.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :push="9" :span="7">
              <el-form-item label="资格证号">
                <el-input v-model="teacherMessage.certificateNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="教学范围">
                <el-select multiple v-model="teachAreasDictValue">
                  <el-option
                    v-for="item in teachAreasDict"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :push="9" :span="7">
              <el-form-item label="科目">
                <div>
                  <el-select multiple v-model="subjectDictValue">
                    <el-option
                      v-for="item in subjectDict"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="15">
              <el-form-item label="荣誉">
                <div class="text_area">
                  <el-input
                    rows="6"
                    show-word-limit
                    maxlength="200"
                    type="textarea"
                    v-model="teacherMessage.honor"
                    placeholder="每行一个"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="_upload">
          <div class="hornorImgList">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :before-upload="honorRestriction"
              :on-preview="handleImage"
              :on-success="handleHonorList"
              :on-remove="handleHonorImgRemove"
              :file-list="honorList"
              :headers="upLoadheader"
            >
              <div
                v-if="honorFiles.length>(photoLimit.teacher_honor_photo_limit-1)"
                style="color:red"
                slot="tip"
                class="el-upload__tip"
              >{{`只能上传${photoLimit.teacher_honor_photo_limit}张荣誉证书`}}</div>
              <img v-else :src="'../../../static/img/teacher/certificate_upload.png'" alt>
            </el-upload>
          </div>

          <div class="photoImgList">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :before-upload="photoRestriction"
              :on-preview="handleImage"
              :on-success="handlePhotoList"
              :on-remove="handleRemove"
              :file-list="photoList"
              :headers="upLoadheader"
            >
              <div
                v-if="photoFiles.length>(photoLimit.teacher_photo_limit-1)"
                style="color:red"
                slot="tip"
                class="el-upload__tip"
              >{{`只能上传${photoLimit.teacher_photo_limit}张教师照片`}}</div>
              <img v-else :src="'../../../static/img/teacher/photo_upload.png'" alt>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="save_pull()">提交</button>
    </div>
  </div>
</template>

<script>
import {
  addTeacher,
  teacherList,
  getDict,
  updateTeacher,
  teacherPhotoLimit
} from "@/api/teacher.js";
import { uploadSingle } from "@/api/user.js";
import Utils from "@/utils/deep.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { getToken } from "@/utils/auth";
import { baseUrl } from "@/utils/env";
export default {
  data() {
    return {
      teacherMessage: {
        honorImg: "", //3
        certificateNo: "", //1
        honor: "", //2
        name: "", //4
        phone: "", //5
        photo: "", //6
        sex: "", //7
        subjectDict: "", //8
        teachAreasDict: "" //9
      },
      teachAreasDict: [],
      subjectDict: [],
      teachAreasDictValue: [],
      subjectDictValue: [],
      pictureNum: 0,
      upLoadheader: "",
      uploadUrl: "",
      photoFiles: [], //上传的照片数组
      photoList: [], //照片列表
      honorFiles: [], //上传荣誉数组
      honorList: [], //荣誉列表
      imgVisible: false,
      imageUrl: "",
      photoLimit: {
        teacher_photo_limit: 0,
        teacher_honor_photo_limit: 0
      },
      imgServer: "",
      type: ["image/png", "image/jpeg", "image/jpg"]
    };
  },
  components: {
    EcRouterBack
  },
  created() {
    this.initPictureNum();
    this.initUploadUrl();
    this.save_getDict("subject");
    this.save_getDict("teachAreas");
    if (this.$route.query.name) {
      this.save_teacherList(this.$route.query.name);
    }
  },
  methods: {
    initUploadUrl() {
      this.upLoadheader = { token: getToken() };
      this.uploadUrl = baseUrl + "agency/front/system/uploadSingle/agency";
    },
    initPictureNum() {
      teacherPhotoLimit().then(res => {
        res.data.reduce((acc, cur) => {
          acc[cur.confId] = cur.confValue / 1;
          return acc;
        }, this.photoLimit);
      });
    },
    save_pull() {
      if (this.$route.query.name) {
        this.save_updateTeacher();
      } else {
        this.save_addTeacher();
      }
    },
    //getDict
    save_getDict(name) {
      getDict(`?groupType=${name}`).then(res => {
        if (res.code == 200) {
          if (name == "subject") {
            this.subjectDict = res.data;
          } else if (name == "teachAreas") {
            this.teachAreasDict = res.data;
          }
        }
      });
    },
    //
    save_teacherList(name) {
      teacherList({
        current: 1,
        name: name,
        phone: "",
        size: 1
      }).then(res => {
        if (res.code == 200) {
          this.teacherMessage = res.data.list.records[0];
          this.imgServer = res.data.imgServer;
          this.photoList =this.handleImageList(res.data.list.records[0].photo);
          this.honorList =this.handleImageList(res.data.list.records[0].honorImg);
          this.photoFiles = res.data.list.records[0].photo.split(",");
          this.honorFiles = res.data.list.records[0].honorImg.split(",");
          this.teachAreasDictValue = res.data.list.records[0].teachAreasDict.split(
            ","
          );
          this.subjectDictValue = res.data.list.records[0].subjectDict.split(
            ","
          );
        }
      });
    },
    //  新增教师
    save_addTeacher() {
      this.teacherMessage.subjectDict = this.subjectDictValue.join(",");
      this.teacherMessage.teachAreasDict = this.teachAreasDictValue.join(",");
      this.teacherMessage.photo = this.photoFiles.join(",");
      this.teacherMessage.honorImg = this.honorFiles.join(",");
      addTeacher(this.teacherMessage).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "提交成功",
            type: "success",
            onClose: () => {
              this.$router.go(-1);
            }
          });
        }
      });
    },
    // 编辑教师
    save_updateTeacher() {
      console.log(this.honorFiles)
      this.teacherMessage.subjectDict = this.subjectDictValue.join(",");
      this.teacherMessage.teachAreasDict = this.teachAreasDictValue.join(",");
      this.teacherMessage.photo = String(this.photoFiles);
      this.teacherMessage.honorImg = String(this.honorFiles);
      updateTeacher(this.teacherMessage).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
            onClose: () => {
              this.$router.go(-1);
            }
          });
        }
      });
    },
    //限制照片上传张数
    photoRestriction(file) {
      const isJPG = this.type.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 0.5;
      if (this.photoFiles.length > this.photoLimit.teacher_photo_limit - 1) {
        return false;
      }

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500kb!");
      }
      console.log(this.photoFiles);
      return isJPG && isLt2M;
    },
    handlePhotoList(response, file, fileList) {
      this.photoFiles.push(response.data.url);
    },
    //照片放大
    handleImage(file) {
      this.imageUrl = file.url;
      this.imgVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.removeImg(file, this.photoFiles);
    },
    honorRestriction(file) {
      const isJPG = this.type.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (
        this.honorFiles.length >
        this.photoLimit.teacher_honor_photo_limit - 1
      ) {
        return false;
      }
      if (!isJPG) {
        this.$message.error("上传荣誉证书图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传荣誉证书图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    handleHonorList(response, file, fileList) {
      this.honorFiles.push(response.data.url);
    },
    handleHonorImgRemove(file, fileList) {
      this.removeImg(file, this.honorFiles);
    },
    //删除图片
    removeImg(file, fileList) {
      let fileVal = file.url;
      let index = fileList.findIndex(val => {
        return this.imgServer + val === fileVal;
      });
      console.log(index);
      if (!!~index) {
        fileList.splice(index, 1);
      }
    },
    handleImageList(img) {
      if (!!img) {
        return img
          .split(",")
          .filter((po) => {
            if (!!po) {
              return po;
            }
          })
          .map(po => {
            if (!!po) {
              return { url: this.imgServer + po };
            }
          });
      } else {
        return [];
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_add_teacher {
  height: 100%;
  background-color: $view-bgcolor;
  // overflow: hidden;

  .footer {
    width: 75%;
    margin-left: 120px;
    padding-top: 30px;
    button {
      @include buttonColor("c") {
        width: 200px;
        display: block;
        margin: auto;
      }
    }
  }
}

.add_teacher_container {
  width: 75%;
  // height: 80%;
  padding: 30px;
  margin-top: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-left: 120px;
  position: relative;
  background: $view-container-bgcolor;
  position: relative;
  .main {
    width: 75%;
    height: 85%;
    // position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    margin: auto;
    .el-form-item__label {
      color: $font-color;
      font-weight: 500;
      text-align-last: justify;
      text-align: justify;
    }
    ._upload {
      width: 100%;
      @include display(space-around);
      // position: absolute;
      // bottom: 20px;
      .hornorImgList,
      .photoImgList {
        flex-basis: 400px;
        @include display(space-around);
      }
      div {
        // width: 100px;
        // height: 100px;
        // cursor: pointer;
        transition: all 0.1s;
        background-size: cover;
        background-repeat: no-repeat;
        // margin: 0 40px;
        // position: relative;

        .el-upload-list__item,
        .el-upload--picture-card {
          width: 100px;
          height: 100px;
          border: none;
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    .text_area {
      @include scroll-bar;
      height: 150px;
      overflow: auto;
    }
  }
}
</style>
