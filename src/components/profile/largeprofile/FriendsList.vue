<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  user: {
    type: Object
  },
  usernames: {
    type: Object
  }
});

</script>

<template>
  <div class="bg-light w-100 p-3"> 
    <div class="border bg-white w-100 mt-2 py-2 px-3 ">
      <h4 class="m-2"><i class="bi bi-people"></i> Friends List</h4>
      <div class="border-bottom w-100 h-0 mb-2"></div>
      <div class="d-flex flex-column align-items-center w-100 mh-100 overflow-auto" id="lg-friend-div"> 
        <RouterLink
          class="btn btn-outline-primary d-flex justify-content-center w-75 my-1"
          v-for="(f, index) of user.friends"
          :to="{ name: 'profile', params: { id: f } }"
          :key="`user${user.id}-friend${f}`"
        >
          {{ usernames[f] }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
#lg-friend-div {
  height: 30vh;
}
</style>
