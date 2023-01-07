<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { RouterLink } from 'vue-router'
import CustomInput from '../../reusable/CustomInput.vue'

defineProps({
  post: {
    type: Object,
    default: {}
  },
  usernames: {
    type: Object
  }
})

const emit = defineEmits(['enter-post'])
</script>

<template>
  <div class="card-body card-body-dimensions pt-0">
    <p v-if="!post.edit" class="card-text fs-3 pb-4"> {{ post.content }} </p>
      <CustomInput
        v-else
        :label-text="'options'"
        :input-class="'w-100'" 
        v-bind="$attrs"
      > 
        <template #inputButton>
          <div class="d-flex justify-content-end w-100">
          <button
            class="btn btn-outline-secondary m-2 "
            @click="emit('enter-post', 'cancel')"
          >
            Cancel
          </button>
          <button
            class="btn btn-primary m-2"
            @click="emit('enter-post', 'save')"
          >
            Save
          </button>
        </div>
        </template>
    </CustomInput>
    <p class="d-inline me-2 card-subtitle text-muted"> {{ post.likes.length + " likes" }} </p>
    <p
      class="d-inline card-subtitle"
      v-for="l in post.likes.length"
      :key="`post${post.pid}-like-${l}`"
    >
      {{ usernames[post.likes[l - 1]] + (l !== post.likes.length ? ', ' : '')}}
    </p>
  </div>
</template>

<style scoped>
.card-body-dimensions {
  min-height: 8rem;
}
</style>