<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  postComments: {
    type: Object
  },
  usernames: {
    type: Object
  }
});

const setComments = () => {
  return(props.postComments.comments.length > 3 && !props.postComments.display ?
    props.postComments.comments.slice(0, 3)
    :
    props.postComments.comments
  ) 
}
</script>

<template>
  <ul class="list-group list-group-flush">
    <template v-if="postComments.comments.length !== 0">
      <li
        v-for="c in setComments()"
        :key="c.id"
        class="list-group-item py-3"
      >
        <RouterLink
          class="d-inline nav-link w-50 px-2"
          :to="{ name: 'profile', params: { id: c.id }}"
        > 
          {{ usernames[c.id] }} :
        </RouterLink>
        <p class="d-inline text-break mx-1"> {{ c.c }} </p>
      </li>
    </template>
    <li v-else class="list-group-item text-center align-middle"> 
      <p class="my-1"> No comments available </p>
    </li>
  </ul>
</template>
