<script setup>
import { defineEmits, defineProps, ref } from "vue";
import CustomInput from "@/components/reusable/CustomInput.vue";

defineProps({
  error: Boolean,
  errorMessage: String,
});
const emit = defineEmits(["change-error"]);

const formClass = ref(["input-group", "w-75", "mb-3"]);
</script>

<template>
  <CustomInput
    :form-class="formClass"
    :input-class="'form-control'"
    :placeholder-text="'Start typing to create a post...'"
    :error="error"
    :label-text="'posting'"
    aria-describedby="posting"
  >
    <template #alert>
      <div
        v-if="error"
        class="alert alert-warning alert-dismissible fade show w-100"
        id="alert"
        role="alert"
      >
        <strong> Whoops !</strong>
        {{ errorMessage }}
        <button
          id="to"
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="emit('change-error')"
        ></button>
      </div>
    </template>
    Post
  </CustomInput>
</template>
