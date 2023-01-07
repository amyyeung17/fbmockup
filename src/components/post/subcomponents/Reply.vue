<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconButton from "@/components/reusable/IconButton.vue";

defineProps({
  currentUsername: {
    type: String
  },
  post: {
    type: Object
  }
})

const emit = defineEmits(['enter-reply'])
</script>

<template>
  <div class="collapse" :id="'collapseinput' + post.pid">
    <CustomInput
      :placeholder-text="'Write your reply here...'"
      :form-class="'card-footer d-flex flex-row align-items-center w-100'"
      :input-class="'me-1'"
      :label-text="'reply' + post.pid"
      v-bind="$attrs"
    >
      <template #inputLabel>
        <label :for="'reply' + post.pid" class="text-nowrap mx-2">
          {{ currentUsername }}
        </label>
      </template>
      <template #inputButton>
        <IconButton
          :button-color="'btn-primary'"
          :icon-class="'reply-fill'"
          :extra-attrs="{'data-bs-toggle': 'collapse', 'data-bs-target': `#collapseinput${post.pid}`,
            'aria-controls': `#collapseinput${post.pid}`}"
          @handle-click="emit('enter-reply', post.pid)"
        />
      </template>
    </CustomInput>
  </div>
</template>
