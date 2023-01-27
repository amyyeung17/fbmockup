<script setup>
import AllPosts from "@/components/allposts/AllPosts.vue";
import FriendsList from './FriendsList.vue'
import ProfileInfo from './ProfileInfo.vue'
import MainStructure from "@/components/reusable/MainStructure.vue";
</script>

<script>
/**
 * Fallthrough attributes of user (Object) is passed to ProfileInfo.
 * Fallthrough attributes of user (Object) and usernames {Object} are passed to ProfileInfo.
 */

export default {
  inheritAttrs: false,
  name: 'LargeProfile'
}
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
