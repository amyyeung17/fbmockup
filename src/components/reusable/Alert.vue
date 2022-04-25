<script setup>
import { defineProps } from "vue";

defineProps({
  condition: Boolean,
});
</script>

<template>
  <div v-if="condition" class="d-flex flex-column align-items-center w-100">
    <div
      class="alert alert-info alert-dismissible fade show m-2"
      id="alert-size"
      role="alert"
    >
      <slot></slot>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<style>
#alert-size {
  width: clamp(75%, 80%, 100%);
}
</style>
