<script setup>
import { useRoute } from "vue-router";
import ConvoFriendOptions from "./ConvoFriendOptions.vue";
import ConvoBody from "./ConvoBody.vue";

const route = useRoute();

defineProps({
  recipient: Number,
  windowSize: Boolean,
  usernames: Object,
});
</script>

<script>
/**
 * Fallthrough attributes of convoItems (Object) and @send-message are passed to ConvoBody.
 *
 * @vue-prop {number} recipient - user id of the current message's recipient
 * @vue-prop {boolean} windowSize - if window.width > 991
 * @vue-prop {Object} usernames -  user ids as keys and associated their associated username
 */

export default {
  inheritAttrs: false,
  name: "ConvoComposite",
};
</script>

<template>
  <div v-if="parseInt(route.params.id) !== recipient" class="w-100 m-2 p-1">
    <ConvoFriendOptions
      :recipient="recipient"
      :window-size="windowSize"
      :current-username="usernames[recipient]"
    />
    <ConvoBody :usernames="usernames" v-bind="$attrs" />
  </div>
  <p v-else class="text-secondary fs-4 m-5">No messages to show!</p>
</template>
