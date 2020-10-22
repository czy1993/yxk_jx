import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/transition",
      children: [
        {
          path: "/transition",
          name: "transition",
          component: () => import("@/views/transition.vue"),
          meta: {
            title: "加载中...",
          },
        },
        {
          path: "course",
          name: "course",
          meta: {
            title: "课程管理",
            isKeepAlive: true
          },
          component: () => import("@/views/course")
        },
        {
          path: "student-message",
          name: "studentMessage",
          meta: {
            title: "学员信息"
          },
          component: () => import("@/views/course/studentMessage")
        },
        {
          path: "course-detail",
          name: "courseDetail",
          meta: {
            title: "课程详情",
            isKeepAlive: true
          },
          component: () => import("@/views/course/courseDetail")
        },
        {
          path: "teacher",
          name: "teacher",
          meta: {
            title: "教师管理"
          },
          component: () => import("@/views/teacher")
        },
        {
          path: "attendance",
          name: "attendance",
          meta: {
            title: "教师考勤"
          },
          component: () => import("@/views/teacher/attendance")
        },
        {
          path: "teacher-introduction",
          name: "teacherIntroduction",
          meta: {
            title: "教师介绍"
          },
          component: () => import("@/views/teacher/teacherIntroduction")
        },
        {
          path: "add-teacher",
          name: "addTeacher",
          meta: {
            title: "新增教师"
          },
          component: () => import("@/views/teacher/addTeacher")
        },
        {
          path: "teacher-evaluation",
          name: "teacherEvaluation",
          meta: {
            title: "教师评价"
          },
          component: () => import("@/views/teacher/teacherEvaluation")
        },
        {
          path: "student",
          name: "student",
          meta: {
            title: "学员管理"
          },
          component: () => import("@/views/student")
        },
        {
          path: "student-detail",
          name: "studentDetail",
          meta: {
            title: "学员详情"
          },
          component: () => import("@/views/student/studentDetail")
        },
        {
          path: "order",
          name: "order",
          meta: {
            title: "订单管理"
          },
          component: () => import("@/views/order")
        },
        {
          path: "statistics",
          name: "statistics",
          meta: {
            title: "统计分析"
          },
          component: () => import("@/views/statistics")
        },
        {
          path: "marketing",
          name: "marketing",
          meta: {
            title: "营销管理"
          },
          component: () => import("@/views/marketing")
        },
        {
          path: "coupon",
          name: "coupon",
          meta: {
            title: "优惠券管理"
          },
          component: () => import("@/views/marketing/coupon.vue")
        },
        {
          path: "notice",
          name: "notice",
          meta: {
            title: "通知管理"
          },
          component: () => import("@/views/marketing/notice.vue")
        },
        {
          path: "extension",
          name: "extension",
          meta: {
            title: "推广营销"
          },
          component: () => import("@/views/marketing/extension.vue")
        },
        {
          path: "system",
          name: "system",
          meta: {
            title: "系统设置"
          },
          component: () => import("@/views/system")
        },
        {
          path: "addAcount",
          name: "addAcount",
          component: () => import("@/views/system/addAcount.vue"),
          meta: {
            title: "新增账号"
          }
        },
        {
          path: "jurisdiction",
          name: "jurisdiction",
          component: () => import("@/views/system/jurisdiction.vue"),
          meta: {
            title: "权限设置"
          }
        },
        {
          path: "changePassword",
          name: "changePassword",
          component: () => import("@/views/system/changePassword.vue"),
          meta: {
            title: "修改密码"
          }
        },
        {
          path: "about",
          name: "about",
          meta: {
            title: "关于我们"
          },
          component: () => import("@/views/system/about.vue")
        },
        {
          path: "addCourse",
          name: "addCourse",
          meta: {
            title: "新增课程"
          },
          component: () => import("@/views/course/addCourse.vue")
        },
        {
          path: "agency",
          name: "agency",
          meta: {
            title: "我的机构"
          },
          component: () => import("@/views/agency")
        },
        {
          path: "evaluation-manager",
          name: "evaluationManager",
          meta: {
            title: "评价管理"
          },
          component: () => import("@/views/agency/evaluationManager")
        }
      ]
    },
    {
      path: "/form",
      name: "form",
      component: () => import("@/views/form"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/form/login-form")
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/form/register-form")
        },
        {
          path: "retrieve",
          name: "retrieve",
          component: () => import("@/views/form/retrieve-form")
        },{
          path: "change-password",
          name: "changePassword",
          component: () => import("@/views/form/change-password")
        }
      ]
    },
    {
      path: "*",
      component: () => import("@/views/error-page/404"),
      hidden: true
    }
  ]
});
