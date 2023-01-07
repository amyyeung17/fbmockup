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
const emit = defineEmits(['handle-click'])
</script>

<template>
  <button
    class="btn align-middle px-2 py-1 mx-1 fs-6"
    :class="buttonStyle + ' ' + buttonColor"
    :disabled="disabledStat"
    :id="buttonId"
    type="button"
    v-bind="extraAttrs"
    @click="emit('handle-click')"
  > 
    <i :class="'bi bi-' + iconClass + ' icon mx-1 fs-5'"></i>
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
