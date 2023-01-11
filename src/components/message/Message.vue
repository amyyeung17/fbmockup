<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { useMessageStore } from "@/stores/message";
import MessageList from "./msglist/MessageList.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
import Convo from "./convo/Convo.vue";
import IconButton from '../reusable/IconButton.vue'

const userStore = useUserStore();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter()
const usernames = userStore.getAllUsernames()
const currentConvo = ref([])

/**
 * When going to the url directly
 */
onMounted(() => {
  if (currentStore.currentId === -1) {
    router.push('/home')
  }
})
/**
 * Updates currently displaed message's recipient (currentStore.currentMsg) when navigating
 * If user has no messages, the value is set to the current user.  
 * */

const updateMessage = () => {
  currentConvo.value = messageStore.getAllMsgs(route.params.id);
  if (currentConvo.value.length !== 0 || currentStore.currentMsg === -1) {
    currentStore.setMsg(currentConvo.value[0].mid);
  } else {
    currentStore.setMsg(route.params.id);
  }
}

/**
 * When route changes, remove unsent messages.
 * If navigating within /message (update by switching current user), call updateMessage
*/
watch(
  route,
  () => {
    if (currentStore.currentId !== -1 && route.path.includes('message')) {
      if (messageStore.getAllMsgs(route.params.id).length !== 0) {
        messageStore.removeEmpty(currentStore.currentId);
      }
      if (route.path.includes('message')) {
        updateMessage();
      }
    }
  },
  { immediate: true }
);

/**
 * Callback function for starting new conversation.
 * If user selects a friend who they have convo history, set the recipient id.
 * Otherwise, add a new conversation. 
 * 
 * TODO - currentStore.setMsg() -> called after if (statement === 1), remove from message.js (?)
 */
const handleNew = (id) => {
  const mes = messageStore.getAllCurrent
  if ([...mes.map(m => m.mid)].indexOf(id) !== -1) {
    currentStore.setMsg(id)
  } else {
    messageStore.update(id);
  }
}

/**
 * If user is not 'signed in', return empty array during initial mount
 * to allow onMounted hook to proceed. 
 */
const getCurrentMsgs = computed(() => {
  return (
    currentStore.currentId !== -1 ?
      messageStore.getCurrentMsg(route.params.id)
    : 
      []
  )
})

</script>

<template>
  <MainStructure :page="'msg'"> 
    <template #left> 
      <MessageList
        :preview-list="messageStore.getAllMsgs(route.params.id)"
        :user="userStore.getCurrentUser()"
        :usernames="usernames"
        :md-breakpoint="currentStore.windowWidth >= 576"
        :button-breakpoint="currentStore.windowWidth >= 615"
        @handle-new="handleNew"
        @select-friend="currentStore.setMsg"
      />
    </template>
    <template #middle> 
      <Convo
        :convo-items="getCurrentMsgs" 
        :current-msg="currentStore.currentMsg"
        :usernames="usernames"
        :window-size="currentStore.getWindow"
        @send-msg="messageStore.enterMsg"
      />
    </template>
    <template #right>
      <template id="optional-buttons"> 
        <h3 class="text-center m-2"> {{ usernames[currentStore.currentMsg] }} </h3>
        <i class="bi bi-person-circle profile-pic" id="iconpic"></i>
        <RouterLink
          class="list-group-item list-group-item-action p-2"
          :to="{name: 'profile', params: { id: currentStore.currentMsg }}"
        >
          Profile
        </RouterLink>
        <button
          class="list-group-item list-group-item-action disabled p-2"
          disabled
          aria-disabled="true"
          v-for="[index, text] of ['Photos', 'Options', 'Settings'].entries()"
          :key="index"
        >
          {{ text }}
        </button>
      </template>
    </template>
  </MainStructure>
</template>

<style lang="scss" scoped>
#iconpic {
  font-size: 5rem
}
#optional-buttons {
  display: none;
}
@include media-breakpoint-up(lg) { 
  #optional-buttons {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

</style>
