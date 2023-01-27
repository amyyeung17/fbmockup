<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";

import Banner from './Banner.vue'
import LargeProfile from "./largeprofile/LargeProfile.vue";
import SmallProfile from "./smallprofile/SmallProfile.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const route = useRoute();
const usernames = userStore.getAllUsernames()

//When navigating to a new page, reset the scroll.
onMounted(() => {
  window.scrollTo({ behavior: "instant", top: 0 });
});
</script>

<template>
  <div class="col">
    <div class="bg-secondary w-100" id="profile-cover"> </div>
    <Banner
      :current-user="parseInt(route.params.id) !== currentStore.userId && currentStore.userId !== -1"
      :profile-username = "usernames[route.params.id]"
      :friend-stat="userStore.getUser(route.params.id).friends.indexOf(currentStore.userId) !== -1"
      @edit-friends="userStore.editFriends(route.params.id, currentStore.userId)"
    />
    <LargeProfile
      v-if="currentStore.getWindow"
      :user="userStore.getUser(route.params.id)"
      :usernames="usernames"
    />
    <SmallProfile
      v-else
      :user="userStore.getUser(route.params.id)"
      :usernames="usernames"
    />
  </div>
</template>

<style scoped>
#profile-cover {
  height: 200px;
}
</style>
