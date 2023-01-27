

<script setup>
import { ref } from "vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import Alert from "@/components/reusable/Alert.vue"

defineProps({
  error: Boolean,
  errorMessage: String
});
</script>

<script>
/**
 * Fallthrough attributes of @send-event, @handle-alert, and v-model (modelValue & @update:modelValue) are passed to CustomInput.
 * 
 * @vue-prop {boolean} error 
 * @vue-prop {string} errorMessage 
 */

export default {
  inheritAttrs: false,
  name: 'NewPost'
}
</script>


<template>
  <Alert v-bind="$attrs" :condition="error" :alert-style="'alert-warning'">
    <template #msg>
      <strong> Whoops! </strong>
      {{ errorMessage }} 
    </template>
  </Alert>
  <CustomInput
    :form-class="'input-group w-75 mb-3 newpost'"
    :placeholder-text="'Start typing to create a post...'"
    :error="error"
    :label-text="'posting'"
    v-bind="$attrs"
  >
    Post
  </CustomInput>
</template>

<style lang="scss">

@include media-breakpoint-down(xs) {
  .newpost {
    width: 90% !important;
  }
};

</style>