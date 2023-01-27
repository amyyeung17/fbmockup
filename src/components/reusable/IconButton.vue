<script setup>
  const props = defineProps({
    iconClass: {
      type: String,
      default: ''
    },
    buttonColor: {
      type: String,
      default: 'btn-outline-primary'
    },
    buttonId: {
      type: String,
      default: ''
    },
    buttonStyle: {
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
    }
  })
const emit = defineEmits(['on-click'])
</script>

<script>
/**
 * @vue-prop {string} [iconClass = ''] - type of icon used in the button
 * @vue-prop {string} [buttonColor = 'btn-outline-primary'] - color of the button
 * @vue-prop {string} [buttonId = ''] - id for the button
 * @vue-prop {string} [buttonStyle = ''] - additional style classes to apply
 * @vue-prop {boolean} [disabledStat = false] - condition which the button is disabled
 * @vue-prop {Object} [extraAttrs = {}] - any extra attributes that are not defined 
 * 
 * @vue-event {...} onClick - general callback
 */

export default {
  name: 'IconButton'
}
</script>

<template>
  <button
    class="btn align-middle px-2 py-1 mx-1 fs-6"
    :class="buttonStyle + ' ' + buttonColor"
    :disabled="disabledStat"
    :id="buttonId"
    type="button"
    v-bind="extraAttrs"
    @click="emit('on-click')"
  > 
    <span :class="'bi bi-' + iconClass + ' icon mx-1 fs-5'"></span>
    <slot> </slot>
  </button>
</template>

<style scoped>

@media only screen and (max-width: 991px) {
  .icon {
    font-size: 1.8rem;
  }
}
@media only screen and (min-width: 992px) {
  .icon {
    font-size: 1.6rem;
  }
}
</style>
