<script setup>
import { useCurrentStore } from "@/stores/currentstate";
import { useMessageStore } from "@/stores/message";
import IconLink from '@/components/reusable/IconLink.vue'

const currentStore = useCurrentStore();
const messageStore = useMessageStore();

const allLinks = {'Profile': 'person-fill', 'Message': 'send-fill', 'Info': 'info', 'Games': 'controller', 'Map': 'map-fill', 'Settings': 'gear-fill'}

//send to home
const setMessage = () => {
  const m = messageStore.getAllCurrent 

  if (currentStore.currentId !== -1) {
    if (m.length === 0) {
      currentStore.setMsg(currentStore.currentId);
      return;
    }
    if (m[0].msg.length !== 0) {
      currentStore.setMsg(m[0].mid);
    }
  }
}

const getLink = (type) => {
  if (type === 'Profile' || type === 'Message') {
    return (currentStore.currentId !== -1 ? { name: type.toLowerCase(), params: { id: currentStore.currentId }} : '/home')
  } else if (type === 'Info') {
    return '/info'
  } else {
    return ''
  }
}

</script>

<template>
  <nav class="border-end h-25 m-1 p-3" id="menu-container">
    <IconLink 
      v-for="[text, iconType] of Object.entries(allLinks)" 
      :key="text"
      :icon-class="iconType"
      :to-location="getLink(text)"
      @handle-click="text === 'Message' ? setMessage() : () => void 0"
    >
      {{currentStore.getWindow ? text : ''}}
    </IconLink>
  </nav>
</template>

<style scoped>
#menu-container {
  max-height: 35rem;
}

</style>
