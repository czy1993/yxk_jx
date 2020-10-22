<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>


export default {
  props: {
    to: {
      type: String,
      required: true
    },
    isExternal:{
      type:Boolean
    }
  },
  computed: {
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'div'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
