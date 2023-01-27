<script setup>

defineProps({
  condition: {
    type: Boolean
  },
  alertStyle: {
    type: String,
    default: 'alert-info'
  }
});

const emit = defineEmits(['handle-alert'])

</script>

<script>
/**
 * @vue-prop {boolean} condition - whether component should appear or not 
 * 
 * @vue-event {undefined} handleError - removes error 
 */

export default {
  name: 'Alert'
}
</script>

<template>
  <template v-if="condition">
    <div
      :class="`alert ${alertStyle} alert-dismissible w-100 fade show m-2`"
      role="alert"
    >
      <span> <slot name="msg"></slot> </span>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="emit('handle-alert')"
      > 
      </button>
    </div>
  </template>
</template>

