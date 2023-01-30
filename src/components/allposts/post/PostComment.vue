<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  postComments: {
    type: Object,
  },
  usernames: {
    type: Object,
  },
});

const commentsDisplay = computed(() => {
  return props.postComments.comments.length > 3 && !props.postComments.display
    ? props.postComments.comments.slice(0, 3)
    : props.postComments.comments;
});
</script>

<script>
/**
 * @vue-prop {Object} postComments - comments that correspond with postPid
 * @vue-prop {Object} usernames - user ids as keys and associated their associated username
 *
 * @vue-computed {Array} commentsDisplay - subset or all comments depending on postComments.display (user option)
 */

export default {
  name: "PostComment",
};
</script>

<template>
  <ul class="list-group list-group-flush w-100 flex-grow-1">
    <template v-if="postComments.comments.length !== 0">
      <li v-for="c in commentsDisplay" :key="c.id" class="list-group-item py-3">
        <RouterLink
          class="d-inline link-primary text-decoration-none w-50 px-1 py-2"
          :to="{ name: 'profile', params: { id: c.id } }"
        >
          {{ usernames[c.id] }}:
        </RouterLink>
        <p class="d-inline text-break mx-1">{{ c.c }}</p>
      </li>
    </template>
    <li v-else class="list-group-item text-center align-middle">
      <p class="text-secondary my-1">No comments available</p>
    </li>
  </ul>
</template>
