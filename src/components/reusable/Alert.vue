<script setup>
const props = defineProps({
  condition: Boolean,
});

const emit = defineEmits(['handle-error'])

</script>

<template>
  <template v-if="condition">
    <div
      class="alert alert-info alert-dismissible  w-100 fade show m-2"
      role="alert"
    >
      <span> <slot name="errorMsg"></slot> </span>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="emit('handle-error')"
      > 
        <slot name="errorBtn"></slot>
      </button>
    </div>
  </template>
</template>

