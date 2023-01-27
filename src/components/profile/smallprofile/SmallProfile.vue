<script setup>
import { nextTick, ref } from "vue";
import IconLink from '@/components/reusable/IconLink.vue'
import FriendsTab from './FriendsTab.vue'
import PostTab from './PostTab.vue'
import ProfileTab from './ProfileTab.vue'
import AllPosts from "@/components/allposts/AllPosts.vue";

const props = defineProps({
  user: Object,
  usernames: Object
});

const firstNav = ref('active');
const firstTab = ref('');
const restNav = ref('');
const restTab = ref('');
const allTabs = {
  'Posts': {'icon': 'pencil', 'tab': '#postTab'}, 
  'Profile': {'icon': 'file-person', 'tab': '#profileTab'}, 
  'Friends': {'icon': 'people', 'tab': '#friendTab'}
  }


const resetProfile = (f) => {
  firstNav.value = ''
  firstTab.value = 'tab-pane fade show active'
  restNav.value = 'nav-link'
  restTab.value = 'tab-pane fade'

  nextTick(() => {
    firstNav.value = 'active'
    firstTab.value = ''
    restNav.value = ''
    restTab.value = ''
    window.scrollTo({ behavior: "instant", top: 0 });
  });
}
</script>

<script>
/**
 * @vue-prop {Object} user - current user
 * @vue-prop {Object} usernames - user ids as keys and associated their associated username
 * 
 * @vue-data {string} firstNav - style classes
 * @vue-data {string} firstTab - style classes
 * @vue-data {string} restNav - style classes 
 * @vue-data {string} allTabs - style classes
 */

export default {
  name: 'SmallProfile'
}
</script>

<template>
  <div class="w-100 px-3"> 
    <ul class="nav nav-tabs my-2" id="smallProfile" role="tablist">
      <li 
        v-for="[text, info] of Object.entries(allTabs)"
        class="nav-item mx-2"
        :key="text"
      >
        <IconLink 
          :icon-class="info.icon"
          :extra-attrs="{'data-bs-toggle': 'tab', 'role': 'tab', 'href': info.tab}"
          :link-style="(text === 'Posts' ? firstNav : restNav) + ' nav-link mb-0 ' "
        >
          <span class="profile-tab-text"> {{ text }} </span>
        </IconLink>
      </li>
    </ul>
    <div class="tab-content d-flex justify-content-center w-100" id="smallProfileContent">
      <PostTab :first-tab="firstTab"/>
      <ProfileTab :user="user" :rest-tab="restTab" />
      <FriendsTab 
        :user-friends="user.friends" 
        :usernames="usernames" 
        :rest-tab="restTab" @on-reset="resetProfile"  
      />
    </div>
  </div>
</template>

<style lang="scss">
.tab-pane__div {
  width: 85%;
  min-height: 70vh;
}
.profile__icon_small {
  font-size: 4.5rem;
  background-size: 4.5rem;
  margin: 0;
}

@media only screen and (max-width: 449px) {
  .profile-tab-text {
    display: none;
  }
}
</style>
