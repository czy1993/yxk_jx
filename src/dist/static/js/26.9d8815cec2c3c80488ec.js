webpackJsonp([26],{RUaP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("YXVF"),s=a("6k77"),r=a("VLUi"),u=a("zwmd"),i=a("iFss"),c={data:function(){return{height:"100px",tableData:[{number:1,courseName:"2020高考数学冲刺",classTime:"2020-1-2 15:30:00",status:1},{number:2,courseName:"2020高考数学冲刺",classTime:"2020-1-2 15:30:00",status:1},{number:3,courseName:"2020高考数学冲刺",classTime:"2020-1-2 15:30:00",status:2},{number:4,courseName:"2020高考数学冲刺",classTime:"2020-1-2 15:30:00",status:3},{number:5,courseName:"2020高考数学冲刺",classTime:"2020-1-2 15:30:00",status:1}],status:{1:"正常",2:"缺勤",3:"请假"}}},mounted:function(){this.init(),window.addEventListener("resize",this.init),this.save_searchAttendance()},methods:{init:function(){var t=this;this.$nextTick(function(){var e=t.$refs.container.getBoundingClientRect().height,a=t.$refs.header.getBoundingClientRect().height;t.height=e-a-60+"px"})},save_searchAttendance:function(){var t=this;Object(r.e)("?courseTeacherId="+this.$route.query.id).then(function(e){200==e.code&&(t.tableData=e.data,t.tableData.forEach(function(t,e){t.number=e+1}))})},handleExportExcel:function(){var t=this.formatJson(["name","courseDate","status"],this.tableData);Object(i.a)({header:["课程名称","上课时间","考勤状态"],data:t,filename:"教师考勤"})},formatJson:function(t,e){var a=this;return e.map(function(e){return t.map(function(t){return"status"===t?a.status[e[t]]:e[t]})})}},components:{EcButton:n.a,EcTable:s.a,EcRouterBack:u.a},beforeDestroy:function(){window.removeEventListener("resize",this.init)}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"teacher_attendance"}},[a("div",{ref:"container",staticClass:"attendance_container"},[a("header",{ref:"header"},[a("div",{staticClass:"_title"},[t._v("\n        教师姓名：\n        "),a("span",[t._v(t._s(t.$route.query.name))])]),t._v(" "),a("div",[a("ec-button",{nativeOn:{click:function(e){return t.handleExportExcel(e)}}},[t._v("导出Excel")])],1)]),t._v(" "),a("div",{staticClass:"attendance_table"},[a("ec-table",{attrs:{height:t.height,tableData:t.tableData}},[a("el-table-column",{attrs:{prop:"number",label:"序号",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.number))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"课程名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"courseDate",label:"上课时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.courseDate))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"考勤状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:"status_"+e.row.status},[t._v(t._s(t.status[e.row.status]))])]}}])})],1)],1)])])},staticRenderFns:[]};var l=a("C7Lr")(c,o,!1,function(t){a("XO9i")},"data-v-013e5004",null);e.default=l.exports},XO9i:function(t,e){}});
//# sourceMappingURL=26.9d8815cec2c3c80488ec.js.map