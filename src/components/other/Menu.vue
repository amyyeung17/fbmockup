<script setup>
import { useCurrentStore } from "@/stores/currentstate";
import { useMessageStore } from "@/stores/message";
import IconLink from '@/components/reusable/IconLink.vue'

const currentStore = useCurrentStore();
const messageStore = useMessageStore();

const allLinks = {'Profile': 'person-fill', 'Message': 'send-fill', 'Info': 'info', 'Games': 'controller disabled', 'Map': 'map-fill', 'Settings': 'gear-fill'};


//Associates the appropriate links and button.
const getLink = (type) => {
  if (type === 'Profile' || type === 'Message') {
    return (currentStore.userId !== -1 ? { name: type.toLowerCase(), params: { id: currentStore.userId }} : '/home')
  } else if (type === 'Info') {
    return '/info'
  } else {
    return ''
  }
}

//Sets which options are available based on signed in status
const setLinkState = (type) => {
  return (
    ['Games', 'Map', 'Settings'].includes(type) 
    || (['Profile', 'Message'].includes(type) && currentStore.userId === -1) ? 
      'disabled' 
    : 
      ''
  )
}
</script>

<template>
  <nav class="border-end h-25 m-1 py-3 px-4" id="menu">
    <IconLink 
      v-for="[text, iconType] of Object.entries(allLinks)" 
      :key="text"
      :icon-class="iconType"
      :link-style="`nav-link menu-link ${setLinkState(text)}`"
      :to-location="getLink(text)"
      @on-link-click="text === 'Message' ? messageStore.setMsg() : () => void 0"
    >
      {{currentStore.getWindow ? text : ''}}
    </IconLink>
  </nav>
</template>

<style lang="scss" scoped>
@include media-breakpoint-down(sm) { 
  #menu {
    display: flex;
    border-right: 0 !important ;
    border-bottom: 2px solid $gray-200 !important;
    flex-wrap: wrap;
    height: 100% !important;
    justify-content: space-evenly;
    margin-bottom: 8px !important; 
    padding: 0px !important;
    width: 100%;
  }

  .menu-link{
    margin: 4px 0px !important;
    padding: 8px;
  }

};

@include media-breakpoint-up(sm) {
  #menu {
    max-height: 30rem;
  }
}

.nav-link:hover {
  background-color: $gray-200;
}

</style>
