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
  <h5 v-else class="m-5">No messages to show!</h5>
</template>

<style scoped>
#msg-mid {
  width: 65%;
}

@media only screen and (min-width: 992px) {
  #msg-mid {
    width: clamp(45%, 45%, 50%);
  }
}
</style>
