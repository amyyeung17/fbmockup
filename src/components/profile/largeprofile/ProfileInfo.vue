<script setup>
defineProps({
  user: {
    type: Object,
  },
});
</script>

<script>
/**
 * @vue-prop {Object} user - current user
 */

export default {
  name: "ProfileInfo",
};
</script>

<template>
  <div class="bg-light w-100 p-3">
    <div class="border bg-white py-2 px-3" id="lg-info-div">
      <h4 class="m-2"><span class="bi bi-person-fill"></span> Profile</h4>
      <div class="border-bottom w-100 h-0 mb-1"></div>
      <p class="m-2">
        <span class="bi bi-pin-fill m-1"></span> {{ user.desc }}
      </p>
      <p class="m-2">
        <span class="bi bi-pin-map-fill m-1"></span> {{ user.location }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#lg-info-div {
  min-height: 12vh;
}
</style>
