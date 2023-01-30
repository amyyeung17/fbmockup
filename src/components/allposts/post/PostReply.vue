<script setup>
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconButton from "@/components/reusable/IconButton.vue";

defineProps({
  currentUsername: {
    type: String,
  },
  postPid: {
    type: Number,
  },
});

const emit = defineEmits(["enter-reply"]);
</script>

<script>
/**
 * Fallthrough attributes of v-model (modelValue & @update:modelValue) are passed to CustomInput.
 *
 * @vue-prop {string} currentUsername - current user's username
 * @vue-prop {Object} postPid - current post's pid (identifier)
 *
 * @vue-event {Number} enterReply - adds new comment to the associated post
 */
export default {
  inheritAttrs: false,
  name: "PostReply",
};
</script>

<template>
  <div class="collapse" :id="'collapseinput' + postPid">
    <CustomInput
      :placeholder-text="'Write your reply here...'"
      :form-class="'card-footer d-flex flex-row align-items-center w-100'"
      :input-class="'me-1'"
      :label-text="'reply' + postPid"
      v-bind="$attrs"
    >
      <template #inputLabel>
        <label :for="'reply' + postPid" class="text-nowrap mx-2">
          {{ currentUsername }}
        </label>
      </template>
      <template #inputButton>
        <IconButton
          :button-color="'btn-primary'"
          :icon-class="'reply-fill'"
          :extra-attrs="{
            'data-bs-toggle': 'collapse',
            'data-bs-target': `#collapseinput${postPid}`,
            'aria-controls': `#collapseinput${postPid}`,
          }"
          @on-click="emit('enter-reply', postPid)"
        />
      </template>
    </CustomInput>
  </div>
</template>
