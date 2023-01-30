<script setup>
import { RouterLink } from "vue-router";
import CustomInput from "../../reusable/CustomInput.vue";

defineProps({
  post: {
    type: Object,
    default: () => ({}),
  },
  usernames: {
    type: Object,
  },
});

const emit = defineEmits(["enter-post"]);
</script>

<script>
/**
 * Fallthrough attributes of v-model (modelValue & @update:modelValue) are passed to CustomInput.
 *
 * @vue-prop {Object} post - post content
 * @vue-prop {Object} usernames - user ids as keys and associated their associated usernames
 *
 * @vue-event {string} enterPost - controls whether content is updated or not. Options are only
 * available when post.edit is true.
 */

export default {
  inheritAttrs: false,
  name: "PostBody",
};
</script>

<template>
  <div class="card-body card-body-dimensions pt-0">
    <p v-if="!post.edit" class="card-text fs-3 pb-4">{{ post.content }}</p>
    <CustomInput
      v-else
      :label-text="'options'"
      :input-class="'w-100'"
      v-bind="$attrs"
    >
      <template #inputButton>
        <div class="d-flex justify-content-end w-100">
          <button
            class="btn btn-outline-secondary m-2"
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
    <p class="d-inline me-2 card-subtitle text-muted">
      {{ post.likes.length + " likes" }}
    </p>
    <p
      class="d-inline text-primary"
      v-for="l in post.likes.length"
      :key="`post${post.pid}-like-${l}`"
    >
      <RouterLink
        class="link-primary text-decoration-none my-0"
        :to="{ name: 'profile', params: { id: post.likes[l - 1] } }"
      >
        {{ usernames[post.likes[l - 1]] }} </RouterLink
      >{{ l !== post.likes.length ? ", " : "" }}
    </p>
  </div>
</template>

<style scoped>
.card-body-dimensions {
  min-height: 8rem;
}
</style>
