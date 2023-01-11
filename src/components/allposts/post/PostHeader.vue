<script setup>
import { RouterLink } from 'vue-router'
import IconButton from '@/components/reusable/IconButton.vue'

defineProps({
  currentId: {
    type: Number,
    default: 0
  },
  post: {
    type: Object,
    default: {}
  },
  usernames: {
    type: Object
  }
})

const emit = defineEmits(['update-content-text'])
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
        <i
          class="bi bi-arrow-right d-flex align-self-center mx-2 my-1"
        >
        </i>
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
      @handle-click="emit('update-content-text', post.pid)"
    />
  </div>
</template>

<style scoped>
.card-body-dimensions {
  min-height: 8rem;
}
</style>