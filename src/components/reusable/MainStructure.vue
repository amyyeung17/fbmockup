<script setup>
defineProps({
  condition: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="d-flex justify-content-around w-100">
    <div class="d-flex flex-column align-items-center w-25" id="left">
      <slot name="left"></slot>
    </div>
    <div class="d-flex flex-column align-items-center w-50" id="middle">
      <slot name="middle"></slot>
    </div>
    <div class="d-flex flex-column align-items-center w-25" id="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style>
@media only screen and (max-width: 991px) {
  #left {
    width: 27.5%;
  }
  #middle {
    width: 50%;
  }
  #right {
    width: 22.5%;
  }
}
@media only screen and (min-width: 992px) {
  #left {
    width: 25%;
  }
  #middle {
    width: 50%;
  }
  #right {
    width: 25%;
  }
}
</style>
