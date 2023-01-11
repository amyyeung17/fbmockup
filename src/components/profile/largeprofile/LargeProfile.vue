<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { RouterLink } from 'vue-router'
import FriendsList from './FriendsList.vue'
import ProfileInfo from './ProfileInfo.vue'
import AllPosts from "@/components/allposts/AllPosts.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
</script>

<template>
  <MainStructure :page="'profile'">
    <template #left>
      <ProfileInfo v-bind="$attrs" />
      <FriendsList v-bind="$attrs"/>
    </template> 
    <template #middle>
      <AllPosts />
    </template>
  </MainStructure>
</template>
