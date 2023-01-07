<script setup>
import { nextTick, ref } from "vue";
import IconLink from '@/components/reusable/IconLink.vue'
import FriendsTab from '../smalltabs/FriendsTab.vue'
import ProfileTab from '../smalltabs/ProfileTab.vue'
import AllPosts from "@/components/post/AllPosts.vue";

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
  'Profile': {'icon': 'file-person', 'tab': '#infoTab'}, 
  'Friends': {'icon': 'people', 'tab': '#friendTab'}
  }

const allProps = {
  'Posts': {},
  'Profile': {'user' : props.user}
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

<template>
  <div class="w-100"> 
    <ul class="nav nav-tabs my-2" id="profileTab" role="tablist">
      <li 
        v-for="[text, info] of Object.entries(allTabs)"
        class="nav-item mx-2"
        :key="text"
      >
        <IconLink 
          :icon-class="info.icon"
          :extra-attrs="{'data-bs-toggle': 'tab', 'role': 'tab', 'href': info.tab}"
          :link-style="(text === 'Posts' ? firstNav : restNav) + ' mb-0 ' "
        >
          {{ text }}
        </IconLink>
      </li>
    </ul>
    <div class="tab-content d-flex justify-content-center w-100" id="profileTabContent">
      <div
        class="tab-pane fade show active tab-pane_div w-100 py-2"
        :class="firstTab"
        id="postTab"
      >
        <AllPosts />
      </div>
      <ProfileTab :user="user" :rest-tab="restTab" />
      <FriendsTab :user-friends="user.friends" :usernames="usernames" :rest-tab="restTab" @handle-reset="resetProfile"  />
    </div>
  </div>
</template>

<style>

.tab-pane__div {
  width: 85%;
  min-height: 70vh;
}
.profile__icon_small {
  font-size: 4.5rem;
  background-size: 4.5rem;
  margin: 0;
}
</style>
