<template>
  <div id="education_order" :class="themeName">
    <div ref="container" class="order_container">
      <order-header @search="search" @condition="change" ref="header"></order-header>
      <order-table :height="height" :tableData="orderDatas"></order-table>
      <footer ref="footer">
        <ec-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :total="total"
          :currentPage="currentPage"
        ></ec-pagination>
      </footer>
    </div>
  </div>
</template>

<script>
import OrderHeader from "./components/OrderHeader";
import OrderTable from "./components/OrderTable";
import EcPagination from "@/components/EducationPagination";
import { mapActions, mapState, mapGetters } from "vuex";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      height: "100px",
      currentPage: 1,
      size: 10,
      condition: "",
      total: 0
    };
  },
  computed: {
    ...mapGetters("order", ["orderDatas"])
  },
  created() {
    this.initOrder();
  },
  mounted() {
    this.init();
    this.on();
    window.addEventListener("resize", this.init);
  },
  methods: {
    ...mapActions("order", ["manageOrders"]),
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.$el.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    //取消监听
    off() {
      bus.$off("initOrder");
    },
    on() {
      bus.$on("initOrder", () => {
        this.$refs.container.click();
        this.initOrder();
      });
    },
    initOrder() {
      this.query(this.currentPage, this.condition);
    },
    query(page, condition) {
      this.manageOrders({
        current: page,
        size: this.size,
        condition: condition
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.total;
        }
      });
    },
    change(val) {
      this.condition = val;
    },
    changePage(page) {
      this.query(page, this.condition);
      this.currentPage = page;
    },
    changeSize(size) {
      this.size = size;
      this.currentPage = 1;
      this.query(1, this.condition);
    },
    //搜索订单
    search(val) {
      this.condition = val;
      this.query(1, this.condition);
    }
  },
  components: {
    OrderHeader,
    OrderTable,
    EcPagination
  },
  beforeDestroy() {
    this.off();
    window.removeEventListener("resize", this.init);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_order {
  @include layout;
}
.order_container {
  height: 100%;
  footer {
    padding-top: 10px;
  }
}
</style>
