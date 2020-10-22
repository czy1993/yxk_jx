<template>
  <div id="sides">
    <template>
      <app-link
        v-if="!hasChildren(item)&&item.type==='1'"
        :isExternal="item.component==='2'"
        :to="item.frontUrl"
      >
        <side-item :key="item.id" :index="item.component==='2'?'':item.frontUrl">
          <span slot="icon" class="_icon" v-html="item.icon"></span>
          <span slot="title">{{item.title}}</span>
        </side-item>
      </app-link>

      <sub-side
        v-else-if="hasChildren(item)&&item.type==='1'"
        :key="item.id"
        :index="item.frontUrl||item.id"
      >
        <span slot="icon" class="_icon" v-html="item.icon"></span>
        <span slot="title">{{item.title}}</span>

        <sides v-for="child in item.children" :item="child" :key="child.id"></sides>
      </sub-side>
    </template>
  </div>
</template>

<script>
import SideItem from "./SideItem";
import AppLink from "./Link";
import SubSide from "./SubSide";
import menuMixin from "./menu-mixin.js";
export default {
  name: "Sides",
  mixins: [menuMixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  components: {
    SideItem,
    AppLink,
    SubSide
  }
};
</script>

<style lang="scss" scoped>
</style>
