<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref } from "vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import Alert from "@/components/reusable/Alert.vue"
defineProps({
  error: Boolean,
  errorMessage: String
});
</script>

<template>
  <Alert v-bind="$attrs" :condition="error">
    <template #errorMsg>
      <strong> Whoops! </strong>
      {{ errorMessage }} 
    </template>
  </Alert>
  <CustomInput
    :form-class="'input-group w-75 mb-3'"
    :placeholder-text="'Start typing to create a post...'"
    :error="error"
    :label-text="'posting'"
    v-bind="$attrs"
  >
    Post
  </CustomInput>
</template>
