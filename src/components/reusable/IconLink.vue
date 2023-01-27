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
    type: String,
    default: 'link-primary text-decoration-none'
  },
  toLocation: {
    type: [Object, String],
    default: '#'
  }
})

const emit = defineEmits(['on-link-click'])
</script>

<script>
/**
 * @vue-prop {string} [iconClass = ''] - type of icon used in the link
 * @vue-prop {boolean} [disabledStat = false] - condition which the link is disabled
 * @vue-prop {Object} [extraAttrs = {}] - any extra attributes that are not defined 
 * @vue-prop {string} [linkStyle = 'link-primary text-decoration-none'] - additional style classes to apply
 * @vue-prop {(Object | string)} [toLocation = '#'] - where to navigate (:to binding in RouterLink)
 * 
 * @vue-event {} onLinkClick - general callback
 */

 export default {
   name: 'IconLink'
 }
</script>

<template>
  <RouterLink
    :to="toLocation"
    :class="`my-2 fs-5 ${linkStyle}`"
    v-bind="extraAttrs"
    @click="emit('on-link-click')"
  >
    <span v-if="iconClass !== ''" :class="'bi bi-' + iconClass + ' mx-2 fs-5'"></span>
    <slot> </slot>
  </RouterLink>
</template>
