<script setup>
import { RouterLink } from 'vue-router'
import AllPosts from "@/components/post/AllPosts.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
defineProps({
  user: Object,
  usernames: Object
});

</script>

<template>
  <MainStructure :page="'profile'">
    <template #left>
      <div class="d-flex flex-column" id="lg-profile-container">
        <div class="border rounded w-100 m-3" id="lg-info-div">
          <p class="m-2"><i class="bi bi-pin-fill m-1"></i> {{ user.desc }}</p>
          <p class="m-2"><i class="bi bi-pin-map-fill m-1"></i> {{ user.location }}</p>
        </div>
        <div class="border d-flex flex-column align-items-center rounded w-100 m-3" id="lg-friend-div">
          <h5 class="m-2"><i class="bi bi-people"></i> Friends List</h5>
          <RouterLink
            class="btn btn-outline-secondary d-flex justify-content-center w-75 m-1"
            v-for="(f, index) of user.friends"
            :to="{ name: 'profile', params: { id: f } }"
            :key="`user${user.id}-friend${f}`"
          >
            {{ usernames[index] }}
          </RouterLink>
        </div>
      </div>
    </template> 
    <template #middle>
      <AllPosts />
    </template>
  </MainStructure>
</template>

<style scoped>
#lg-friend-div {
  height: 35vh;
  overflow: auto;
}
#lg-profile-container {
  min-height: 70vh;
}
#lg-info-div {
  min-height: 12vh;
}
</style>
