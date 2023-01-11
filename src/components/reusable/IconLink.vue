<script setup>
import { RouterLink } from "vue-router";

defineProps({
  iconClass: {
    type: String,
    default: ''
  },
  disabledStat: {
    type: Boolean,
    default: false
  },
  extraAttrs: {
    type: Object,
    default: {}
  },
  linkStyle: {
    type: [String, Array],
    default: 'link-primary text-decoration-none'
  },
  toLocation: {
    type: [Object, String],
    default: '#'
  }
})

const emit = defineEmits(['handle-click'])
</script>

<template>
  <RouterLink
    :to="toLocation"
    :class="`my-2 fs-5 ${linkStyle}`"
    v-bind="extraAttrs"
    @click="emit('handle-click')"
  >
    <i v-if="iconClass !== ''" :class="'bi bi-' + iconClass + ' mx-2 fs-5'"></i>
    <slot> </slot>
  </RouterLink>
</template>
