<script setup>
defineProps({
  usernames: {
    type: Object,
  },
  user: {
    type: Object,
  },
});

const emit = defineEmits(["on-create-convo"]);
</script>

<script>
/**
 * @vue-prop {Object} usernames - user ids as keys and associated their associated username
 * @vue-prop {Object} user - current user
 *
 * @vue-event {number} onCreateConvo - creates a new convo with the selected friend using their id
 */

export default {
  name: "MsgListOptionsFriend",
};
</script>

<template>
  <div class="d-flex flex-column align-items-center w-100">
    <h4 class="align-self-start m-3 mb-2">Friends</h4>
    <button
      class="btn btn-outline-secondary w-75 m-2"
      v-for="j of user.friends"
      :key="j"
      @click="emit('on-create-convo', parseInt(j))"
    >
      {{ usernames[j] }}
    </button>
  </div>
</template>
