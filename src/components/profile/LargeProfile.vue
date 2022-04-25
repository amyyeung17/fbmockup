<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  user: Object,
});

const emit = defineEmits(["push-route"]);
</script>

<template>
  <div class="d-flex flex-column" id="lg-profile-container">
    <div class="border w-100 m-3" id="lg-info-div">
      <p class="m-2"><i class="bi bi-pin-fill"></i> &nbsp; {{ user.desc }}</p>
      <p class="m-2">
        <i class="bi bi-pin-map-fill"></i> &nbsp; {{ user.location }}
      </p>
    </div>
    <div class="border w-100 m-3" id="lg-friend-div">
      <h5 class="m-2"><i class="bi bi-people"></i> Friends List</h5>
      <div class="d-flex flex-column align-items-center">
        <button
          class="btn btn-outline-secondary d-flex justify-content-center w-75 m-1"
          @click="emit('push-route', f)"
          v-for="f of user.friends"
          :key="`user${user.id}-friend${f}`"
        >
          <slot name="friend" :friend-id="f"> </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#lg-friend-div {
  height: 35vh;
  overflow: auto;
}
#lg-profile-container {
  width: 30%;
}
#lg-info-div {
  min-height: 12vh;
}
</style>
