import router from "./router";
import store from "./store";
import { getToken, getAccountInfo } from "@/utils/auth";

router.beforeEach((to, from, next) => {
  //已登录
  if (getToken()) {
    if (getAccountInfo().firstLogin) {
      if (to.path === "/form/login") {
        next({ ...from });
      } else {
        next();
      }
    } else {
      if (to.path !== "/form/change-password"&&to.path!=='/form/login') {
        next("/form/change-password");
      } else {
        next();
      }
    }
  } else {
    if (
      to.name == "login" ||
      to.name == "retrieve"
    ) {
      next();
    } else {
      next("/form/login");
    }
  }
  store.commit("SAVE_TITLE", to.meta.title);
});

router.afterEach((to, from) => {});
