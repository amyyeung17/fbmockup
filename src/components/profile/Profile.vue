<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";

import Banner from './subcomponents/Banner.vue'
import LargeProfile from "./subcomponents/LargeProfile.vue";
import SmallProfile from "./subcomponents/SmallProfile.vue";
import Post from "@/components/post/Post.vue";
import IconButton from '@/components/reusable/IconButton.vue'
import Dropdown from '@/components/reusable/Dropdown.vue'

const userStore = useUserStore();
const currentStore = useCurrentStore();
const route = useRoute();
const usernames = userStore.getAllUsernames()
onMounted(() => {
  window.scrollTo({ behavior: "instant", top: 0 });
});

</script>

<template>
  <div class="col">
    <div class="bg-secondary w-100" id="profile-cover"> </div>
    <Banner
      :current-user="parseInt(route.params.id) !== currentStore.currentId && currentStore.currentId !== -1"
      :current-username = "usernames[route.params.id]"
      :friend-stat="userStore.getUser(route.params.id).friends.indexOf(currentStore.currentId) !== -1"
      @edit-friends="userStore.editFriends(route.params.id, currentStore.currentId)"
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

<style>
.div_size {
  width: clamp(65%, 65%, 70%);
}
#profile-cover {
  height: 200px;
}
</style>
