<script setup>
import { RouterLink } from 'vue-router'
import IconButton from '@/components/reusable/IconButton.vue'

defineProps({
  currentId: {
    type: Number
  },
  post: {
    type: Object
  },
  usernames: {
    type: Object
  }
})

const emit = defineEmits(['update-content-text'])
</script>

<script>
/**
 * @vue-prop {Object} currentId - signed-in user 
 * @vue-prop {Object} post - post content
 * @vue-prop {Object} usernames - user ids as keys and associated their associated usernames
 * 
 * @vue-event {number} updateContentText - if post.id is the same as the signed-in user, 
 * the option to edit (changing post.edit) appears. 
 */

export default {
  name: 'PostHeader'
}
</script>

<template>
  <div class="d-flex justify-content-between p-2">
    <div class="d-flex">
      <RouterLink
        :to="{ name: 'profile', params: { id: post.id } }"
        class="text-decoration-none text-info my-1 py-1 px-2"
      >
        {{ usernames[post.id] }}
      </RouterLink>
      <template v-if="post.postLocation !== post.id">
        <span class="bi bi-arrow-right d-flex align-self-center mx-2 my-1"></span>
        <RouterLink
          :to="{ name: 'profile', params: { id: post.postLocation } }"
          class="text-decoration-none text-info my-1 py-1 px-2"
        >
          {{ usernames[post.postLocation] }}
        </RouterLink>
      </template >
    </div>
    <IconButton
      v-if="post.id === currentId && !post.edit"
      :button-style="'border-0'"
      :icon-class="'pencil-square fs-6'" 
      @on-click="emit('update-content-text', post.pid)"
    />
  </div>
</template>

<style scoped>
.card-body-dimensions {
  min-height: 8rem;
}
</style>

