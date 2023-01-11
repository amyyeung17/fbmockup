<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { useRoute } from "vue-router";
import AddFriend from './AddFriend.vue'
import ConvoBody from './ConvoBody.vue'
const route = useRoute();

defineProps({
  currentMsg: Number,
  windowSize: Boolean,
  usernames: Object 
})

/**
 * Component - 
 * Composite of AddFriend.vue and ConvoBody.vue
 * Fallthrough attributes allows @send-msg to be binded to an input in ConvoBody.vue
 */
</script>

<template>
  <div
    v-if="parseInt(route.params.id) !== currentMsg"
    class="w-100 m-2 p-1"
  >
    <AddFriend
      :recipient="currentMsg"
      :window-size="windowSize"
      :current-username="usernames[currentMsg]"
    />
    <ConvoBody :usernames="usernames" v-bind="$attrs" />
  </div>
  <p v-else class="text-secondary fs-4 m-5">No messages to show!</p>
</template>
