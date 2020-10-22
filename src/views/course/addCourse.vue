<template>
  <div id="education_add_course" :class="themeName">
    <div class="add_course_container">
      <el-form ref="form" :model="courseMessage" label-width="95px">
        <el-form-item prop="name" label="课程名称">
          <el-row>
            <el-col :span="12">
              <el-input v-model="courseMessage.name"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row>
          <el-col :span="9">
            <el-form-item label="科目选择">
              <el-row>
                <el-col :span="24">
                  <el-row :gutter="4">
                    <el-col :span="10">
                      <el-select v-model="courseMessage.subjectDict">
                        <el-option
                          v-for="item of subjectList"
                          :key="item.id"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="10">
                      <el-input
                        v-show="courseMessage.subjectDict==='11'"
                        v-model="courseMessage.otherSubject"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="学习阶段">
              <el-row>
                <el-col :span="10">
                  <el-select v-model="courseMessage.teachAreasDict">
                    <el-option
                      v-for="item of teachAreas"
                      :label="item.label"
                      :value="item.value"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="9">
            <el-form-item label="开课时间">
              <el-row :gutter="4">
                <el-col :span="20">
                  <el-date-picker
                    v-model="courseMessage.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="{
                      disabledDate(date){
          
                        if(new Date(date).getTime()<new Date().getTime()){
                          return true
                        }
                        if(new Date(date).getTime()<new Date(courseMessage.endTime).getTime()){
                          return true
                        }

                      }
                    }"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="截止时间">
              <el-row :gutter="4">
                <el-col :span="20">
                  <el-date-picker
                    v-model="courseMessage.endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="{
                      disabledDate(date){

                        if(new Date(date).getTime()<new Date().getTime()){
                          return true
                        }
          
                        if(new Date(date).getTime()>new Date(courseMessage.startTime).getTime()){
                          return true
                        }

                      }
                    }"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-for="(item,index) of courseMessage.teacherList" :key="`teacher_${index}`">
          <el-col :span="9">
            <el-form-item prop="teacherList" :label="`教 师 ${numberToChinese(index+1)}`">
              <el-row>
                <el-col :span="10">
                  <!-- <el-input v-model="item.teacherName"></el-input> -->
                  <!-- 
                  <el-autocomplete
                    class="inline-input"
                    v-model="item.teacherName"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                  ></el-autocomplete>-->

                  <el-select v-model="item.teacherId">
                    <el-option
                      v-for="item of teachers"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item prop="arrangeList" label="课  时  数">
              <el-row v-if="!item.schedule">
                <el-col :span="6">
                  <el-select
                    v-model="item.courseIndex"
                    :ref="`el_${index}`"
                    popper-class="courseNum"
                  >
                    <el-option
                      v-for="(courseClass,index) in item.arrangeList"
                      :label="`${index+1}课时`"
                      :value="index"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <span @click="arrangement(item)" class="_operate">课程安排</span>
                </el-col>
              </el-row>

              <el-row :gutter="2" v-else>
                <el-col :span="6">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="item.arrangeList[item.courseIndex].courseDay"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
                <el-col :span="5">
                  <el-time-picker
                    placeholder="起始时间"
                    v-model="item.arrangeList[item.courseIndex].courseStartTime"
                    value-format="HH:mm:ss"
                  ></el-time-picker>
                </el-col>
                <el-col :span="5">
                  <el-time-picker
                    placeholder="结束时间"
                    v-model="item.arrangeList[item.courseIndex].courseEndTime"
                    :picker-options="{
                      selectableRange: `${item.arrangeList[item.courseIndex].courseStartTime} - 23:30:00`,
                    }"
                    value-format="HH:mm:ss"
                  ></el-time-picker>
                </el-col>
                <el-col :span="1">
                  <span @click="addClass(item)" class="_operate">保存</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label-width="0px">
              <ec-button @click.native="addTeacher">添加教师+</ec-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="13">
            <el-form-item label="上课地址">
              <el-row>
                <el-col :span="24">
                  <div class="course_area">
                    <!-- <el-select v-model="courseMessage.province" placeholder="省">
                      <el-option label="10课时" value="1"></el-option>
                      <el-option label="15课时" value="2"></el-option>
                    </el-select>
                    <span class="_tip">省</span>-->
                    <el-select v-model="courseMessage.city" placeholder="市">
                      <el-option
                        v-for="item of city_list"
                        :key="item.id"
                        :label="item.city"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <span class="_tip">市</span>
                    <el-select v-model="courseMessage.area" placeholder="区/县">
                      <el-option
                        v-for="item of country_list"
                        :key="item.id"
                        :label="item.country"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <span class="_tip">区</span>
                    <el-input placeholder="请输入具体地址" v-model="courseMessage.address"></el-input>
                    <span @click="location" class="position">定位</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <p style="color:red;font-size:12px">提示：可通过标注地图来上传详细地址,也可自行补充。</p>
              </el-row>
            </el-form-item>
            <el-row :gutter="6">
              <el-col :span="8">
                <el-form-item label="标准价格">
                  <el-input :min="0" type="number" v-model="courseMessage.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报名上限">
                  <el-input
                    @change="maxNumberChange"
                    :min="0"
                    type="number"
                    v-model="courseMessage.maxNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`活动一`">
                      <div class="course_activity">
                        <el-select v-model="activityUnion">
                          <el-option label="联报" value="1"></el-option>
                        </el-select>

                        <el-popover popper-class="detail_pop" placement="right" width="400">
                          <union-apply
                            :courseId="courseMessage.uniteCourseId"
                            @course-id="onCourseId"
                            @submit="$refs.form.$el.click()"
                          ></union-apply>
                          <span slot="reference" class="_operate">编辑</span>
                        </el-popover>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="`活动二`">
                      <div class="course_activity">
                        <el-select v-model="activityPrice">
                          <el-option label="特价" value="2"></el-option>
                        </el-select>
                        <el-popover popper-class="detail_pop" placement="right" width="400">
                          <special-price
                            :specialPrice="courseMessage.specialPrice"
                            @special-price="onSpecialPrice"
                            @submit="$refs.form.$el.click()"
                          ></special-price>
                          <span slot="reference" class="_operate">编辑</span>
                        </el-popover>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :push="4" :span="7">
                <!-- <div class="upload"></div> -->
                <el-upload
                  :action="uploadUrl"
                  accept="image/*, video/*"
                  :before-upload="beforeUploadVideo"
                  :on-success="handleVideoSuccess"
                  :on-progress="uploadVideoProcess"
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="files"
                  :headers="upLoadheader"
                  list-type="picture"
                >
                  <el-progress
                    v-if="videoFlag == true"
                    type="circle"
                    :percentage="videoUploadPercent"
                  ></el-progress>
                  <div v-if="courseMessage.fileList.length<3&&!videoFlag" class="upload"></div>
                  <div
                    v-if="courseMessage.fileList.length>2"
                    class="el-upload__tip"
                    slot="tip"
                  >最多只能上传3张图片</div>
                  <div v-show="showTip" slot="tip" class="el-upload__tip">上传内容不超过10m</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="11">
            <el-form-item>
              <el-row>
                <el-col :span="24">
                  <div id="map"></div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="优惠券">
              <el-select multiple :disabled="!isAgainEdit" v-model="couponIds">
                <el-option
                  v-for="item of couponList"
                  :key="item.couponId"
                  :label="item.couponText"
                  :value="item.couponId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="服务电话">
              <el-input type="tel" v-model="courseMessage.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-form-item label="课程介绍">
              <div id="_editor"></div>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col :span="5">
            <el-form-item>
              <ec-button @click.native="uploadImage">上传图片</ec-button>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>

      <div class="add_course_footer">
        <button @click="save('1','1')">保存</button>
        <button
          v-show="courseDetails.status==='1'||$route.query.status==='1'"
          @click="save('1','2')"
        >上架</button>
        <ec-button @click.native="cancel">取消</ec-button>
      </div>
    </div>
  </div>
</template>

<script>
import EcInput from "@/components/EducationInput.vue";
import EcButton from "@/components/EducationButton";
import { NumberToChinese } from "@/utils";
import { city_list, country_list } from "@/utils/area";
import { getAccountInfo } from "@/utils/auth";
import SpecialPrice from "./components/specialPrice";
import unionApply from "./components/unionApply";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { baseUrl } from "@/utils/env";
import { getToken, removeToken } from "@/utils/auth";
let numberToChinese = new NumberToChinese();
const Editor = require("wangeditor");
export default {
  data() {
    return {
      files: [],
      uploadUrl: "",
      upLoadheader: {},
      visible: false,
      courseMessage: {
        lon: "",
        lat: "",
        name: "",
        subjectDict: "1",
        otherSubject: "",
        teachAreasDict: "1",
        startTime: "",
        endTime: "",
        teacherList: [
          {
            teacherName: "",
            // teacherIndex: 0,
            teacherId: "",
            arrangeList: [
              {
                courseDay: "",
                courseStartTime: "",
                courseEndTime: ""
              }
            ],
            courseNum: 0,
            courseIndex: 0,
            schedule: false
          }
        ],
        fileList: [],
        city: "",
        area: "",
        address: "",
        price: "",
        specialPrice: "",
        maxNumber: "",
        couponList: [],
        phone: "",
        describes: "",
        uniteCourseId: ""
      },
      city_list: [],
      // country_list: [],
      couponIds: [],
      activityUnion: "1",
      activityPrice: "2",
      marker: "",
      fileList: [],
      videoFlag: false,
      showTip: false,
      videoUploadPercent: 0, //进度条进度
      map: "",
      editor: "",
      geocoder: "", //地址信息插件
      rules: {
        name: { message: "请输入课程名称" },
        startTime: { message: "请输入开课时间" },
        endTime: { message: "请输入截止时间" },
        teacherList: {
          message: "请输入课程时间"
        },
        city: { message: "请输入所在市" },
        area: { message: "请输入所在区" },
        address: { message: "请输入所在具体街道地址" },
        price: {
          message: "请输入标准价格"
        },
        maxNumber: {
          message: "请输入报名人数上限"
        },
        phone: {
          message: "请输入服务电话"
        },
        describes: {
          message: "请输入课程介绍"
        }
      }
    };
  },
  created() {
    if (this.isAgainEdit) {
      this.courseMessage.specialPrice = this.courseDetails.specialPrice;
    }
  },
  mounted() {
    this.initCityList();

    this.initUploadUrl();
    this.initMap();

    this.initEditor();
    this.initSubject();
    this.initTeachAreas();
    // this.initStartTimeOrEndTime();
    this.initTeachers();

    this.initData();
    // if (this.courseMessage.city) {
    //   this.initCountry(this.courseMessage.city);
    // }
    // this.initCountry();

    // console.log(this.city_list);
  },
  computed: {
    ...mapState("course", [
      "subjectList",
      "teachAreas",
      "teacherList",
      "couponShow",
      "courseDetails",
      "courseData",
      "isAgainEdit",
      "courseId",
      "couponList"
    ]),
    ...mapGetters("course", ["teachers"]),
    country_list() {
      let arr = [];
      for (let country of Object.keys(country_list)) {
        if (
          String(this.courseMessage.city).slice(0, 4) === country.slice(0, 4)
        ) {
          arr.push({
            id: country,
            country: country_list[country]
          });
        }
      }
      return arr;
    }
  },
  methods: {
    ...mapActions("course", [
      "addCourse",
      "getDictSubject",
      "getDictTeachAreasDict",
      "queryTeacher",
      "queryCoupon",
      "editCourse",
      "queryRegion"
    ]),
    ...mapMutations("course", ["SAVE_COURSE_DATA", "SET_AGAIN_EDIT"]),
    initCityList() {
      this.queryRegion({
        level: "2"
      }).then(res => {
        for (let item of res.data) {
          this.city_list.push({ id: item.id + "", city: item.name });
        }
      });
    },
    // initCountry(pid) {
    //   this.country_list = [];
    //   this.queryRegion({
    //     level: "3",
    //     pid: pid
    //   }).then(res => {
    //     for (let item of res.data) {
    //       this.country_list.push({ id: item.id + "", country: item.name });
    //     }
    //   });
    // },
    // cityChange(val) {
    //   this.initCountry(val);
    // },
    initUploadUrl() {
      this.upLoadheader = { token: getToken() };
      this.uploadUrl = baseUrl + "agency/front/system/uploadSingle/agency";
    },
    //校验
    validate() {
      let num = 0;
      for (let [key, value] of Object.entries(this.rules)) {
        if (key !== "teacherList") {
          if (this.courseMessage.subjectDict === "11") {
            if (!this.courseMessage.otherSubject) {
              ++num;
              this.$message({
                type: "error",
                message: "请输入科目",
                duration: 2500
              });
              return;
            }
          }

          if (!this.courseMessage[key]) {
            ++num;
            this.$message({
              type: "error",
              message: value.message,
              duration: 2500
            });
            return;
          }
        } else {
          for (let [index, teacher] of this.courseMessage[key].entries()) {
            if (teacher.schedule) {
              this.$message({
                type: "warning",
                message: "请保存课程安排时间",
                duration: 2500
              });
              return;
            }
            if (!teacher.teacherId) {
              this.$message({
                type: "error",
                message: "请选择授课老师",
                duration: 2500
              });
              return;
            }
            if (
              teacher.arrangeList.length > 1 &&
              !teacher.arrangeList[teacher.arrangeList.length - 1].courseDay
            ) {
              teacher.arrangeList.splice(teacher.arrangeList.length - 1, 1);
            }
            for (let arrange of teacher.arrangeList) {
              if (
                !arrange.courseDay ||
                !arrange.courseStartTime ||
                !arrange.courseEndTime
              ) {
                ++num;
                this.$refs[`el_${index}`][0].focus();
                this.$message({
                  type: "error",
                  message: value.message,
                  duration: 2500
                });
                return;
              }
            }
          }
        }
      }

      if (num) {
        return false;
      } else {
        return true;
      }
    },
    //初始化科目
    initSubject() {
      this.getDictSubject();
    },
    //初始化学习阶段
    initTeachAreas() {
      this.getDictTeachAreasDict();
    },
    // 初始化富文本编辑器
    initEditor() {
      if (!this.editor) {
        this.editor = new Editor("#_editor");

        this.editor.customConfig.menus = [
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "list", // 列表
          "justify", // 对齐方式
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "undo" // 撤销
        ];
        this.editor.customConfig.uploadImgServer = this.uploadUrl;
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
        this.editor.customConfig.uploadImgMaxLength = 1;
        this.editor.customConfig.uploadFileName = "file";
        this.editor.customConfig.uploadImgHeaders = {
          token: getToken()
        };
        this.editor.customConfig.uploadImgTimeout = 5000;
        this.editor.customConfig.uploadImgHooks = {
          error: (xhr, editor) => {
            this.$message({
              type: "error",
              message: "图片上传出错",
              duration: 2000
            });
          },

          fail: function(xhr, editor, result) {
            this.$message({
              type: "error",
              message: "插入图片错误",
              duration: 2000
            });
          },

          timeout: function(xhr, editor) {
            this.$message.error({
              message: "图片上传超时",
              duration: 2000
            });
          },

          customInsert: (insertImg, result, editor) => {
            this.fileList.push({
              mediaType: "1",
              path: result.data.url,
              type: "2"
            });
            insertImg(result.data.host + result.data.url);
          }
        };

        this.editor.customConfig.onchange = html => {
          this.courseMessage.describes = html;
        };

        this.editor.create();
      }
    },
    //初始化机构教师
    initTeachers() {
      this.queryTeacher(`agencyId=${getAccountInfo().agencyId}`);
    },
    // 初始化数据(针对继续编辑)
    initData() {
      if (this.isAgainEdit) {
        console.log(this.courseDetails, this.courseData);
        this.courseMessage = Object.assign(
          {},
          this.courseData,
          this.courseDetails
        );
        if (this.courseData) {
          this.files = this.courseData.files;
          this.editor.txt.html(this.courseData.describes);
          this.couponIds = this.courseData.couponList.map(item => {
            return item.couponId;
          });
        } else {
          this.editor.txt.html(this.courseDetails.describes);
          this.couponIds = this.courseDetails.couponList.map(item => {
            return item.couponId;
          });
          this.files = this.transformFiles(this.courseDetails.fileList);
        }
        this.fileList = this.courseDetails.fileList;
        this.tranformTeacherList(this.courseDetails.teacherList);

        this.queryCoupon(`courseId=${this.courseId}`);
      }
    },
    //图片列表回选处理
    transformFiles(list) {
      let arr = [];
      arr = list.reduce((acc, cur) => {
        acc.push({
          name: cur.uid + "",
          url: cur.path
        });
        return acc;
      }, []);
      return arr;
    },
    //将返回的教师数组转化为可用参数
    tranformTeacherList(arr) {
      for (let [index, item] of arr.entries()) {
        this.$set(item, "schedule", false);
        this.$set(item, "courseIndex", 0);
      }
    },
    //数字转换为汉字
    numberToChinese(num) {
      return numberToChinese.fromTo(num);
    },
    //添加老师
    addTeacher() {
      this.courseMessage.teacherList.push({
        teacherName: "",
        // teacherIndex: 0,
        teacherId: "",
        arrangeList: [
          {
            courseDay: "",
            courseStartTime: "",
            courseEndTime: ""
          }
        ],
        courseIndex: 0,
        courseNum: 0,
        schedule: false
      });
    },
    //课程安排
    arrangement(obj) {
      console.log(obj);
      obj.schedule = true;
    },
    //添加课时
    addClass(obj) {
      let item = obj.arrangeList[obj.courseIndex];
      if (item.courseDay && item.courseStartTime && item.courseEndTime) {
        obj.schedule = false;
        if (obj.courseIndex === obj.arrangeList.length - 1) {
          obj.arrangeList.push({
            courseDay: "",
            courseStartTime: "",
            courseEndTime: ""
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请输入课程时间",
          duration: 2000
        });
      }
    },
    onSpecialPrice(val) {
      if (val) {
        this.courseMessage.specialPrice = Number(val);
      } else {
        this.courseMessage.specialPrice = val;
      }
    },
    onCourseId(val) {
      this.courseMessage.uniteCourseId = val;
    },
    cancel() {
      this.SET_AGAIN_EDIT(false);

      this.$router.push("/course");
    },
    //初始化地图
    initMap() {
      this.map = new AMap.Map("map", {
        zoom: 30
      });

      this.map.on("click", event => {
        let lnglat = event.lnglat;
        if (this.marker) {
          this.map.remove(this.marker);
        }
        this.marker = new AMap.Marker({
          position: lnglat,
          title: "我的机构"
        });
        this.map.add(this.marker);
        this.courseMessage.lon = lnglat.lng + "";
        this.courseMessage.lat = lnglat.lat + "";
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            // console.log(result);
            let address = result.regeocode.addressComponent;

            this.courseMessage.city = address.adcode.slice(0, 4) + "00";

            Promise.resolve().then(() => {
              this.courseMessage.area = address.adcode;
            });

            this.courseMessage.address =
              address.township +
              " " +
              address.street +
              " " +
              address.streetNumber;
          }
        });
      });

      AMap.plugin(["AMap.Geolocation", "AMap.Geocoder"], () => {
        //异步同时加载多个插件
        let geolocation = new AMap.Geolocation({
          timeout: 5000,
          zoomToAccuracy: true,
          buttonPosition: "RB"
        });
        geolocation.getCurrentPosition();
        // AMap.event.addListener(
        //   geolocation,
        //   "complete",
        //   this.onMapGeolocationComplete
        // );
        AMap.event.addListener(
          geolocation,
          "error",
          this.onMapGeolocationError
        );

        this.map.addControl(geolocation);

        this.geocoder = new AMap.Geocoder({});
      });
    },
    onMapGeolocationComplete(data) {
      let address = data.addressComponent;
      this.courseMessage.city = address.adcode.slice(0, 4) + "00";
      this.courseMessage.area = address.adcode;
      this.courseMessage.address =
        address.township + " " + address.street + " " + address.streetNumber;
      this.courseMessage.lon = data.position.lng + "";
      this.courseMessage.lat = data.position.lat + "";
    },
    onMapGeolocationError(data) {
      this.$message.error("地图定位失败，请自行标注！");
    },
    //编码转换为地址
    transformLocal() {
      let city = city_list[this.courseMessage.city];
      let area = country_list[this.courseMessage.area];
      console.log(city + area + this.courseMessage.address);
      return city + area + this.courseMessage.address;
    },

    location() {
      if (!this.courseMessage.city) {
        return this.$message.error({
          message: "请选择市/区地址再进行定位",
          duration: 2000
        });
      }
      this.geocoder.getLocation(this.transformLocal(), (status, result) => {
        if (status === "complete" && result.info === "OK") {
          this.courseMessage.lon = result.geocodes[0].location.lng + "";
          this.courseMessage.lat = result.geocodes[0].location.lat + "";
          if (this.marker) {
            this.map.remove(this.marker);
          }
          this.marker = new AMap.Marker({
            position: result.geocodes[0].location,
            title: "我的机构"
          });
          this.map.add(this.marker);
          this.map.setFitView(this.marker);
        } else {
          this.$message.error({
            message: "定位失败，请稍后再试",
            duration: 2000
          });
        }
      });
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      let type = "1";
      if (res.code != 200) {
        this.$message.error("视频上传失败，请重新上传！");
      } else {
        console.log(this.files);
        this.fileList.push({
          mediaType: "1",
          path: res.data.url,
          type: type
        });
      }
    },
    //上传数量超标
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //展示视频上传进度
    uploadVideoProcess(event, file, fileList) {
      console.log(file.type);
      if (/video\/*/.test(file.type)) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      }
    },
    //上传前
    beforeUploadVideo(file) {
      const isLt500 = file.size / 1000 / 1000 < 10;
      if (!isLt500) {
        this.showTip = true;
        return false;
      }
      this.showTip = false;
    },
    getTeacherMessage(list) {
      for (let t of list) {
        // t.teacherName = this.teachers[t.teacherIndex].value;
        // t.teacherId = this.teachers[t.teacherIndex].id;
        let teacher = this.teachers.find(item => {
          return item.id === t.teacherId;
        });
        t.teacherName = teacher.value;

        t.courseNum = t.arrangeList.length;
      }

      return list;
    },
    //报名上线修正
    maxNumberChange(val) {
      this.courseMessage.maxNumber = Math.ceil(val);
    },
    save(status, type) {
      if (this.validate()) {
        let teacherList = this.getTeacherMessage(
          this.courseMessage.teacherList
        );
        let couponList = this.couponIds.map(item => {
          return { couponId: item, couponText: "" };
        });
        let data = Object.assign(this.courseMessage, {
          status,
          teacherList,
          fileList: this.fileList,
          couponList
        });
        if (this.isAgainEdit) {
          this.editCourse({ ...data, id: this.courseId }).then(res => {
            if (res.code === 200) {
              if (type === "2") {
                this.$router.push({
                  path: "/course-detail",
                  query: { courseId: this.courseId }
                });
                this.SAVE_COURSE_DATA({ ...data, files: this.files });

                this.SET_AGAIN_EDIT(false);
              } else {
                this.$message({
                  type: "success",
                  message: "课程已保存",
                  duration: 2000,
                  onClose: () => {
                    this.$router.push("/course");
                    this.SET_AGAIN_EDIT(false);
                  }
                });
              }
            }
          });
        } else {
          this.addCourse(data).then(res => {
            if (res.code === 200) {
              if (type === "2") {
                console.log(this.files);
                this.SAVE_COURSE_DATA({ ...data, files: this.files });
                this.$router.push({
                  path: "/course-detail",
                  query: { courseId: res.data }
                });
              } else {
                this.$message({
                  type: "success",
                  message: "课程已保存",
                  duration: 2000,
                  onClose: () => {
                    this.$router.push("/course");
                  }
                });
              }
            }
          });
        }
      }
    }
  },
  watch: {
    courseMessage: {
      handler(val, oldVal) {
        // console.log(val.city,this.courseMessage.city)
        // if(val.city!==oldVal.city){
        //   this.initCountry(val.city);
        // }
      },
      deep: true
    }
  },
  components: {
    EcInput,
    EcButton,
    SpecialPrice,
    unionApply
  }
};
</script>

<style lang="scss" >
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_add_course {
  width: 82%;
  max-width: 1220px;
  min-width: 1050px;
  height: calc(100% - 100px);
  margin-top: 20px;
  margin-left: 80px;
  border: 1px solid #e7edeb;
  border-radius: 5px;
  font-size: $font-size - 2px;
  overflow: hidden;
}

.add_course_container {
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 15px;
  height: 100%;
  // background-color: #fafffb;
  overflow: auto;
  @include scroll-bar;
  @include themify() {
    background-color: themed("add-course-bgcolor");
  }
  .el-form-item__label {
    color: $font-color;
    font-weight: 500;
    text-align-last: justify;
    text-align: justify;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto !important;
  }
  .course_area {
    @include display;
    ._tip {
      margin: 0 10px;
    }
    .position {
      flex: 0 0 40px;
      margin-left: 10px;
      @include colorFont;
    }
  }
  .course_activity {
    @include display;
  }
  ._operate {
    display: block;
    width: 80px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    @include themify() {
      color: themed("title-active");
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .upload {
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: all 0.1s;
    @include themify() {
      background: url(themed("upload-image")) center/cover no-repeat;
    }
    &:hover {
      @include themify() {
        background: url(themed("upload-image-active")) center/cover no-repeat;
      }
    }
  }
  .add_course_footer {
    position: fixed;
    bottom: 20px;
    left: 40%;
    & > button:nth-child(1) {
      @include buttonColor("g");
    }
    & > button:nth-child(2) {
      @include buttonColor("c");
    }
  }

  #map {
    width: 300px;
    height: 300px;
    position: absolute;
    right: 90px;
    top: -40px;
  }
  .el-upload__tip {
    color: red;
  }

  #_editor {
    .w-e-text-container {
      height: 200px !important;
    }
  }
}
</style>

