// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import md5 from "js-md5";

import {
  Cascader,
  Input,
  Form,
  Row,
  Col,
  DatePicker,
  FormItem,
  Table,
  TableColumn,
  TimePicker,
  Select,
  Option,
  Pagination,
  Popover,
  Upload,
  Message,
  Rate,
  MessageBox,
  Autocomplete,
  Radio,
  InputNumber,
  Scrollbar,
  Loading,
  Dialog,
} from "element-ui";
// import Element from 'element-ui'
import "./styles/element-variables.scss";

import "@/styles/index.scss";
import "@/styles/system.scss";
import "@/styles/forms.scss";
import "./permission";

import mixin from "./mixin";

Vue.mixin(mixin);

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Rate);
Vue.use(Cascader);
Vue.use(TimePicker);
Vue.use(Autocomplete);
Vue.use(Radio);
Vue.use(InputNumber);
Vue.use(Scrollbar);
Vue.use(Loading.directive);
Vue.use(Dialog)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$ELEMENT = { size: "medium" };

// Vue.use(Element, {
//   size: 'medium', // set element-ui default size
// })

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
